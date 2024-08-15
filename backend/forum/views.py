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

from .models import User, Post, Comment
from .serializers import UserSerializer, SimpleUserSerializer, PostSerializer, PostCommentSerializer, CommentSerializer


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


class PostsView(APIView):
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

        serializer.save()

        return Response({"detail": "Successfully added post to forum", 'modified_post': serializer.data})


class PostView(APIView):
    def get(self, request, post_id):
        required_post = get_object_or_404(Post, id=post_id)
        return Response(PostCommentSerializer(required_post).data)

    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request, post_id):
        required_post = get_object_or_404(Post, id=post_id)

        serializer = CommentSerializer(data=request.data, context={'poster': request.user, 'post': required_post})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()

        return Response({"detail": "Successfully added comment to post", 'modified_post': PostCommentSerializer(required_post).data})
    
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def delete(self, request, post_id):
        required_post = get_object_or_404(Post, id=post_id)
        if required_post.poster != request.user:
            return Response({"detail": "Cannot delete other people's posts"}, status=status.HTTP_401_UNAUTHORIZED)
        
        required_post.delete()
        return Response({"detail": f"Post ID {post_id} deletion successful"})
    
class CommentView(APIView):
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, id=comment_id)
        if comment.poster != request.user:
            return Response({"detail": "Cannot delete other people's comments"}, status=status.HTTP_401_UNAUTHORIZED)
        
        comment.delete()
        return Response({"detail": f"Comment ID {comment_id} deletion successful"})