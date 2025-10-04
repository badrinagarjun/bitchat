# Lightweight Django models for BitChat
# Privacy-first: minimal data storage, encrypted content

from django.db import models
import uuid
from django.utils import timezone
from datetime import timedelta


class AnonymousUser(models.Model):
    """Anonymous user - no real identity stored"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    public_key_hash = models.CharField(max_length=64, unique=True)  # Hash only
    created_at = models.DateTimeField(auto_now_add=True)
    last_seen = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'anonymous_users'


class EncryptedMessage(models.Model):
    """Encrypted message blobs - server can't read content"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    encrypted_content = models.BinaryField()  # Client-side encrypted
    recipient_mailbox = models.UUIDField(db_index=True)  # Anonymous mailbox ID
    expires_at = models.DateTimeField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'encrypted_messages'
        indexes = [
            models.Index(fields=['recipient_mailbox', 'expires_at']),
        ]
    
    def save(self, *args, **kwargs):
        # Auto-expire in 24 hours
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(hours=24)
        super().save(*args, **kwargs)


class Mailbox(models.Model):
    """Anonymous rotating mailboxes"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    public_key_hash = models.CharField(max_length=64, db_index=True)
    expires_at = models.DateTimeField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'mailboxes'
