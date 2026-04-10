from api.models.model_schema import MessageItem
from flask import request, jsonify
from databases.db import db

def MessageService(item_id=None):
    if request.method == 'GET':
        messages = MessageItem.query.all()
        return jsonify({
            "status": "success",
            "data": [{
                "id": m.id,
                "name": m.name,
                "email": m.email,
                "subject": m.subject,
                "message": m.message,
                "createdAt": m.createdAt.isoformat() if m.createdAt else None
            } for m in messages]
        })

    elif request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message_text = data.get('message')

        if not all([name, email, subject, message_text]):
            return jsonify({"error": "Missing required fields"}), 400

        new_message = MessageItem(
            name=name,
            email=email,
            subject=subject,
            message=message_text
        )

        db.session.add(new_message)
        db.session.commit()
        return jsonify({"message": "Message received. We will contact you soon."}), 201

    elif request.method == 'DELETE' and item_id:
        item = MessageItem.query.get(item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted successfully"}), 200

    return jsonify({"error": "Method not allowed"}), 405
