from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from models.message import Message
from . import create_response

message_bp = Blueprint('message', __name__)

@message_bp.route('', methods=['POST'])
def create_message():
    try:
        data = request.get_json()
        message_id = Message.create(data)
        return create_response(
            data={'id': message_id},
            message='Message sent successfully'
        )
    except Exception as e:
        return create_response(message=str(e), status=400)

@message_bp.route('', methods=['GET'])
@jwt_required()
def get_all_messages():
    try:
        messages = Message.get_all()
        return create_response(data=messages if messages else [])
    except Exception as e:
        print(f"Error fetching messages: {str(e)}")
        return create_response(message=str(e), status=500)

@message_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_message(id):
    try:
        Message.delete(id)
        return create_response(message='Message deleted successfully')
    except Exception as e:
        return create_response(message=str(e), status=400) 