from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PoemViewSet, CommentViewSet, LikeViewSet, BookmarkViewSet

router = DefaultRouter()
router.register(r'poems', PoemViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'bookmarks', BookmarkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
