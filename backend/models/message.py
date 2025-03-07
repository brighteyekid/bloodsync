from models import get_db

class Message:
    @staticmethod
    def create(data):
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute('''
                INSERT INTO messages 
                (name, email, subject, message)
                VALUES (%s, %s, %s, %s)
            ''', (
                data['name'], data['email'], data['subject'], data['message']
            ))
            id = cursor.lastrowid
        db.commit()
        db.close()
        return id

    @staticmethod
    def get_all():
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute('SELECT * FROM messages ORDER BY created_at DESC')
            messages = cursor.fetchall()
        db.close()
        return messages

    @staticmethod
    def delete(id):
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute('DELETE FROM messages WHERE id = %s', (id,))
        db.commit()
        db.close() 