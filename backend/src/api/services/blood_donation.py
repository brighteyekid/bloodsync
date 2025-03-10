from api.models.model_schema import  BloodDonorItem
from flask import request, jsonify
from databases.db import db

def BloodDonation():
    try:
        data = request.get_json()
        print("*** Server Side Data Received ***", data)
        
        if not data:
            return jsonify({"error": "No data provided"}), 400

        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        blood_type = data.get('bloodType')
        last_donation = data.get('lastDonation')

        if not all([name, email, phone, blood_type]):
            return jsonify({"error": "Missing required fields"}), 400

        blood_donor = BloodDonorItem(
            fullName=name,
            email=email,
            phone=phone,
            bloodDonorType=blood_type,
            lastDonation=last_donation
        )
        
        db.session.add(blood_donor)
        db.session.commit()

        return jsonify({"message": "Blood Donated successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500