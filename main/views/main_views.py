from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from main import models

class CustomBackend(ModelBackend):
    '''
    自定义authenticate函数,使之能够使用邮箱进行验证
    '''
    def authenticate(self, request, username=None, password=None, email=None, **kwargs):
        try:
            user = User.objects.get(Q(username=username)|Q(email=email))
            if user.check_password(password):
                return user
        except Exception as error:
            return None


# Create your views here.

def display(request, page):
    article = models.News.objects.all()
    cur_user = request.user
    cur_path = request.path
    news_user_like = None
    # print(article.first().user.firstname)

    if request.user.is_authenticated:
        cur_user = User.objects.get(username=request.user)
        news_user_like = cur_user.user_favour.all()                     #通过多对多的反查获得当前用户喜欢的所有新闻。

    return render(request, page, {'articles':article, 'cur_user':cur_user, 'cur_path': cur_path, 'cur_user_like': news_user_like})

def index(request):

    return display(request, 'test.html')

def signin(request):

    if request.method == 'POST':
        current_path = request.path_info

        email = request.POST.get('email', None)
        register_code = request.POST.get('sms', None)
        password = request.POST.get('password', None)

        user_exists = User.objects.filter(email=email).exists()

        if user_exists:
            # TODO 这里是一段验证邮箱的验证函数.
            return HttpResponse('抱歉,邮箱已经被注册!')
        else:
            #TODO 这里发送一段验证码给用户邮箱,并且验证验证码是否正确.
            #TODO 这里是一段验证密码的验证函数.

            username = '用户' + str(abs(hash(email)))[:8]            #先随机给用户一个名称.取email的哈希地址.
            user = User.objects.create_user(email=email, password=password, username=username)
            auth.login(request, user)
            return redirect('/index')

    #TODO 跳转到原来的请求地址
    return redirect('/index')

def login(request):

    if request.method == "POST":
        email = request.POST.get('email', None)
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        #TODO 一系列的邮箱,用户名,密码验证函数

        if username:
            user = auth.authenticate(username=username, password=password)
        elif email:
            user = auth.authenticate(email=email, password=password)
        if user:
            auth.login(request, user)
            return redirect('/index')

    return redirect('/index')

def logout(request):
    auth.logout(request)
    return redirect('/index')

def upload(request):
    import json
    if request.is_ajax():
        # print(request.POST.get('a'))
        if request.user.is_authenticated:
            # return HttpResponse('True')
            return HttpResponse(json.dumps(True))
        else:
            # return HttpResponse('Fase')
            return HttpResponse(json.dumps(False))