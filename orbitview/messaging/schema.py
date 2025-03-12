import graphene
from graphene_django.types import DjangoObjectType
from django.contrib.auth.models import User
from .models import Chat, Message, DigitalClone, KnowledgeBase


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'date_joined',
        ]


'''class DigitalCloneType(DjangoObjectType):
    user = UserType()

    class Meta:
        model = DigitalClone
        fields = [
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
            'min_p'
        ]'''