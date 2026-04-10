import os
from api.models.model_schema import UserItem , UserProfileItem, BloodDonorItem, BloodRequestItem
from flask import request , jsonify , session , abort
from databases.db import db
import urllib.request
import json
from datetime import datetime

def signup():
    try:
        result = request.get_json()
        fullName = result.get("fullName")
        email = result.get("email")
        password = result.get("password")
            
        existing_user = UserProfileItem.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error":"Email Already Exists"}), 409
        
        signedUp_user = UserProfileItem(
            fullName = fullName,
            email = email,
            password = password
        )
        db.session.add(signedUp_user)
        db.session.commit()
            
        new_login = UserItem(
            signupid = signedUp_user.id,
            email = email,
            password = password,
            is_google_auth = False
        )
        db.session.add(new_login)
        db.session.commit()
            
        session["user_id"] = new_login.id    
        session.modified = True
            
        return jsonify({
            "message": "User Signed Up Successfully", 
            "token": new_login.id,
            "user": serialize_user(signedUp_user)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user_login = UserItem.query.filter_by(email=email).first()
        
        if not user_login or user_login.password != password:
            return jsonify({"error": "Invalid credentials"}), 401
        
        session["user_id"] = user_login.id    
        session.modified = True
        
        profile = UserProfileItem.query.get(user_login.signupid)
        return jsonify({
            "message": "User Logged In Successfully", 
            "token": user_login.id,
            "user": serialize_user(profile)
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def google_auth():
    try:
        data = request.get_json()
        token = data.get('credential')
        req = urllib.request.Request(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")
        with urllib.request.urlopen(req) as res:
            user_info = json.loads(res.read().decode())
        
        google_client_id = os.getenv("REACT_APP_GOOGLE_CLIENT_ID")
        if user_info.get('aud') != google_client_id:
            return jsonify({"error": "Invalid Token Audience"}), 400

        email = user_info.get('email')
        name = user_info.get('name')
        picture = user_info.get('picture')
        google_id = user_info.get('sub')

        profile = UserProfileItem.query.filter_by(email=email).first()
        if not profile:
            profile = UserProfileItem(
                fullName = name,
                email = email,
                google_id = google_id,
                profile_picture = picture
            )
            db.session.add(profile)
            db.session.commit()

            new_login = UserItem(
                signupid = profile.id,
                email = email,
                is_google_auth = True
            )
            db.session.add(new_login)
            db.session.commit()
            user_id = new_login.id
        else:
            if not profile.google_id:
                profile.google_id = google_id
                profile.profile_picture = picture if not profile.profile_picture else profile.profile_picture
                db.session.commit()
            
            user_login = UserItem.query.filter_by(email=email).first()
            user_id = user_login.id

        session["user_id"] = user_id    
        session.modified = True
        return jsonify({
            "token": user_id,
            "user": serialize_user(profile)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def serialize_user(profile):
    return {
        "id": profile.id,
        "name": profile.fullName,
        "email": profile.email,
        "phone": profile.phone,
        "location": profile.location,
        "blood_type": profile.blood_type,
        "picture": profile.profile_picture,
        "joined_at": profile.joined_at.isoformat() if profile.joined_at else None
    }

def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_login = UserItem.query.get(user_id)
    if not user_login:
        return jsonify({"error": "User not found"}), 404
        
    profile = UserProfileItem.query.get(user_login.signupid)
    
    # Calculate stats
    donations = BloodDonorItem.query.filter_by(email=profile.email).order_by(BloodDonorItem.lastDonation.desc()).all()
    requests = BloodRequestItem.query.filter_by(email=profile.email).order_by(BloodRequestItem.date_issued.desc()).all()
    
    # Format History for Dashboard Timeline
    history = []
    for d in donations:
        history.append({
            "type": "donation",
            "title": f"{d.bloodDonorType} Blood Donation",
            "date": d.lastDonation.strftime("%b %d, %Y").upper(),
            "location": d.location_pincode or "Clinical Center",
            "points": "+100 PTS EARNED"
        })
    
    for r in requests:
        history.append({
            "type": "request",
            "title": f"Blood Request ({r.blood_type})",
            "date": r.date_issued.strftime("%b %d, %Y").upper(),
            "location": r.location,
            "points": f"{r.units_needed} Units Needed",
            "isRequest": True
        })

    # Sort combined history by date (if possible, though strings are hard. For now just append requests after donations or sort if we had timestamps)
    # Since we have the objects, we could sort better, but let's keep it simple for now.

    # Calculate Completion Percentage
    fields = [profile.fullName, profile.email, profile.phone, profile.location, profile.blood_type, profile.profile_picture]
    filled = len([f for f in fields if f])
    completion = int((filled / len(fields)) * 100)

    return jsonify({
        "status": "success",
        "user": serialize_user(profile),
        "stats": {
            "donations": len(donations),
            "requests": len(requests),
            "completion": completion,
            "points": len(donations) * 100 # Simple logic: 100 pts per donation
        },
        "history": history
    }), 200

def update_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
        
    data = request.get_json()
    user_login = UserItem.query.get(user_id)
    profile = UserProfileItem.query.get(user_login.signupid)
    
    profile.fullName = data.get('name', profile.fullName)
    profile.phone = data.get('phone', profile.phone)
    profile.location = data.get('location', profile.location)
    profile.blood_type = data.get('blood_type', profile.blood_type)
    profile.profile_picture = data.get('picture', profile.profile_picture)
    
    db.session.commit()
    return jsonify({"message": "Profile updated successfully", "user": serialize_user(profile)}), 200