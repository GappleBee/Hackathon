from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

class Post(models.Model):
    date_posed = models.DateField(auto_now_add=True)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    contents = models.TextField()
    tone = models.CharField(max_length=255)

class Comment(models.Model):
    date_posted = models.DateField(auto_now_add=True)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    contents = models.CharField(max_length=1000)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    