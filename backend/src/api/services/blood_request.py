from api.models.model_schema import BloodDonorItem, BloodRecieverItem, BloodRequestItem
from flask import request, jsonify
from databases.db import db

def BloodRequest():
    if request.method == 'GET':
        blood_requests = BloodRequestItem.query.all()
        return jsonify([{
            "id": br.id,
            "fullname": br.fullname,
            "email": br.email,
            "phone_number": br.phone_number,
            "location": br.location,
            "blood_type": br.blood_type,
            "dateNeeded": br.dateNeeded,
            "date_issued": br.date_issued,
            "urgency": br.urgency
        } for br in blood_requests])

    elif request.method == 'POST':
        data = request.get_json()
    print("Received Data:", data)  # Debugging line

    fullname = data.get('fullname')
    email = data.get('email')
    phone_number = data.get('phone_number')
    location = data.get('location')
    blood_type = data.get('blood_type')
    units_needed = data.get('units_needed')
    date_issued = data.get('date_issued')
    urgency = data.get('urgency')

    if not fullname or not email or not phone_number or units_needed is None:
        return jsonify({"error": "Missing required fields"}), 400

    blood_request = BloodRequestItem(
        fullName=fullname,
        email=email,
        phonenumber=phone_number,
        location=location,
        blood_type=blood_type,
        units_needed=units_needed,
        date_issued=date_issued,
        urgency_level=urgency
    )

    db.session.add(blood_request)
    db.session.commit()

    return jsonify({"message": "Blood request added successfully"}), 201