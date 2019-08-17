from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.

class MyUser(models.Model):
    auth_user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete='CASCADE')
    gender = models.CharField(max_length=6, default='男')
    location = models.CharField(max_length=64, null=True)
    pic = models.URLField(default='/statics/picture/b6e919c7c27a45a2a787052f13454d20_w608h608.jpg')

class News(models.Model):
    pic_url = models.CharField(max_length=128, null=True)
    news_id = models.CharField(max_length=10, null=True)
    user_save = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='user_save')
    title = models.CharField(max_length=64)
    summary = models.CharField(max_length=256, null=True)
    url = models.URLField(null=True)
    curtime = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete='CASCADE', related_name='user_news')
    news_type = models.ForeignKey(to="NewsType", on_delete='CASCADE')
    favour = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='user_favour')

class Comment(models.Model):
    news = models.ForeignKey(to="News", on_delete='CASCADE')
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete='CASCADE', related_name='user_comment')
    content = models.CharField(max_length=128)
    device = models.CharField(max_length=32, null=True)
    ctime = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey(to="Comment", null=True, on_delete='CASCADE')

class NewsType(models.Model):
    news_type_choice = [
        (1, '42区'),
        (2, '段子'),
        (3, '图片'),
        (4, '挨踢1024'),
        (5, '你问我答'),
    ]
    news_type = models.IntegerField(choices=news_type_choice)
    linked_image = models.URLField(null=True)
    news_type_name = models.CharField(max_length=12, null=True)
    def __str__(self):
        return self.news_type
