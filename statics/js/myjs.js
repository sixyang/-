function like(jibai) {

    var article_id = $(jibai).attr('data-id');
    var flag = $(jibai).children().html().search('active');

    if (flag == -1){
        // $(jibai).empty();
        // $(jibai).append("        <span class=\"recommend-icon left\">\n"+
        //     "    <span class=\"recommend-icon-img\" id=\"like\" style=\"background-image: url('/statics/images/recommend_active-4d2339fdaa.png')\"></span>\n" +
        //                 "    <span class=\"recommend-icon-img-animate\"></span></span>"+
        //     "<span class=\"recommend-num left\" id=\"like_num\" style='color: #f8aa00'>4</span>");
        num = (parseInt($(jibai).find('#like_num').text())+1)

        $.ajax({
            url:'/like',
            type:'post',
            data:{
                id:article_id
            },
            success:
                //TODO: 这个函数不成功！
                function (data) {
                    alert("fuck");
                    if (JSON.parse(data)){
                        alert("成功!");
                    }
                },
            error:
                function (data) {
                    if(data.responseText == 'fail'){
                        alert('抱歉，请先登录！');
                    }
                    else if(data.responseText == 'ok'){
                        $(jibai).empty();
        $(jibai).append("        <span class=\"recommend-icon left\">\n"+
            "    <span class=\"recommend-icon-img\" id=\"like\" style=\"background-image: url('/statics/images/recommend_active-4d2339fdaa.png')\"></span>\n" +
                        "    <span class=\"recommend-icon-img-animate\"></span></span>"+
            "<span class=\"recommend-num left\" id=\"like_num\" style='color: #f8aa00'>"+num+"</span>");

                        alert('已添加到我喜欢！');
                    }
                }
        })
    }
    else{
        // $(jibai).empty();
        // $(jibai).append("        <span class=\"recommend-icon left\">\n"+
        //     "    <span class=\"recommend-icon-img\" id=\"like\" style=\"background-image: url('/statics/images/recommend_icon-a01a72f653.png')\"></span>\n" +
        //                 "    <span class=\"recommend-icon-img-animate\"></span></span>"+
        //     "<span class=\"recommend-num left\" id=\"like_num\" style='color: #aeaeae'>4</span>");
        num = (parseInt($(jibai).find('#like_num').text())-1)

        $.ajax({
            url:'/like',
            type:'post',
            data:{
                id:article_id,
                remove: 'yes',
            },
            success:
                //TODO: 这个函数不成功！
                function (data) {
                    alert("fuck");
                    if (JSON.parse(data)){
                        alert("成功!");
                    }
                },
            error:
                function (data) {
                    if(data.responseText == 'del_ok'){
                        alert('取消喜欢成功！');
                        $(jibai).empty();
        $(jibai).append("        <span class=\"recommend-icon left\">\n"+
            "    <span class=\"recommend-icon-img\" id=\"like\" style=\"background-image: url('/statics/images/recommend_icon-a01a72f653.png')\"></span>\n" +
                        "    <span class=\"recommend-icon-img-animate\"></span></span>"+
            "<span class=\"recommend-num left\" id=\"like_num\" style='color: #aeaeae'>"+num+"</span>");

                    }
                    else if(data.responseText == 'fail'){
                        alert('抱歉，请先登录！');
                    }
                }
        })
    }
}

function lack() {
    alert("懒得放东西……");

}


$("#upload").click(function () {
    $.ajax({
    url:'/upload',
    type: 'post',
    // dataType: 'json',
    data:{
        a:'jibai',
    },
    // success: function (data) {                   不知道为什么，success函数不执行，不管怎么样都只会到error里面
    //     alert('success');
    //     alert(data);
    //     },
    error: function (data) {
        if(JSON.parse(data)){
            $('#release').append("<div id=\"mask\" class=\"mask\" style=\"width: 1263px; height: 8987px; display: block;\"></div>\n" +
                "    <div id='release_main' class=\"dialog newDialog release-dialog animated2 scaleIn scaleIn\" style=\"z-index: 101; top: 216px; left: 7.83331px;\">\n" +
                "    <img class=\"close-icon\" src=\"/statics/images/close-8809a1ad23.png\" onclick='iclose();' alt='fuck'>\n" +
                "    <div class=\"publish-category-con clearfix\">\n" +
                "        <div class=\"publish-item charact left\" onclick='text();'>\n" +
                "            <img src=\"/statics/images/release_txt-a491bceff8 .png\" alt=\"\" class=\"publish-text-icon\">\n" +
                "            <div class=\"publish-text\">文字</div>\n" +
                "        </div>\n" +
                "        <div class=\"publish-item publish-pictures left\" onclick='pic();'>\n" +
                "            <img src=\"/statics/images/release_img-0604239d83.png\" alt=\"\" class=\"publish-text-icon\">\n" +
                "            <div class=\"publish-text publish-pic-text\">图片</div>\n" +
                "        </div>\n" +
                "        <div class=\"publish-item publish-url left\" onclick='link_to();'>\n" +
                "            <img src=\"/statics/images/release_url-1bef8f8460.png\" alt=\"\" class=\"publish-text-icon\">\n" +
                "            <div class=\"publish-text publish-url-text\">链接</div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    </div>")
        }
        else {
            alert("抱歉，请先登录……");
        }
    }
    })

});


