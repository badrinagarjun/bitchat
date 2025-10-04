# Flask Gateway - Lightweight message relay for BitChat
# Acts as a bridge between Bluetooth mesh and internet

from flask import Flask, request, jsonify
from flask_cors import CORS
from cryptography.fernet import Fernet
import uuid
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# In-memory message queue (lightweight, no database needed)
message_queue = {}


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'timestamp': datetime.utcnow().isoformat()})


@app.route('/relay/send', methods=['POST'])
def relay_message():
    """
    Relay encrypted message through gateway
    No storage, pure relay
    """
    data = request.json
    
    if not data or 'recipient_id' not in data or 'encrypted_payload' not in data:
        return jsonify({'error': 'Invalid payload'}), 400
    
    recipient_id = data['recipient_id']
    encrypted_payload = data['encrypted_payload']
    
    # Add to temporary queue
    if recipient_id not in message_queue:
        message_queue[recipient_id] = []
    
    message_queue[recipient_id].append({
        'id': str(uuid.uuid4()),
        'payload': encrypted_payload,
        'timestamp': datetime.utcnow().isoformat()
    })
    
    return jsonify({'status': 'relayed', 'message_id': message_queue[recipient_id][-1]['id']}), 200


@app.route('/relay/receive/<recipient_id>', methods=['GET'])
def receive_messages(recipient_id):
    """
    Retrieve relayed messages for a recipient
    Messages are deleted after retrieval
    """
    if recipient_id not in message_queue:
        return jsonify({'messages': []}), 200
    
    messages = message_queue[recipient_id]
    
    # Clear queue after retrieval
    del message_queue[recipient_id]
    
    return jsonify({'messages': messages}), 200


@app.route('/relay/stats', methods=['GET'])
def gateway_stats():
    """Get gateway statistics"""
    return jsonify({
        'active_recipients': len(message_queue),
        'total_queued': sum(len(msgs) for msgs in message_queue.values())
    }), 200


if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5001))
    print(f" * BitChat Gateway running on port {port}")
    print(" * Relay mode: No storage, memory only")
    app.run(host='0.0.0.0', port=port, debug=True)
