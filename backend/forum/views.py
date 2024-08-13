from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


from django.shortcuts import get_object_or_404

from .models import User
from .serializers import UserSerializer

# Create your views here.
@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data.get('username'))
    if not user.check_password(request.data.get('password')):
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    token, created = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key, 
        'user': UserSerializer(user).data
    })

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.auth.delete()
    return Response({"detail": "Successfully logged out."})

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    user = serializer.save()

    user.set_password(request.data.get('password'))
    user.save()

    token = Token.objects.create(user=user)
    return Response({
        'token': token.key, 
        'user': UserSerializer(user).data
    })

@api_view(['GET', 'POST'])
def posts(request):
    pass

@api_view(['GET', 'POST'])
def post(request):
    pass