function iclose() {
    $('#mask').remove();
    $('#release_main').remove();
}

function text() {
    $("#release_main").remove();
    $('#mask').after("<div class=\"dialog newDialog release-dialog-text animated2 scaleInY\" id='text_dialog' style=\"z-index: 101; top: 54.5px; left: 23.8333px; display: block;\">\n" +
        "            <img class=\"close-icon\" src=\"/statics/images/close-8809a1ad23.png\" onclick='tclose();'>\n" +
        // "<form action='/release' method='post'>" +
        "            <div class=\"release-text-container form-item\">\n" +
        "                <div class=\"text-title\">分享新发现</div>\n" +
        "                <div class=\"publish-options-report\">\n" +
        "                    <textarea class=\"dialog-share-text\" name='text' id='talk_text' placeholder=\"说你想说的……\"></textarea>\n" +
        "                    <p class=\"report-tips\"><span class=\"comment-input-title\">一共可输入</span><span class=\"comment-input-num\">150</span>字</p>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"publish-options\">\n" +
        "                <label for=\"\">发布到：</label>\n" +
        "                      <span class=\"publish-options-select\" id='type_select'>\n" +
        "                        <a href=\"javascript:;\" data-id=\"scoff\" onclick='type_select_func(this);' class=\"active\"><input name='type' id='talk_input' value='/zone/scoff' type='text' style='display: none'>段子</a>\n" +
        "                        <a href=\"javascript:;\" data-id=\"ask\" onclick='type_select_func(this);'>你问我答</a>\n" +
        "                        <a href=\"javascript:;\" data-id=\"news\" onclick='type_select_func(this);'>42区</a>\n" +
        "                        <a href=\"javascript:;\" data-id=\"tec\" onclick='type_select_func(this);'>挨踢1024</a>\n" +
        "                      </span>\n" +
        "                <button class=\"btn right dialog-publish-btn\" style='cursor: pointer' onclick='send_by_ajax();'>发布</button>\n" +
        "                <div class=\"btn loading-more-img-con comment-loading right dialog-release-btn-loading\" style=\"width: 78px; padding: 8px 0px; display: none;\">\n" +
        "                    <span class=\"bounce bounce1\"></span>\n" +
        "                    <span class=\"bounce bounce2\"></span>\n" +
        "                    <span class=\"bounce bounce3\"></span>\n" +
        "                </div>\n" +
        "            </div>\n" +
        // "</form>" +
        "        </div>")
}
function type_select_func(fuck) {
    var me = $(fuck);
    var cur_choice = me.attr('data-id');

    // if($("#type_select").children().hasClass('active')){
    //     $("#type_select").children().removeClass('active');
    //     $("#type_select").find('input').remove();
    // }

    if(me.parent().children().hasClass('active')){
        me.parent().children().removeClass('active');
        me.parent().find('input').remove();

    }
    $(fuck).addClass('active');
    $(fuck).after("<input name='type' id='talk_input' value='/zone/" + cur_choice +"' type='text' style='display: none'>")
}
function tclose() {
    $('#text_dialog').remove();
    $('#mask').remove();
}
function send_by_ajax() {
    //TODO: 这里加上一段验证函数
    $.ajax({
        url:'/release',
        type: 'post',
        async: false,
        dataType: 'json',
        data: {
            text: $('#talk_text').val(),
            zone: $('#talk_input').val(),
        },
        success: function (data) {              //这里的success函数也没有进去。
            alert('fuck you');

        },
        error: function (data) {
            if(data == 'ok'){
                alert("上传成功！")
            }
        }
    });
    tclose();
};


