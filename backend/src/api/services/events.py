from api.models.model_schema import EventItem
from flask import request, jsonify
from databases.db import db
from datetime import datetime

def EventService(item_id=None):
    if request.method == 'GET':
        events = EventItem.query.all()
        return jsonify({
            "status": "success",
            "data": [{
                "id": str(e.id),
                "title": e.title,
                "date": e.date.isoformat() if e.date else None,
                "time": e.time,
                "location": e.location,
                "description": e.description,
                "type": e.type,
                "status": e.status
            } for e in events]
        })

    elif request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        date_str = data.get('date')
        time = data.get('time')
        location = data.get('location')
        description = data.get('description')
        e_type = data.get('type')
        status = data.get('status', 'upcoming')

        if not all([title, date_str, time, location, description, e_type]):
            return jsonify({"error": "Missing required fields"}), 400

        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        except:
            date_obj = datetime.now().date()

        new_event = EventItem(
            title=title,
            date=date_obj,
            time=time,
            location=location,
            description=description,
            type=e_type,
            status=status
        )

        db.session.add(new_event)
        db.session.commit()
        return jsonify({"message": "Event created successfully", "status": "success"}), 201

    elif request.method == 'PUT' and item_id:
        data = request.get_json()
        event = EventItem.query.get(item_id)
        if not event:
            return jsonify({"error": "Event not found"}), 404
        
        event.title = data.get('title', event.title)
        event.time = data.get('time', event.time)
        event.location = data.get('location', event.location)
        event.description = data.get('description', event.description)
        event.type = data.get('type', event.type)
        event.status = data.get('status', event.status)
        
        if data.get('date'):
            try:
                event.date = datetime.strptime(data.get('date'), '%Y-%m-%d').date()
            except:
                pass
        
        db.session.commit()
        return jsonify({"message": "Event updated successfully", "status": "success"}), 200

    elif request.method == 'DELETE' and item_id:
        event = EventItem.query.get(item_id)
        if not event:
            return jsonify({"error": "Event not found"}), 404
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Event deleted successfully", "status": "success"}), 200

    return jsonify({"error": "Method not allowed"}), 405
