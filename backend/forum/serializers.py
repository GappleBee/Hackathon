from rest_framework import serializers
from .models import User, Post, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class PostSerializer(serializers.ModelSerializer):
    poster = SimpleUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ["id", "date_posted", "title", "poster", "contents", "tone"]


class CommentSerializer(serializers.ModelSerializer):
    poster = SimpleUserSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "date_posted", "poster", "contents", "post"]


class PostCommentSerializer(serializers.ModelSerializer):
    poster = SimpleUserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "date_posted",
            "title",
            "poster",
            "contents",
            "tone",
            "comments",
        ]
