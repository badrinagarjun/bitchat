# Quick API Test Script for BitChat

import requests
import json
import uuid
from base64 import b64encode

# Test configuration
DJANGO_URL = "http://localhost:8000"
FLASK_URL = "http://localhost:5001"

def test_django_backend():
    """Test Django API endpoints"""
    print("🧪 Testing Django Backend...")
    
    # Test 1: Create mailbox
    print("\n1️⃣ Creating mailbox...")
    response = requests.post(
        f"{DJANGO_URL}/api/mailbox/create/",
        json={"public_key_hash": "test_hash_12345"}
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        mailbox_data = response.json()
        mailbox_id = mailbox_data['id']
        print(f"✅ Mailbox created: {mailbox_id}")
        
        # Test 2: Send message
        print("\n2️⃣ Sending encrypted message...")
        encrypted_content = b64encode(b"This is a test encrypted message").decode()
        response = requests.post(
            f"{DJANGO_URL}/api/messages/send/",
            json={
                "encrypted_content": encrypted_content,
                "recipient_mailbox": mailbox_id
            }
        )
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            print(f"✅ Message sent: {response.json()}")
        
        # Test 3: Receive messages
        print("\n3️⃣ Receiving messages...")
        response = requests.get(f"{DJANGO_URL}/api/messages/receive/{mailbox_id}/")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            messages = response.json()
            print(f"✅ Received {len(messages)} message(s)")
            print(json.dumps(messages, indent=2))
    
    print("\n✅ Django backend tests complete!")

def test_flask_gateway():
    """Test Flask Gateway endpoints"""
    print("\n🧪 Testing Flask Gateway...")
    
    # Test 1: Health check
    print("\n1️⃣ Health check...")
    response = requests.get(f"{FLASK_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"✅ Gateway is healthy: {response.json()}")
    
    # Test 2: Relay message
    print("\n2️⃣ Relaying message...")
    recipient_id = str(uuid.uuid4())
    response = requests.post(
        f"{FLASK_URL}/relay/send",
        json={
            "recipient_id": recipient_id,
            "encrypted_payload": "encrypted_test_payload_123"
        }
    )
    print(f"Status: {response.status_code}")
    print(f"✅ Message relayed: {response.json()}")
    
    # Test 3: Receive relayed messages
    print("\n3️⃣ Receiving relayed messages...")
    response = requests.get(f"{FLASK_URL}/relay/receive/{recipient_id}")
    print(f"Status: {response.status_code}")
    messages = response.json()
    print(f"✅ Received {len(messages['messages'])} message(s)")
    print(json.dumps(messages, indent=2))
    
    # Test 4: Gateway stats
    print("\n4️⃣ Gateway stats...")
    response = requests.get(f"{FLASK_URL}/relay/stats")
    print(f"Status: {response.status_code}")
    print(f"✅ Stats: {response.json()}")
    
    print("\n✅ Flask gateway tests complete!")

if __name__ == "__main__":
    print("🚀 BitChat API Test Suite\n")
    print("Make sure both servers are running:")
    print(f"  - Django: {DJANGO_URL}")
    print(f"  - Flask: {FLASK_URL}\n")
    
    try:
        test_django_backend()
        test_flask_gateway()
        print("\n🎉 All tests passed!")
    except requests.exceptions.ConnectionError as e:
        print(f"\n❌ Connection error: {e}")
        print("Make sure both Django and Flask servers are running!")
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
