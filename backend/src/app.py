from flask import Flask
from databases.db import Init_DB, db
from flask_cors import CORS
from api.services.blood_donation import BloodRequest


app = Flask(__name__)

CORS(app)

Init_DB(app)

@app.route('/api/request-blood', methods=['GET', 'POST'])
def blood_request():
    return BloodRequest()


if __name__ == '__main__':
    app.run(debug=True, host='localhost')
