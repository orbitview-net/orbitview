# For the RESTFUL portions of this API

from rest_framework import serializers
from .models import Chat, Message, DigitalClone, KnowledgeBase
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            # 'email',
            'date_joined',
        ]


class ChatSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    receiver = UserSerializer()
    
    class Meta:
        model = Chat
        fields = [
            'id',
            'uuid',
            'name',
            'created_at',
            'creator',
            'receiver'
        ]


class DigitalCloneInfoSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = DigitalClone
        fields = [
            'id', 
            'user',
            'system_prompt',
            'mirostat', 
            'mirostat_eta',
            'mirostat_tau',
            'num_ctx',
            'repeat_last_n',
            'repeat_penalty',
            'temperature',
            'seed',
            'top_p',
            'min_p',
        ]


class KnowledgeBaseSerializer(serializers.ModelSerializer):
    
    digital_clone = serializers.HyperlinkedRelatedField()

    class Meta:
        model = KnowledgeBase
        fields = [
            'title',
            'uuid',
            'digital_clone',
            'active',
            'storage_size'
        ]