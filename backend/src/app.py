from flask import Flask
from databases.db import Init_DB, db
from flask_cors import CORS
from api.services.blood_request import BloodRequest
from api.services.blood_donation import BloodDonation


app = Flask(__name__)

CORS(app,origins=['http://localhost:3000'])

Init_DB(app)

@app.route('/api/request-blood', methods=['GET', 'POST'])
def blood_request():
    return BloodRequest()

@app.route('/api/blood-donations',  methods=['POST'])
def bloodDonation():
    return BloodDonation()


if __name__ == '__main__':
    app.run(debug=True, host='localhost')
