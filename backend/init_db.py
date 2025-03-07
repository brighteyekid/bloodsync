import pymysql
from config import Config

def init_db():
    # Connect to MySQL without selecting a database
    connection = pymysql.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD
    )

    try:
        with connection.cursor() as cursor:
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {Config.MYSQL_DB}")
            cursor.execute(f"USE {Config.MYSQL_DB}")
            
            # Create tables
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS donations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    phone VARCHAR(20) NOT NULL,
                    blood_type VARCHAR(5) NOT NULL,
                    last_donation DATE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS blood_requests (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    phone VARCHAR(20) NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    blood_type VARCHAR(5) NOT NULL,
                    units_needed INT NOT NULL,
                    date_needed DATE NOT NULL,
                    urgency VARCHAR(20) NOT NULL,
                    additional_info TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS messages (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    subject VARCHAR(200) NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS admins (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS events (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    date DATE NOT NULL,
                    time TIME NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    type ENUM('blood_drive', 'awareness', 'training') NOT NULL,
                    status ENUM('upcoming', 'ongoing', 'completed') NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

        connection.commit()
        print("Database and tables created successfully!")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        connection.close()

if __name__ == "__main__":
    init_db() 