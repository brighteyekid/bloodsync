from api.models.model_schema import BloodDonorItem
from flask import request, jsonify
from databases.db import db
from datetime import datetime

def BloodDonation(item_id=None):
    if request.method == 'GET':
        donations = BloodDonorItem.query.all()
        return jsonify({
            "status": "success",
            "data": [{
                "id": d.id,
                "name": d.fullName,
                "email": d.email,
                "phone": d.phone,
                "bloodType": d.bloodDonorType,
                "lastDonation": d.lastDonation.isoformat() if d.lastDonation else None
            } for d in donations]
        })

    elif request.method == 'POST':
        try:
            data = request.get_json()
            if not data:
                return jsonify({"error": "No data provided"}), 400

            name = data.get('name')
            email = data.get('email')
            phone = data.get('phone')
            blood_type = data.get('bloodType')
            last_donation_str = data.get('lastDonation')

            if not all([name, email, phone, blood_type]):
                return jsonify({"error": "Missing required fields"}), 400

            try:
                last_donation = datetime.fromisoformat(last_donation_str) if last_donation_str else datetime.now()
            except:
                last_donation = datetime.now()

            blood_donor = BloodDonorItem(
                fullName=name,
                email=email,
                phone=phone,
                bloodDonorType=blood_type,
                lastDonation=last_donation
            )
            
            db.session.add(blood_donor)
            db.session.commit()
            return jsonify({"message": "Blood donation registered successfully"}), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    elif request.method == 'DELETE' and item_id:
        item = BloodDonorItem.query.get(item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted successfully"}), 200

    return jsonify({"error": "Method not allowed"}), 405