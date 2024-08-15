from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination


from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import User, Post
from .serializers import UserSerializer, SimpleUserSerializer, PostSerializer, PostCommentSerializer, CommentSerializer
from .utils import get_tone


tones = {'happy', 'sad', 'angry', 'calm', 'excited', 'nostalgic', 'anxious', 'optimistic', 'confused', 'peaceful'}


class CustomPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 200


# Create your views here.
@api_view(["POST"])
def login(request):
    username_or_email = request.data.get("username")
    user = get_object_or_404(
        User, Q(username=username_or_email) | Q(email=username_or_email)
    )
    if not user.check_password(request.data.get("password")):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    token, created = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "user": SimpleUserSerializer(user).data})


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.auth.delete()
    return Response({"detail": "Successfully logged out."})


@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.save()

    user.set_password(request.data.get("password"))
    user.save()

    token = Token.objects.create(user=user)
    return Response({"token": token.key, "user": SimpleUserSerializer(user).data})


class Posts(APIView):
    def get(self, request):
        tone = request.GET.get("tone")
        if tone:
            all_posts = Post.objects.filter(tone=tone)
        else:
            all_posts = Post.objects.all()

        all_posts = all_posts.order_by('-date_posted')

        paginator = CustomPagination()
        paginated_posts = paginator.paginate_queryset(all_posts, request)

        serializer = PostSerializer(paginated_posts, many=True)
        return Response(serializer.data)

    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = PostSerializer(data=request.data, context={'poster': request.user})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        new_post = serializer.save()
        new_post.tone = get_tone(new_post, tones)
        new_post.save()

        return Response({"detail": "Successfully added post to forum", 'modified_post': PostSerializer(new_post).data})


class Post(APIView):
    def get(self, request, post_id):
        single_post = get_object_or_404(Post, id=post_id)
        return Response(PostCommentSerializer(single_post).data)

    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request, post_id):
        single_post = get_object_or_404(Post, id=post_id)

        serializer = CommentSerializer(data=request.data, context={'poster': request.user, 'post': single_post})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save(post=single_post, poster=request.user)

        single_post.tone = get_tone(single_post, tones)
        single_post.save()

        return Response({"detail": "Successfully added comment to post", 'modified_post': PostCommentSerializer(single_post).data})