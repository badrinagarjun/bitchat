# Serializers for API responses

from rest_framework import serializers
from .models import EncryptedMessage, Mailbox, AnonymousUser


class EncryptedMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EncryptedMessage
        fields = ['id', 'encrypted_content', 'recipient_mailbox', 'created_at', 'expires_at']
        read_only_fields = ['id', 'created_at']


class MailboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mailbox
        fields = ['id', 'public_key_hash', 'created_at', 'expires_at']
        read_only_fields = ['id', 'created_at']


class AnonymousUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonymousUser
        fields = ['id', 'public_key_hash', 'created_at']
        read_only_fields = ['id', 'created_at']
