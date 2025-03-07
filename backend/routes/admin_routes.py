from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from models.admin import Admin
from . import create_response

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print("Received login data:", data)  # Debug log
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return create_response(message='Username and password are required', status=400)

        admin = Admin.find_by_username(username)
        print("Found admin:", admin)  # Debug log
        
        if not admin:
            return create_response(message='Invalid credentials', status=401)

        if Admin.verify_password(admin['password'], password):
            access_token = create_access_token(identity=username)
            response_data = {
                'status': 'success',
                'message': 'Login successful',
                'data': {
                    'token': access_token,
                    'username': username
                }
            }
            print("Sending response:", response_data)  # Debug log
            return jsonify(response_data), 200
        
        return create_response(message='Invalid credentials', status=401)
    
    except Exception as e:
        print(f"Login error: {str(e)}")  # Debug log
        return create_response(message='An error occurred during login', status=500)

@admin_bp.route('/register', methods=['POST'])
@jwt_required()
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return create_response(message='Username and password are required', status=400)

        if Admin.find_by_username(username):
            return create_response(message='Username already exists', status=400)

        Admin.create(username, password)
        return create_response(message='Admin registered successfully')
    
    except Exception as e:
        print(f"Registration error: {str(e)}")  # Debug log
        return create_response(message='An error occurred during registration', status=500) 