from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class DigitalClone(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    system_prompt = models.TextField(max_length=500)
    model = models.CharField(max_length=255, default="Llama3.1:8B")
    
    # https://github.com/ollama/ollama/blob/main/docs/modelfile.md

    # LLM configurations
    mirostat = models.DecimalField(default=0.0, decimal_places=1, max_digits=2) # disabled by default
    mirostat_eta = models.DecimalField(default=0.1, decimal_places=1, max_digits=2)
    mirostat_tau = models.DecimalField(default=5.0, decimal_places=1, max_digits=2)
    num_ctx = models.PositiveIntegerField(default=2048) # context window size
    repeat_last_n = models.IntegerField(default=64)
    repeat_penalty = models.DecimalField(default=1.1, decimal_places=1, max_digits=2)
    temperature = models.DecimalField(default=0.8, decimal_places=1, max_digits=2)
    seed = models.IntegerField(default=0)
    top_p = models.DecimalField(default=0.9, decimal_places=1, max_digits=2)
    min_p = models.DecimalField(default=0.0, decimal_places=1, max_digits=2)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} (Digital Twin)"
    

class KnowledgeBase(models.Model):
    title = models.CharField(max_length=255, default="Untitled knowledge base")
    uuid = models.UUIDField()
    digital_clone = models.ForeignKey(DigitalClone, 
                                      on_delete=models.SET_NULL, 
                                      related_name="knowledgebases",
                                      null=True, 
                                      blank=True # some people just want to "upload their data" to OrbitView
                                      )
    active = models.BooleanField(default=False) # should we vectorize or not
    storage_size = models.IntegerField()

    def __str__(self):
        return f"{self.digital_clone.user.first_name} {self.digital_clone.user.last_name} - {self.title}"


'''
class training material(models.Model):
    file = models.FileField()
    knowledge_base = models.ForeignKey(KnowledgeBase)

'''


# this is just a single chat, but what's even more powerful can be the idea of
# group chats with different clones, but that is yet to come

class Chat(models.Model):
    name = models.CharField(max_length=255)
    uuid = models.UUIDField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_chats") # collects the chats that you have created by chatting to other clone(s)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats") # chats.count() --> how many chats has your clone be used for


class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name="messages", on_delete=models.CASCADE)
    sender = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} in {self.chat.name}"
    