function pic() {
    $('#release_main').remove();
    $('#mask').after("<div class=\"dialog newDialog release-dialog-pic animated2 scaleInY\" id='pic_dialog' style=\"z-index: 101; top: 0.00300781px; left: 23.8333px; display: block;\">\n" +
        "                        <img class=\"close-icon\" src=\"/statics/images/close-8809a1ad23.png\" onclick='pclose();'>\n" +
        "                        <div class=\"release-text-container form-item\">\n" +
        "                            <div class=\"text-title\">分享新发现</div>\n" +
        "                            \n" +
        "                            <div class=\"publish-options\">\n" +
        "                                <div class=\"publish-options-title\"><span class=\"b\">你的图片：</span>（只可上传一张图片，支持jpg、jpeg、png、gif格式，大小不得超过3M。）</div>\n" +
        "                                \n" +
        "                                <div class=\"publish-options-picture\">\n" +
        "                                    <div class=\"dialog-check-img\">\n" +
        // "                                        <div class=\"publish-upload-file check\">\n" +
        // "                                            <label for=\"dialog-upload-pic\" class=\"dialog-upload-label\">\n" +
        "                                                <input id='pic_input' class='project-file' type=\"file\" data-id=\"0\" accept=\"image/*\" data-type=\"0\" name=\"addFile\" style=\"display:block;\" id=\"dialog-upload-pic\" value='选择图片'>\n" +
        // "                                            </label>\n" +
        // "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "           \n" +
        "                                <div class=\"publish-options-report\" style=\"height: 98px;\">\n" +
        "                                    <textarea id='pic_talk_input' class=\"dialog-share-text\" data-id=\"1\" name=\"dialog-share-text\" data-type=\"1\" placeholder=\"说你想说的……\"></textarea>\n" +
        "                                    <p class=\"report-tips\"><span class=\"comment-input-title\">一共可输入</span><span class=\"comment-input-num\">150</span>字，且必须有值。</p>\n" +
        "                                </div>\n" +
        "              \n" +
        "                \n" +
        "              \n" +
        "                                <div class=\"dialog-common-warn-tips\"></div> <!--错误提示-->\n" +
        "               \n" +
        "                                <div class=\"publish-options\">\n" +
        "                                    <label for=\"\">发布到：</label>\n" +
        "                                    <span class=\"publish-options-select\">\n" +
        "                                        <a href=\"javascript:;\" data-id=\"pic\" onclick='type_select_func(this);' class=\"active\"><input name='type' id='talk_input' value='/zone/pic' type='text' style='display: none'>图片</a>\n" +
        "                                        <a href=\"javascript:;\" data-id=\"ask\" onclick='type_select_func(this);'>你问我答</a>\n" +
        "                                        <a href=\"javascript:;\" data-id=\"news\" onclick='type_select_func(this);'>42区</a>\n" +
        "                                        <a href=\"javascript:;\" data-id=\"tec\" onclick='type_select_func(this);'>挨踢1024</a>\n" +
        "                                        <a href=\"javascript:;\" data-id=\"scoff\" onclick='type_select_func(this);'>段子</a>\n" +
        "                                    </span>\n" +
        "                                    <span class=\"btn right dialog-publish-btn\" style='cursor: pointer;' onclick='send_pic_by_ajax();'>发布</span>\n" +
        "                                    <div class=\"btn loading-more-img-con comment-loading right dialog-release-btn-loading\" style=\"width: 78px; padding: 8px 0px; display: none;\">\n" +
        "                                        <span class=\"bounce bounce1\"></span>\n" +
        "                                        <span class=\"bounce bounce2\"></span>\n" +
        "                                        <span class=\"bounce bounce3\"></span>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "       \n" +
        "                                <div class=\"publish-error\"></div>\n" +
        "                        </div>\n" +
        "                    </div></div>")
}
function pclose() {
    $('#pic_dialog').remove();
    $('#mask').remove();
}
function send_pic_by_ajax() {
    //TODO: 这里有第一段验证函数

    var form_obj = new FormData();
    form_obj.append('pic', $('#pic_input')[0].files[0]);
    form_obj.append('text',$("#pic_talk_input").val());
    form_obj.append('zone', $('#talk_input').val());

    $.ajax({
        url: '/release',
        type: 'post',
        process_data: false,
        contentType: false,
        // data:{
        //     picture: form_obj,
        //     text: $("#pic_talk_input").val(),
        //     zone: $('#talk_input').val(),
        // },
        data: form_obj,
        success:function (data) {
            alert('ok');
        },
        error:function (data) {
            alert('上传成功！');
        }

    });
    pclose();

}


