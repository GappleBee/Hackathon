from django.urls import path

from . import views

urlpatterns = [
    path("login", views.login, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout, name="logout"),
    path("posts", views.PostsView.as_view(), name="posts"),
    path("posts/<int:post_id>", views.PostView.as_view(), name="post"),
    path("comments/<int:comment_id>", views.CommentView.as_view(), name="comments"),
]
