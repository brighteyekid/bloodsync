from models import get_db

class BloodRequest:
    @staticmethod
    def create(data):
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute('''
                INSERT INTO blood_requests 
                (name, email, phone, location, blood_type, units_needed, 
                 date_needed, urgency, additional_info)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''', (
                data['name'], data['email'], data['phone'], data['location'],
                data['bloodType'], data['unitsNeeded'], data['dateNeeded'],
                data['urgency'], data.get('additionalInfo', '')
            ))
            id = cursor.lastrowid
        db.commit()
        db.close()
        return id

    @staticmethod
    def get_all():
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute('SELECT * FROM blood_requests ORDER BY created_at DESC')
            requests = cursor.fetchall()
        db.close()
        return requests

    @staticmethod
    def delete(id):
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute('DELETE FROM blood_requests WHERE id = %s', (id,))
        db.commit()
        db.close() 