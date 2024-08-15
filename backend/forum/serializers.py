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

    def create(self, validated_data):
        poster = self.context.get('poster')
        return Post.objects.create(poster=poster, **validated_data)


class CommentSerializer(serializers.ModelSerializer):
    poster = SimpleUserSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "date_posted", "poster", "contents", "post"]

    def create(self, validated_data):
        poster = self.context.get('poster')
        post = self.context.get('post')
        return Post.objects.create(poster=poster, post=post, **validated_data)


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
