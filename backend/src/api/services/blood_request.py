from api.models.model_schema import BloodRequestItem
from flask import request, jsonify
from databases.db import db
from datetime import datetime

def BloodRequest(item_id=None):
    if request.method == 'GET':
        blood_requests = BloodRequestItem.query.all()
        return jsonify({
            "status": "success",
            "data": [{
                "id": br.id,
                "name": br.fullName,
                "email": br.email,
                "phone": br.phonenumber,
                "location": br.location,
                "bloodType": br.blood_type,
                "unitsNeeded": br.units_needed,
                "dateNeeded": br.date_issued.isoformat() if br.date_issued else None,
                "urgency": br.urgency_level
            } for br in blood_requests]
        })

    elif request.method == 'POST':
        data = request.get_json()
        fullname = data.get('fullname')
        email = data.get('email')
        phone_number = data.get('phone_number')
        location = data.get('location')
        blood_type = data.get('blood_type')
        units_needed = data.get('units_needed')
        date_issued_str = data.get('date_issued')
        urgency = data.get('urgency')

        if not fullname or not email or not phone_number or units_needed is None:
            return jsonify({"error": "Missing required fields"}), 400

        try:
            date_issued = datetime.fromisoformat(date_issued_str) if date_issued_str else datetime.now()
        except:
            date_issued = datetime.now()

        blood_request = BloodRequestItem(
            fullName=fullname,
            email=email,
            phonenumber=phone_number,
            location=location,
            blood_type=blood_type,
            units_needed=int(units_needed),
            date_issued=date_issued,
            urgency_level=urgency
        )

        db.session.add(blood_request)
        db.session.commit()
        return jsonify({"message": "Blood request added successfully"}), 201

    elif request.method == 'DELETE' and item_id:
        item = BloodRequestItem.query.get(item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted successfully"}), 200

    return jsonify({"error": "Method not allowed"}), 405