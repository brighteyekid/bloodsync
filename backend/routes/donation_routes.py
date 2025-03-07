from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.donation import Donation
from . import create_response
import logging

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('', methods=['POST'])
def create_donation():
    try:
        data = request.get_json()
        logging.info(f"Received donation data: {data}")  # Debug log
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'bloodType']
        for field in required_fields:
            if not data.get(field):
                return create_response(
                    message=f"Missing required field: {field}",
                    status=400
                )
        
        # Convert date format if present
        if data.get('lastDonation') == '':
            data['lastDonation'] = None
            
        donation_id = Donation.create(data)
        
        return create_response(
            data={'id': donation_id},
            message='Donation record created successfully'
        )
    except Exception as e:
        logging.error(f"Error creating donation: {str(e)}")  # Debug log
        return create_response(
            message=f"Error creating donation: {str(e)}",
            status=400
        )

@donation_bp.route('', methods=['GET'])
@jwt_required()
def get_all_donations():
    try:
        donations = Donation.get_all()
        return create_response(data=donations if donations else [])
    except Exception as e:
        print(f"Error fetching donations: {str(e)}")
        return create_response(message=str(e), status=500)

@donation_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_donation(id):
    try:
        Donation.delete(id)
        return create_response(message='Donation record deleted successfully')
    except Exception as e:
        return create_response(message=str(e), status=400) 