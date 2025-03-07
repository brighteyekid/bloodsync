from models import get_db
import bcrypt

class Admin:
    @staticmethod
    def find_by_username(username):
        db = get_db()
        try:
            with db.cursor() as cursor:
                cursor.execute('SELECT * FROM admins WHERE username = %s', (username,))
                admin = cursor.fetchone()
                return admin
        finally:
            db.close()

    @staticmethod
    def create(username, password):
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        db = get_db()
        try:
            with db.cursor() as cursor:
                cursor.execute('INSERT INTO admins (username, password) VALUES (%s, %s)',
                           (username, hashed))
            db.commit()
        finally:
            db.close()

    @staticmethod
    def verify_password(stored_password, provided_password):
        try:
            return bcrypt.checkpw(
                provided_password.encode('utf-8'),
                stored_password.encode('utf-8') if isinstance(stored_password, str) else stored_password
            )
        except Exception as e:
            print(f"Password verification error: {str(e)}")  # Debug log
            return False 