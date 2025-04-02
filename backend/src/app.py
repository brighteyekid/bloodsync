from flask import Flask
from databases.db import Init_DB, db
from src.config.appconfig import redis_config
from flask_cors import CORS
from api.services.blood_request import BloodRequest
from api.services.blood_donation import BloodDonation
from api.services.auth import login , signup


app = Flask(__name__)

CORS(app,origins=['http://localhost:3000'])

redis_config(app)

Init_DB(app)

@app.route('/api/request-blood', methods=['GET', 'POST'])
def blood_request():
    return BloodRequest()

@app.route('/api/blood-donations',  methods=['POST'])
def bloodDonation():
    return BloodDonation()

@app.route("/api/auth/signup",methods=["POST"])
def user_signup():
    return signup()

@app.route('/api/auth/login', methods=['POST'])
def user_login():
    response = login()
    return response

# @app.route('/api/auth/current_user', methods=['GET'])
# def current_user():
#     return get_current_user()

if __name__ == '__main__':
    app.run(debug=True, host='localhost')
