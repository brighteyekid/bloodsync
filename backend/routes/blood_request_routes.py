from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from models.blood_request import BloodRequest
from . import create_response

blood_request_bp = Blueprint('blood_request', __name__)

@blood_request_bp.route('', methods=['POST'])
def create_blood_request():
    try:
        data = request.get_json()
        request_id = BloodRequest.create(data)
        return create_response(
            data={'id': request_id},
            message='Blood request created successfully'
        )
    except Exception as e:
        return create_response(message=str(e), status=400)

@blood_request_bp.route('', methods=['GET'])
@jwt_required()
def get_all_requests():
    try:
        requests = BloodRequest.get_all()
        return create_response(data=requests if requests else [])
    except Exception as e:
        print(f"Error fetching blood requests: {str(e)}")
        return create_response(message=str(e), status=500)

@blood_request_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_blood_request(id):
    try:
        BloodRequest.delete(id)
        return create_response(message='Blood request deleted successfully')
    except Exception as e:
        return create_response(message=str(e), status=400) 