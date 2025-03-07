from models import get_db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class Event:
    @staticmethod
    def create(data):
        db = None
        try:
            db = get_db()
            with db.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO events 
                    (title, date, time, location, description, type, status)
                    VALUES (%(title)s, %(date)s, %(time)s, %(location)s, 
                            %(description)s, %(type)s, %(status)s)
                ''', data)
                db.commit()
                return cursor.lastrowid
        except Exception as e:
            logger.error(f"Error creating event: {str(e)}")
            if db:
                db.rollback()
            raise
        finally:
            if db:
                db.close()

    @staticmethod
    def get_all():
        db = None
        try:
            db = get_db()
            with db.cursor() as cursor:
                cursor.execute('''
                    SELECT * FROM events 
                    ORDER BY date ASC, time ASC
                ''')
                return cursor.fetchall()
        except Exception as e:
            logger.error(f"Error fetching events: {str(e)}")
            raise
        finally:
            if db:
                db.close()

    @staticmethod
    def update(id, data):
        db = None
        try:
            db = get_db()
            with db.cursor() as cursor:
                cursor.execute('''
                    UPDATE events 
                    SET title = %(title)s, 
                        date = %(date)s, 
                        time = %(time)s, 
                        location = %(location)s,
                        description = %(description)s, 
                        type = %(type)s, 
                        status = %(status)s
                    WHERE id = %(id)s
                ''', {**data, 'id': id})
                db.commit()
        except Exception as e:
            logger.error(f"Error updating event: {str(e)}")
            if db:
                db.rollback()
            raise
        finally:
            if db:
                db.close()

    @staticmethod
    def delete(id):
        db = None
        try:
            db = get_db()
            with db.cursor() as cursor:
                cursor.execute('DELETE FROM events WHERE id = %s', (id,))
                db.commit()
        except Exception as e:
            logger.error(f"Error deleting event: {str(e)}")
            if db:
                db.rollback()
            raise
        finally:
            if db:
                db.close() 