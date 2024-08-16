from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    pass


class Post(models.Model):
    TONES = [
        ('love', 'love'),
        ('happy', 'happy'),
        ('ridiculous', 'ridiculous'),
        ('relaxing', 'relaxing'),
        ('confident', 'confident'),
        ('Amazed', 'Amazed'),
        ('Anxious', 'Anxious'),
        ('sad', 'sad'),
        ('angry', 'angry'),
        ('confused', 'confused'),
    ]
    
    date_posted = models.DateTimeField(auto_now_add=True)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    contents = models.TextField()
    tone = models.CharField(max_length=255, choices=TONES)


class Comment(models.Model):
    date_posted = models.DateTimeField(auto_now_add=True)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    contents = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
