import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from databases.db import Init_DB, db
from api.services.blood_request import BloodRequest
from api.services.blood_donation import BloodDonation
from api.services.auth import login, signup, get_current_user, google_auth, update_profile
from api.services.messages import MessageService
from api.services.events import EventService
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Security & CORS
app.secret_key = os.getenv("SECRET_KEY", "fallback_secret_key_123")
app.config.update(
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_SECURE=False, # Set to True in production with HTTPS
    SESSION_COOKIE_HTTPONLY=True,
    PERMANENT_SESSION_LIFETIME=3600 # 1 hour
)
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)

# Database Initialization
Init_DB(app)
migrate = Migrate(app, db)

# --- Authentication Routes ---
@app.route("/api/auth/signup", methods=["POST"])
def user_signup():
    return signup()

@app.route('/api/auth/login', methods=['POST'])
def user_login():
    return login()

@app.route('/api/auth/google', methods=['POST'])
def user_google_auth():
    return google_auth()

@app.route('/api/auth/current_user', methods=['GET'])
def current_user():
    return get_current_user()

@app.route('/api/auth/profile/update', methods=['PUT'])
def user_update_profile():
    return update_profile()

# --- Blood Request Routes ---
@app.route('/api/request-blood', methods=['POST'])
@app.route('/api/blood-requests', methods=['GET'])
def blood_request_handler():
    return BloodRequest()

@app.route('/api/blood-requests/<int:id>', methods=['DELETE'])
def blood_request_delete(id):
    return BloodRequest(id)

# --- Blood Donation Routes ---
@app.route('/api/blood-donations', methods=['POST'])
@app.route('/api/donations', methods=['GET'])
def blood_donation_handler():
    return BloodDonation()

@app.route('/api/donations/<int:id>', methods=['DELETE'])
def blood_donation_delete(id):
    return BloodDonation(id)

# --- Contact / Message Routes ---
@app.route('/api/messages', methods=['GET', 'POST'])
def messages_handler():
    return MessageService()

@app.route('/api/messages/<int:id>', methods=['DELETE'])
def message_delete(id):
    return MessageService(id)

# --- Event Management Routes ---
@app.route('/api/events', methods=['GET', 'POST'])
def events_handler():
    return EventService()

@app.route('/api/events/<int:id>', methods=['PUT', 'DELETE'])
def event_action_handler(id):
    return EventService(id)

if __name__ == '__main__':
    # with app.app_context():
        # db.create_all() # Ensure tables exist
    app.run(debug=True, host='localhost', port=5000)
