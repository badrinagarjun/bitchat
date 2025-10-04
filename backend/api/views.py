# Simple REST API views for BitChat
# Minimal endpoints, privacy-preserving

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import EncryptedMessage, Mailbox, AnonymousUser
from .serializers import EncryptedMessageSerializer, MailboxSerializer
import uuid
from django.utils import timezone
from datetime import timedelta


@api_view(['POST'])
def send_message(request):
    """Store encrypted message blob"""
    serializer = EncryptedMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def receive_messages(request, mailbox_id):
    """Retrieve messages for a mailbox"""
    try:
        mailbox_uuid = uuid.UUID(mailbox_id)
        messages = EncryptedMessage.objects.filter(
            recipient_mailbox=mailbox_uuid,
            expires_at__gt=timezone.now()
        ).order_by('created_at')
        
        serializer = EncryptedMessageSerializer(messages, many=True)
        
        # Delete after retrieval (optional)
        # messages.delete()
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ValueError:
        return Response({'error': 'Invalid mailbox ID'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_mailbox(request):
    """Create anonymous mailbox"""
    public_key_hash = request.data.get('public_key_hash')
    if not public_key_hash:
        return Response({'error': 'public_key_hash required'}, status=status.HTTP_400_BAD_REQUEST)
    
    mailbox = Mailbox.objects.create(
        public_key_hash=public_key_hash,
        expires_at=timezone.now() + timedelta(days=30)
    )
    
    serializer = MailboxSerializer(mailbox)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def cleanup_expired(request):
    """Clean up expired messages and mailboxes"""
    now = timezone.now()
    
    deleted_messages = EncryptedMessage.objects.filter(expires_at__lt=now).delete()
    deleted_mailboxes = Mailbox.objects.filter(expires_at__lt=now).delete()
    
    return Response({
        'deleted_messages': deleted_messages[0],
        'deleted_mailboxes': deleted_mailboxes[0]
    }, status=status.HTTP_200_OK)
