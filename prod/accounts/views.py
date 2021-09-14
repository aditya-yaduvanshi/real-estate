from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
User = get_user_model()


class Signupview(APIView):
  permission_classes = (permissions.AllowAny, )

  @csrf_exempt
  def post(self, request, format=None):
    data = self.request.data
    name = data['name']
    email = data['email']
    password = data['password']
    password2 = data['password2']

    if password == password2:
      if User.objects.filter(email=email).exists():
        return Response({'error':'Email already exists!'})
      else:
        if len(password) < 6:
          return Response({'error':'Passwords must be atleast 6 characters!'})
        else:
          user = User.objects.create_user(email=email, password=password, name=name)
          user.save()
          return Response({'success':'User account created successfully!'})
    else:
      return Response({'error':'Passwords do not match!'})

class OAuth(APIView):
  permission_classes = (permissions.AllowAny, )

  @csrf_exempt
  def post(self, request, format=None):
    data = self.request.data
    name = data['name']
    email = data['email']
    password = email + name
    
    if User.objects.filter(email=email).exists():
      return Response({'success':'Logging you in!'})
    else:
      user = User.objects.create_user(email=email, password=password, name=name)
      user.save()
      return Response({'success':'User account created successfully!'})
