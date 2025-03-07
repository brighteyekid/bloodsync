from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
import logging

def create_app():
    # Configure logging
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

    # Initialize Flask app
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    jwt = JWTManager(app)
    
    # Configure CORS
    CORS(app, 
         resources={
             r"/api/*": {
                 "origins": ["http://localhost:3000"],
                 "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                 "allow_headers": ["Content-Type", "Authorization"],
                 "expose_headers": ["Content-Type", "Authorization"],
                 "supports_credentials": True
             }
         })

    # Import routes
    from routes.admin_routes import admin_bp
    from routes.blood_request_routes import blood_request_bp
    from routes.donation_routes import donation_bp
    from routes.message_routes import message_bp
    from routes.event_routes import event_bp

    # Register blueprints
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(blood_request_bp, url_prefix='/api/blood-requests')
    app.register_blueprint(donation_bp, url_prefix='/api/donations')
    app.register_blueprint(message_bp, url_prefix='/api/messages')
    app.register_blueprint(event_bp, url_prefix='/api/events')

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    # Add error handlers
    @app.errorhandler(500)
    def handle_500_error(error):
        return jsonify({
            'message': 'Internal server error occurred',
            'error': str(error)
        }), 500

    @app.errorhandler(404)
    def handle_404_error(error):
        return jsonify({
            'message': 'Resource not found',
            'error': str(error)
        }), 404

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 