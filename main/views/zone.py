from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from main import models
from main.views.main_views import display


def news(request):
    '''
    这一个函数真的方便啊！
    :param request:
    :return:
    '''
    cur_user = request.user
    page_article = models.News.objects.filter(news_type__news_type_name=request.path)  # 根据发送的url匹配数据库中的news类型

    if request.user.is_authenticated:
        cur_user = User.objects.get(username=request.user)
    return render(request, 'test.html', {'cur_user':cur_user, 'articles':page_article})


def my_zone(request):
    return display(request, 'my_zone.html')


def my_release(request):  # TODO: 这个界面是要登陆认证才能进入
    cur_user = request.user
    cur_path = request.path

    if request.user.is_authenticated:
        cur_user = User.objects.get(username=request.user)
        page_article = models.News.objects.filter(user=cur_user)  # 根据发送的url匹配数据库中的news类型

    return render(request, 'my_zone.html', {'cur_user':cur_user, 'articles':page_article, 'cur_path':cur_path})


def my_like(request):
    cur_user = request.user
    cur_path = request.path

    if request.user.is_authenticated:
        cur_user = User.objects.get(username=request.user)
        page_article = models.News.objects.filter(favour=cur_user).all()  # 根据发送的url匹配数据库中的news类型
        news_user_like = cur_user.user_favour.all()

    return render(request, 'my_zone.html',
                  {'cur_user':cur_user, 'articles':page_article, 'cur_path':cur_path, 'cur_user_like':news_user_like})
