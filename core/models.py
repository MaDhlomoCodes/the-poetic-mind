from django.contrib.auth.models import AbstractUser
from django.db import models

# ---------- CUSTOM USER MODEL ----------

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username

# ---------- POEM MODEL ----------
class Poem(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='poems')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# ----------- COMMENT MODEL -----------
class Comment(models.Model):
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.poem.title}'

# ------------- LIKE MODEL ----------------
class Like(models.Model):
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('poem', 'user')  # Prevent duplicate likes

    def __str__(self):
        return f'{self.user.username} liked {self.poem.title}'

# ---------- BOOKMARK MODEL ------------
class Bookmark(models.Model):
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE, related_name='bookmarks')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('poem', 'user')  # Prevent duplicate bookmarks

    def __str__(self):
        return f'{self.user.username} bookmarked {self.poem.title}'

