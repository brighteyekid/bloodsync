import pymysql
import bcrypt
from config import Config

def create_admin_user():
    # Default admin credentials
    admin_username = "admin"
    admin_password = "admin123"  # You can change this password

    # Hash the password
    hashed = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())

    # Connect to database
    connection = pymysql.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        db=Config.MYSQL_DB
    )

    try:
        with connection.cursor() as cursor:
            # Check if admin already exists
            cursor.execute("SELECT * FROM admins WHERE username = %s", (admin_username,))
            if cursor.fetchone() is None:
                # Insert new admin
                cursor.execute(
                    "INSERT INTO admins (username, password) VALUES (%s, %s)",
                    (admin_username, hashed)
                )
                connection.commit()
                print(f"Admin user created successfully!")
                print(f"Username: {admin_username}")
                print(f"Password: {admin_password}")
            else:
                print("Admin user already exists!")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        connection.close()

if __name__ == "__main__":
    create_admin_user() 