function link_to() {
    $("#release_main").remove();
    $("#mask").after("<div class=\"dialog newDialog release-dialog-url animated2 scaleInY\" id='link_dialog' style=\"z-index: 101; top: 29.503px; left: 23.8333px; display: block;\">\n" +
        "                <img class=\"close-icon\" src=\"/statics/images/close-8809a1ad23.png\" onclick='lclose();'>\n" +
        "                <div class=\"release-url-container form-item\">\n" +
        "                    <div class=\"text-title\">分享新发现</div>\n" +
        "                    \n" +
        "                        <div class=\"release-url\">\n" +
        "                             <label>添加链接：</label>\n" +
        "                             <div class=\"release-url-content\">\n" +
        "                                <input id='get_url' type=\"text\" name=\"release-input-url\" data-id=\"0\" class=\"release-input-url\" placeholder=\"http://\">\n" +
        "                                <button class=\"btn right dialog-publish-btn\" onclick='get_title();'>获取标题</button>\n" +
        "                                \n" +
        "                                <div class=\"btn loading-more-img-con comment-loading right release-btn-loading\">\n" +
        "                                    <span class=\"bounce bounce1\"></span>\n" +
        "                                    <span class=\"bounce bounce2\"></span>\n" +
        "                                    <span class=\"bounce bounce3\"></span>\n" +
        "                                </div>\n" +
        "                             </div>\n" +
        "                        </div>\n" +
        "                                \n" +
        "                        <div class=\"relese-url-items\">\n" +
        "                            <div class=\"publish-options-report disabled\">\n" +
        "                                <textarea id='url_area' class=\"dialog-share-text\" name=\"dialog-share-text\" data-id=\"1\" placeholder=\"输入你的链接标题……\"></textarea>\n" +
        "                            </div>\n" +
        "                            <div class=\"dialog-common-warn-tips\"></div><!--错误提示-->\n" +
        "                            <input id='pic_input' class='project-file' type=\"file\" data-id=\"0\" accept=\"image/*\" data-type=\"0\" name=\"addFile\" style=\"display:block;\" id=\"dialog-upload-pic\" value='选择图片'>" +
        "                            <div class=\"publish-options\" style=\"overflow: hidden\">\n" +
        "                                <label for=\"\">发布到：</label>\n" +
        "                                <span class=\"publish-options-select\">\n" +
        "                                    <a href=\"javascript:;\" data-id=\"news\" class=\"active\">42区</a>\n" +
        "                                    <a href=\"javascript:;\" data-id=\"ask\" onclick='type_select_func(this);'><input name='type' id='talk_input' value='/zone/pic' type='text' style='display: none'>你问我答</a>\n" +
        "                                    <a href=\"javascript:;\" data-id=\"pic\" onclick='type_select_func(this);'>图片</a>\n" +
        "                                    <a href=\"javascript:;\" data-id=\"tec\" onclick='type_select_func(this);'>挨踢1024</a>\n" +
        "                                    <a href=\"javascript:;\" data-id=\"scoff\" onclick='type_select_func(this);'>段子</a>\n" +
        "                                </span>\n" +
        "                                <span class=\"btn right dialog-publish-btn \" onclick='send_url_by_ajax();'>发布</span>\n" +
        "                                <div class=\"btn loading-more-img-con comment-loading right dialog-release-btn-loading\" style=\"width: 78px; padding: 8px 0px; display: none;\">\n" +
        "                                    <span class=\"bounce bounce1\"></span>\n" +
        "                                    <span class=\"bounce bounce2\"></span>\n" +
        "                                    <span class=\"bounce bounce3\"></span>\n" +
        "                                </div>    \n" +
        "                            </div>           \n" +
        "                    </div>\n" +
        "                                \n" +
        "                </div>  \n" +
        "            </div>")
}
function lclose() {
    $('#link_dialog').remove();
    $('#mask').remove();
}
function get_title() {
    $.ajax({
        url: '/get_title',
        type: 'post',
        data: {
            url: $("#get_url").val(),
        },
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            if(data.responseText != 'no'){
                $('#url_area').val(data.responseText);
            }
            else{
                $('#url_area').val("抱歉，你的网址找不到标题，请手动添加。");
            }
        }
    })
}
function send_url_by_ajax() {
    var form_obj = new FormData();
    form_obj.append('pic', $("#pic_input")[0].files[0]);
    form_obj.append('text', $("#url_area").val());
    form_obj.append('url', $("#get_url").val());
    form_obj.append('zone', $('#talk_input').val());
    $.ajax({
        url: '/release',
        type: 'post',
        data: form_obj,
        contentType: false,
        process_data: false,
        success: function (data) {
            // alert(data);
        },
        error: function (data) {
            alert('上传成功！');
        }
    });
    lclose();
}

function x() { alert('收藏功能和喜欢功能差不多，所以没开发') }