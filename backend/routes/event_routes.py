from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.event import Event
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
event_bp = Blueprint('event', __name__)

def serialize_event(event):
    try:
        # Convert MySQL datetime/time objects to string format
        date_str = event['date'].strftime('%Y-%m-%d') if isinstance(event['date'], datetime) else str(event['date'])
        
        # Handle time field specifically
        if isinstance(event['time'], str):
            time_str = event['time']
        else:
            # Convert time object to string
            hours = int(event['time'].seconds / 3600)
            minutes = int((event['time'].seconds % 3600) / 60)
            time_str = f"{hours:02d}:{minutes:02d}"

        return {
            'id': event['id'],
            'title': event['title'],
            'date': date_str,
            'time': time_str,
            'location': event['location'],
            'description': event['description'],
            'type': event['type'],
            'status': event['status'],
            'created_at': event['created_at'].strftime('%Y-%m-%d %H:%M:%S') if event['created_at'] else None
        }
    except Exception as e:
        logger.error(f"Error serializing event: {str(e)}")
        raise

@event_bp.route('', methods=['GET'])
def get_all_events():
    try:
        events = Event.get_all()
        serialized_events = [serialize_event(event) for event in events]
        return jsonify({
            'status': 'success',
            'data': serialized_events,
            'message': 'Events fetched successfully'
        })
    except Exception as e:
        logger.error(f"Error in get_all_events: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to fetch events',
            'error': str(e)
        }), 500

@event_bp.route('', methods=['POST'])
@jwt_required()
def create_event():
    try:
        data = request.get_json()
        required_fields = ['title', 'date', 'time', 'location', 'description', 'type', 'status']
        
        # Validate required fields
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'status': 'error',
                    'message': f'Missing required field: {field}'
                }), 400

        # Parse date and time
        try:
            data['date'] = datetime.strptime(data['date'], '%Y-%m-%d').date()
            time_parts = data['time'].split(':')
            data['time'] = f"{int(time_parts[0]):02d}:{int(time_parts[1]):02d}:00"
        except ValueError as e:
            return jsonify({
                'status': 'error',
                'message': 'Invalid date or time format'
            }), 400

        event_id = Event.create(data)
        return jsonify({
            'status': 'success',
            'data': {'id': event_id},
            'message': 'Event created successfully'
        })
    except Exception as e:
        logger.error(f"Error in create_event: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to create event',
            'error': str(e)
        }), 500

@event_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_event(id):
    try:
        data = request.get_json()
        # Parse date and time
        try:
            data['date'] = datetime.strptime(data['date'], '%Y-%m-%d').date()
            time_parts = data['time'].split(':')
            data['time'] = f"{int(time_parts[0]):02d}:{int(time_parts[1]):02d}:00"
        except ValueError as e:
            return jsonify({
                'status': 'error',
                'message': 'Invalid date or time format'
            }), 400
            
        Event.update(id, data)
        return jsonify({
            'status': 'success',
            'message': 'Event updated successfully'
        })
    except Exception as e:
        logger.error(f"Error in update_event: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to update event',
            'error': str(e)
        }), 500

@event_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_event(id):
    try:
        Event.delete(id)
        return jsonify({
            'status': 'success',
            'message': 'Event deleted successfully'
        })
    except Exception as e:
        logger.error(f"Error in delete_event: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to delete event',
            'error': str(e)
        }), 500 