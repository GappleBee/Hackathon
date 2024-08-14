from django.urls import path

from . import views

urlpatterns = [
    path("login", views.login, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout, name="logout"),
    path("posts", views.Posts.as_view(), name="posts"),
    path("posts/<int:post_id>", views.Post.as_view(), name="post"),
]
