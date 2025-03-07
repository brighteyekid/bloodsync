from models import get_db
import logging

class Donation:
    @staticmethod
    def create(data):
        try:
            db = get_db()
            with db.cursor() as cursor:
                # Log the SQL query and data for debugging
                query = '''
                    INSERT INTO donations 
                    (name, email, phone, blood_type, last_donation)
                    VALUES (%s, %s, %s, %s, %s)
                '''
                values = (
                    data['name'],
                    data['email'],
                    data['phone'],
                    data['bloodType'],
                    data.get('lastDonation')
                )
                
                logging.info(f"Executing query: {query} with values: {values}")  # Debug log
                
                cursor.execute(query, values)
                id = cursor.lastrowid
            db.commit()
            db.close()
            return id
        except Exception as e:
            logging.error(f"Database error: {str(e)}")  # Debug log
            db.rollback()
            db.close()
            raise Exception(f"Failed to create donation: {str(e)}")

    @staticmethod
    def get_all():
        db = get_db()
        try:
            with db.cursor() as cursor:
                cursor.execute('SELECT * FROM donations ORDER BY created_at DESC')
                donations = cursor.fetchall()
            db.close()
            return donations
        except Exception as e:
            db.close()
            raise Exception(f"Failed to fetch donations: {str(e)}")

    @staticmethod
    def delete(id):
        db = get_db()
        try:
            with db.cursor() as cursor:
                cursor.execute('DELETE FROM donations WHERE id = %s', (id,))
            db.commit()
            db.close()
        except Exception as e:
            db.rollback()
            db.close()
            raise Exception(f"Failed to delete donation: {str(e)}") 