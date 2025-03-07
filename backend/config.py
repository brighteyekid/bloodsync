import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-very-secure-secret-key')
    
    # Database settings
    MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '1414')
    MYSQL_DB = os.getenv('MYSQL_DB', 'blood')
    
    # JWT settings
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-very-secure-jwt-secret')
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours
    
    # CORS settings
    CORS_ORIGINS = ['http://localhost:3000'] 