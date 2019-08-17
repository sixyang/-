"use strict";

function _defineProperty(e, n, i) {
    return n in e ? Object.defineProperty(e, n, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = i, e
}

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, n) {
    for (var i = 0; i < n.length; i++) {
        var t = n[i];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t)
    }
}

function _createClass(e, n, i) {
    return n && _defineProperties(e.prototype, n), i && _defineProperties(e, i), e
}

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function ViewPicture(e, n, i) {
    this.idx = n, this.dataArr = i, this.url = e, this.imgIdx = 1, this.init()
}

! function () {
    $.ajaxSetup({
        cache: !1,
        dataType: "json",
        processData: !1
    }), $.ajaxPrefilter(function (a, e, n) {
        var i = a.data,
            t = a.type && a.type.toLocaleUpperCase(),
            s = a.contentType;
        a.type = t, i && s && _.isObject(i) && (a.data = function (e, i) {
            var t = {};
            i && !_.isArray(e) ? _.each(e, function (e, n) {
                t[n = i + "." + n] = e
            }) : t = e;
            return function (e, t) {
                var i = [],
                    a = function (e, n) {
                        n = _.isFunction(n) ? n() : n, i.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                    };
                if (_.isArray(e)) _.each(e, function (e, n) {
                    var i = t ? t + "." + e.name : e.name;
                    a(i, e.value)
                });
                else
                    for (var n in e) p(n, e[n], a);
                return i.join("&")
            }(t, i)
        }(i));
        var o, l, r = function (e) {
            var n = e.type + "_" + e.url;
            e.type && "GET" != e.type.toLocaleUpperCase() && "POST" != e.type.toLocaleUpperCase() && "DELETE" != e.type.toLocaleUpperCase() || !e.data || (n += "_" + e.data);
            return n
        }(a);
        m[r] ? n.abort() : (l = n, (m[o = r] = l).pendingRequestKey = o);
        var c = a.success,
            d = a.error;
        a.success = function (e, n, i) {
            if ("GET_/logout" === i.pendingRequestKey && location.reload(), 200 !== e.code) 401 === e.code ? location.reload() : (a.customize || e.msg && window.CT && window.CT.showTopTips && window.CT.showTopTips("error", e.msg), _.isFunction(d) && d(e, n, i));
            else if (_.isFunction(c)) {
                var t = e.data;
                null == t && (t = {}), c(t, n, i)
            }
        }, a.complete = function (e, n) {
            m[e.pendingRequestKey] = null
        }
    });
    var m = {};

    function p(i, e, t) {
        if (_.isArray(e)) _.each(e, function (e, n) {
            p(i + "[" + n + "]", e, t)
        });
        else if (null != e && "object" === _typeof(e))
            for (var n in e) p(i + "." + n, e[n], t);
        else t(i, e)
    }
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        ItemTmpl: '\n            <div class="comment-li noChild comment-li-{{id}} comment-depth-{{depth}}"  data-idx="{{depth}}">\n                {{#unless isFirstLevel}}\n                    \x3c!--<div class="last-line"></div>--\x3e\n                    <div class="prefix">\n                        <div class="vertical-line"></div>\n                        <div class="horizontal-line"></div>\n                        <div class="add-con">\n                            <div class="min"></div>\n                            <div class="add"></div>\n                        </div>\n                        <div class="less-con" style="display: none;">\n                            <div class="min"></div>\n                        </div>\n                    </div>\n                {{/unless}}\n                <div class="comment-content-con">\n                    <div class="comment-user-card-con" data-jid="{{jid}}" data-id="{{id}}"></div>\n                    <a class="comment-avatar-con" href="/publish/links/{{jid}}" target="_blank">\n                        <img class="comment-avatar" src="{{replaceHttps user.imgUrl}}" alt="" onerror="javascript:this.src=\'/statics/images/image48-9d05fa83eb.png\';this.onerror=null;">\n                        {{#if isLandlord}}\n                            <img class="landlord-icon" src="/statics/images/landlord-acbd367b0c.png" alt="">\n                        {{/if}}\n                    </a>\n                    <div class="comment-item-con">\n                        <div class="comment-author-con clearfix">\n                            <a href="/publish/links/{{jid}}" target="_blank" class="comment-author left">{{user.nick}}</a>\n                            <span class="comment-time left" data-time="{{createTime}}">{{timeagoComment createTime}}评论</span>\n                            <div class="reply-con right clearfix" id="replyCon" data-vote={{isVote}} data-id={{id}} data-self-status={{selfStatus}}>\n                                <a class="reply-item hate right {{downClass}}" href="javascript:;"  >\n                                    <span class="hate-icon"></span>\n                                    <span class="hate-num">{{downs}}</span>\n                                </a>\n\n                                <a class="reply-item like {{upClass}} right" href="javascript:;">\n                                    <span class="like-icon"></span>\n                                    <span class="like-num">{{ups}}</span>\n                                </a>\n\n                                {{#unless isSeven}}\n                                <a class="reply-item reply right" href="javascript:;">\n                                    回复\n                                </a>\n                                {{/unless}}\n                                <a class="reply-item self right" href="javascript:;" id="self">\n                                    {{#if selfStatus}}已{{/if}}私藏\n                                </a>\n                                {{#unless isMyself}}\n                                    <a class="reply-item report right" href="javascript:;" id="report">\n                                        举报\n                                    </a>\n                                {{/unless}}\n                            </div>\n                        </div>\n                        <div class="comment-content">\n                            {{#if isDissentTag}}\n                                <span class="dissentTag">{{dissentTag}} </span>\n                            {{/if}}\n                            {{{content}}}\n                            {{#if pictureUrl}}\n                                <p class="img-comment-con" >\n                                    <img data-open="{{pictureUrl}}" src="{{replaceHttps pictureUrl}}?imageView2/1/w/100/h/100/interlace/1" class="img-comment"/>\n                                </p>\n                            {{/if}}\n                        </div>\n                    </div>\n                    <div class="comment-item-area-con comment-item-area-con-{{id}}" data-id="{{id}}">\n                        <div class="comment-item-area {{#if commentHavePicture}}comment-item-pic-area{{/if}}">\n                            <span class="reply-icon-arrow"></span>\n                            <div class="comment-textarea-con clearfix" >\n                                <div class="comment-item-border left comment-img-border " >\n                                    <textarea class="comment-item-textarea"></textarea>\n                                    <label class="comment-item-placeholder">回复 {{user.nick}}：</label>\n                                    <div class="comment-item-preview-con">\n                                        <span class="preview-item-bg-con left">\n                                            <span class="preview-item-bg"></span>\n                                            <span class="progress-item-base">\n                                                <span class="progress-item-percent"></span>\n                                            </span>\n                                        </span>\n                                        <img class="preview-item-image left"\n                                            src=""\n                                            alt="">\n                                        <img class="preview-item-close " src="/statics/images/removeUpload-f46f113509.png" alt="" data-id="{{id}}">\n                                    </div>\n                                    <div class="comment-item-input-tips">\n                                        <span class="can-input-item-text">还可输入</span><span class="over-input-item-text">已超出</span><span class="comment-item-input-num">150</span>个字\n                                    </div>\n                                </div>\n                            </div>\n                            \n                        </div>\n\n                        <div class="comment-btn-con clearfix">\n                            <div class="comment-item-btn btn right disabled">评论</div>\n                            <div class="btn loading-more-img-con comment-loading right">\n                                <span class="bounce bounce1"></span><span class="bounce bounce2"></span><span class="bounce bounce3"></span>\n                            </div>\n                            {{#if commentHavePicture}}\n                                <div class="comment-item-image-con right">\n                                    <input type="file" id="uploadFile-{{id}}" class="item-uploadFile"  data-id="{{id}}"/>\n                                    <label for="uploadFile-{{id}}">\n                                        <span class="comment-item-image-icon right"></span>\n                                    </label>\n                                </div>\n                            {{/if}}\n                        </div>\n                        <div class="comment-item-input-error left">1分钟之内不可提交相同评论</div>\n                    </div>\n                </div>\n            </div>\n        ',
        ItemWithUlTmpl: '\n            <div class="comment-ul" data-idx={{idx}}>\n                <div class="comment-li  noChild comment-li-{{id}} comment-depth-{{depth}}" data-idx="{{depth}}">\n                    <div class="last-line"></div>\n                    <div class="prefix">\n                        <div class="vertical-line"></div>\n                        <div class="horizontal-line"></div>\n                        <div class="add-con">\n                            <div class="min"></div>\n                            <div class="add"></div>\n                        </div>\n                        <div class="less-con" style="display: none;">\n                            <div class="min"></div>\n                        </div>\n                    </div>\n                    <div class="comment-content-con">\n                        <div class="comment-user-card-con" data-jid="{{jid}}" data-id="{{id}}"></div>\n                        <a class="comment-avatar-con" href="/publish/links/{{jid}}" target="_blank">\n                            <img class="comment-avatar" src="{{replaceHttps user.imgUrl}}" alt="" onerror="javascript:this.src=\'/statics/images/image48-9d05fa83eb.png\';this.onerror=null;">\n                            {{#if isLandlord}}\n                                <img class="landlord-icon" src="/statics/images/landlord-acbd367b0c.png" alt="">\n                            {{/if}}\n                        </a>\n                        <div class="comment-item-con">\n                            <div class="comment-author-con clearfix">\n                                <a href="/publish/links/{{jid}}" target="_blank" class="comment-author left">{{user.nick}}</a>\n                                <span class="comment-time left"  data-time="{{createTime}}">{{timeagoComment createTime}}评论</span>\n                                <div class="reply-con right clearfix" id="replyCon" data-vote={{isVote}} data-id={{id}} data-self-status={{selfStatus}}>\n                                    <a class="reply-item hate right {{downClass}}" href="javascript:;"  >\n                                        <span class="hate-icon"></span>\n                                        <span class="hate-num">{{downs}}</span>\n                                    </a>\n\n                                    <a class="reply-item like {{upClass}} right" href="javascript:;">\n                                        <span class="like-icon"></span>\n                                        <span class="like-num">{{ups}}</span>\n                                    </a>\n\n                                    {{#unless isSeven}}\n                                    <a class="reply-item reply right" href="javascript:;">\n                                        回复\n                                    </a>\n                                    {{/unless}}\n                                    <a class="reply-item self right" href="javascript:;" id="self">\n                                        {{#if selfStatus}}已{{/if}}私藏\n                                    </a>\n                                    {{#unless isMyself}}\n                                        <a class="reply-item report right" href="javascript:;" id="report">\n                                            举报\n                                        </a>\n                                    {{/unless}}\n                                </div>\n                            </div>\n                            <div class="comment-content">\n                                {{#if isDissentTag}}\n                                    <span class="dissentTag">{{dissentTag}} </span>\n                                {{/if}}\n                                {{{content}}}\n                                {{#if pictureUrl}}\n                                    <p class="img-comment-con" >\n                                        <img data-open="{{pictureUrl}}" src="{{replaceHttps pictureUrl}}?imageView2/1/w/100/h/100/interlace/1" class="img-comment"/>\n                                    </p>\n                                {{/if}}\n                            </div>\n                        </div>\n                        <div class="comment-item-area-con comment-item-area-con-{{id}}" data-id="{{id}}">\n                            <div class="comment-item-area {{#if commentHavePicture}}comment-item-pic-area{{/if}}">\n                                <span class="reply-icon-arrow"></span>\n                                <div class="comment-textarea-con clearfix" >\n                                    <div class="comment-item-border left comment-img-border " >\n                                        <textarea class="comment-item-textarea"></textarea>\n                                        <label class="comment-item-placeholder">回复 {{user.nick}}：</label>\n                                        <div class="comment-item-preview-con">\n                                            <span class="preview-item-bg-con left">\n                                                <span class="preview-item-bg"></span>\n                                                <span class="progress-item-base">\n                                                    <span class="progress-item-percent"></span>\n                                                </span>\n                                            </span>\n                                            <img class="preview-item-image left"\n                                                src=""\n                                                alt="">\n                                            <img class="preview-item-close " src="/statics/images/removeUpload-f46f113509.png" alt="" data-id="{{id}}">\n                                        </div>\n                                        <div class="comment-item-input-tips">\n                                            <span class="can-input-item-text">还可输入</span><span class="over-input-item-text">已超出</span><span class="comment-item-input-num">150</span>个字\n                                        </div>\n                                    </div>\n                                </div>\n                                \n                            </div>\n\n                            <div class="comment-btn-con clearfix">\n                                <div class="comment-item-btn btn right disabled">评论</div>\n                                <div class="btn loading-more-img-con comment-loading right">\n                                  <span class="bounce bounce1"></span><span class="bounce bounce2"></span><span class="bounce bounce3"></span>\n                                </div>\n                                {{#if commentHavePicture}}\n                                    <div class="comment-item-image-con right">\n                                        <input type="file" id="uploadFile-{{id}}" class="item-uploadFile"  data-id="{{id}}"/>\n                                        <label for="uploadFile-{{id}}">\n                                            <span class="comment-item-image-icon right"></span>\n                                        </label>\n                                    </div>\n                                {{/if}}\n                            </div>\n                            <div class="comment-item-input-error left">1分钟之内不可提交相同评论</div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n        '
    };
    _.extend(window.CT, e)
}(jQuery), Handlebars.registerHelper("ageDiff", function (e, n) {
        return window.CT.getDiffAge(e, n)
    }), Handlebars.registerHelper("timeago", function (e) {
        return window.CT.getDifferTime(e)
    }), Handlebars.registerHelper("timeagoComment", function (e) {
        return window.CT.getCommentDifferTime(e)
    }), Handlebars.registerHelper("getSubject", function (e) {
        if (window.CT.config.subjects[e + ""]) return window.CT.config.subjects[e + ""].name_en
    }), Handlebars.registerHelper("getSubjectName", function (e) {
        if (2 != e && window.CT.config.subjects[e + ""]) return window.CT.config.subjects[e + ""].name_cn
    }), Handlebars.registerHelper("getFormDateToMin", function (e) {
        return window.CT.getFormDateToMin(e)
    }), Handlebars.registerHelper("userAttention", function (e, n) {
        if (window.jid === n) return "";
        var i = "none",
            t = "none",
            a = "none";
        return window.jid ? 0 == e || 2 == e ? (i = "block", a = t = "none") : 1 == e ? (t = "block", a = i = "none") : 3 == e && (t = i = "none", a = "block") : (i = "block", a = t = "none"), new Handlebars.SafeString('<a class="user-btn unattention right" data-jid="' + n + '" style="display: ' + i + '"><img class="add-icon" src="/statics/images/add_w-1e2cf4752e.png" />关注</a>        <a class="user-btn concerned right" data-jid=' + n + ' style="display: ' + t + '">                <img class="right-icon" src="/statics/images/mark-91282b656d.png" />                <span class="concerned-text">已关注</span>                <img class="cancel-icon" src="/statics/images/cross-958ac07f5b.png" />                <span class="cancel-text">取消关注</span>        </a>        <a class="user-btn mutual right" data-jid=' + n + ' style="display: ' + a + '">            <img class="mutual-icon" src="/statics/images/each-a720a644f1.png" />            <span class="mutual-text">互相关注</span>            <img class="cancel-icon" src="/statics/images/cross-958ac07f5b.png" />            <span class="cancel-text">取消关注</span>        </a>')
    }), Handlebars.registerHelper("getThousand", function (e) {
        return window.CT.getThousand(e)
    }), Handlebars.registerHelper("isImageScale", function (e) {
        return e && -1 < e.indexOf(".gif") ? "" : "image-scale"
    }), Handlebars.registerHelper("getLinkUrl", function (e) {
        return e.url && !~e.url.indexOf("pic/show") ? e.url : "/link/" + e.id
    }), Handlebars.registerHelper("getSubjectUrl", function (e) {
        return "/zone/" + window.CT.config.subjects[e + ""].name_en
    }), Handlebars.registerHelper("setArea", function (e, n) {
        return e == n ? e : e + " " + n
    }), Handlebars.registerHelper("dealDomain", function (e) {
        return ~e.toLocaleLowerCase().indexOf("chouti.com") ? "" : e
    }), Handlebars.registerHelper("getTopicName", function (e) {
        return 10 < e.length ? e.slice(0, 10) : e
    }), Handlebars.registerHelper("getMatchingIcon", function (e) {
        var n = "";
        return e.imgUrl && (2 != e.showType && 3 != e.showType && 4 != e.showType && 5 != e.showType || (n += '<img class="video-play" src="/statics/images/video/play2-47557f11bb.png"/>')), new Handlebars.SafeString(n)
    }), Handlebars.registerHelper("subSign", function (e) {
        return 30 < e.length ? e.substring(0, 30) + "..." : e
    }), Handlebars.registerHelper("getOperateClassName", function (e) {
        return e ? "active" : "normal"
    }), Handlebars.registerHelper("htmlContent", function (e) {
        if (e) return new Handlebars.SafeString(e)
    }), Handlebars.registerHelper("replaceHttps", function (e) {
        return window.CT.replaceHttps(e)
    }), Handlebars.registerHelper("subPhone", function (e) {
        return window.CT.subPhone(e)
    }),
    function () {
        window.CT = window.hasOwnProperty("CT") ? window.CT : {};
        window.CT.config = {
            areas: [{
                id: "86",
                letter: "zg",
                name: "中国",
                pinyin: "zhongguo"
            }, {
                id: "355",
                letter: "aebny",
                name: "阿尔巴尼亚",
                pinyin: "aerbaniya"
            }, {
                id: "213",
                letter: "aejly",
                name: "阿尔及利亚",
                pinyin: "aerjiliya"
            }, {
                id: "93",
                letter: "afh",
                name: "阿富汗",
                pinyin: "afuhan"
            }, {
                id: "54",
                letter: "agt",
                name: "阿根廷",
                pinyin: "agenting"
            }, {
                id: "353",
                letter: "ael",
                name: "爱尔兰",
                pinyin: "aierlan"
            }, {
                id: "20",
                letter: "aj",
                name: "埃及",
                pinyin: "aiji"
            }, {
                id: "1907",
                letter: "alsj",
                name: "阿拉斯加",
                pinyin: "alasijia"
            }, {
                id: "968",
                letter: "am",
                name: "阿曼",
                pinyin: "aman"
            }, {
                id: "1809",
                letter: "agld",
                name: "安圭拉岛",
                pinyin: "anguiladao"
            }, {
                id: "61",
                letter: "adly",
                name: "澳大利亚",
                pinyin: "aodaliya"
            }, {
                id: "43",
                letter: "adl",
                name: "奥地利",
                pinyin: "aodili"
            }, {
                id: "853",
                letter: "am",
                name: "澳门",
                pinyin: "aomen"
            }, {
                id: "1809",
                letter: "bbds",
                name: "巴巴多斯",
                pinyin: "babaduosi"
            }, {
                id: "1809",
                letter: "bhm",
                name: "巴哈马",
                pinyin: "bahama"
            }, {
                id: "92",
                letter: "bjst",
                name: "巴基斯坦",
                pinyin: "bajisitan"
            }, {
                id: "595",
                letter: "blg",
                name: "巴拉圭",
                pinyin: "balagui"
            }, {
                id: "973",
                letter: "bl",
                name: "巴林",
                pinyin: "balin"
            }, {
                id: "507",
                letter: "bnm",
                name: "巴拿马",
                pinyin: "banama"
            }, {
                id: "55",
                letter: "bx",
                name: "巴西",
                pinyin: "baxi"
            }, {
                id: "32",
                letter: "bls",
                name: "比利时",
                pinyin: "bilishi"
            }, {
                id: "51",
                letter: "bl",
                name: "秘鲁",
                pinyin: "bilu"
            }, {
                id: "354",
                letter: "bd",
                name: "冰岛",
                pinyin: "bingdao"
            }, {
                id: "1809",
                letter: "bdlg",
                name: "波多黎各",
                pinyin: "boduolige"
            }, {
                id: "48",
                letter: "bl",
                name: "波兰",
                pinyin: "bolan"
            }, {
                id: "591",
                letter: "blwy",
                name: "玻利维亚",
                pinyin: "boliweiya"
            }, {
                id: "501",
                letter: "blz",
                name: "伯利兹",
                pinyin: "bolizi"
            }, {
                id: "975",
                letter: "bd",
                name: "不丹",
                pinyin: "budan"
            }, {
                id: "226",
                letter: "bjlfs",
                name: "布基拉法索",
                pinyin: "bujilafasuo"
            }, {
                id: "850",
                letter: "cx",
                name: "朝鲜",
                pinyin: "chaoxian"
            }, {
                id: "45",
                letter: "dm",
                name: "丹麦",
                pinyin: "danmai"
            }, {
                id: "49",
                letter: "dg",
                name: "德国",
                pinyin: "deguo"
            }, {
                id: "684",
                letter: "dsmy",
                name: "东萨摩亚",
                pinyin: "dongsamoya"
            }, {
                id: "593",
                letter: "egde",
                name: "厄瓜多尔",
                pinyin: "eguaduoer"
            }, {
                id: "7",
                letter: "els",
                name: "俄罗斯",
                pinyin: "eluosi"
            }, {
                id: "33",
                letter: "fg",
                name: "法国",
                pinyin: "faguo"
            }, {
                id: "298",
                letter: "flqd",
                name: "法罗群岛",
                pinyin: "faluoqundao"
            }, {
                id: "396",
                letter: "fdg",
                name: "梵蒂冈",
                pinyin: "fandigang"
            }, {
                id: "594",
                letter: "fsgyn",
                name: "法属圭亚那",
                pinyin: "fashuguiyanei"
            }, {
                id: "679",
                letter: "fj",
                name: "斐济",
                pinyin: "feiji"
            }, {
                id: "63",
                letter: "flb",
                name: "菲律宾",
                pinyin: "feilvbin"
            }, {
                id: "500",
                letter: "fklqd",
                name: "福克兰群岛",
                pinyin: "fukelanqundao"
            }, {
                id: "220",
                letter: "gby",
                name: "冈比亚",
                pinyin: "gangbiya"
            }, {
                id: "299",
                letter: "glld",
                name: "格陵兰岛",
                pinyin: "gelinglandao"
            }, {
                id: "57",
                letter: "glby",
                name: "哥伦比亚",
                pinyin: "gelunbiya"
            }, {
                id: "506",
                letter: "gsdlj",
                name: "哥斯达黎加",
                pinyin: "gesidalijia"
            }, {
                id: "671",
                letter: "gd",
                name: "关岛",
                pinyin: "guandao"
            }, {
                id: "53",
                letter: "gb",
                name: "古巴",
                pinyin: "guba"
            }, {
                id: "592",
                letter: "gyn",
                name: "圭亚那",
                pinyin: "guiyanei"
            }, {
                id: "509",
                letter: "hd",
                name: "海地",
                pinyin: "haidi"
            }, {
                id: "82",
                letter: "hg",
                name: "韩国",
                pinyin: "hanguo"
            }, {
                id: "31",
                letter: "hl",
                name: "荷兰",
                pinyin: "helan"
            }, {
                id: "504",
                letter: "hdls",
                name: "洪都拉斯",
                pinyin: "hongdoulasi"
            }, {
                id: "233",
                letter: "jn",
                name: "加纳",
                pinyin: "jiana"
            }, {
                id: "1",
                letter: "jnd",
                name: "加拿大",
                pinyin: "jianada"
            }, {
                id: "855",
                letter: "jpz",
                name: "柬埔寨",
                pinyin: "jianpuzhai"
            }, {
                id: "686",
                letter: "jlbs",
                name: "基里巴斯",
                pinyin: "jilibasi"
            }, {
                id: "224",
                letter: "jny",
                name: "几内亚",
                pinyin: "jineiya"
            }, {
                id: "974",
                letter: "kte",
                name: "卡塔尔",
                pinyin: "kataer"
            }, {
                id: "682",
                letter: "kkqd",
                name: "科克群岛",
                pinyin: "kekequndao"
            }, {
                id: "6722",
                letter: "kksd",
                name: "科科斯岛",
                pinyin: "kekesidao"
            }, {
                id: "225",
                letter: "ktdw",
                name: "科特迪瓦",
                pinyin: "ketediwa"
            }, {
                id: "965",
                letter: "kwt",
                name: "科威特",
                pinyin: "keweite"
            }, {
                id: "856",
                letter: "lw",
                name: "老挝",
                pinyin: "laowo"
            }, {
                id: "961",
                letter: "lbn",
                name: "黎巴嫩",
                pinyin: "libanen"
            }, {
                id: "218",
                letter: "lby",
                name: "利比亚",
                pinyin: "libiya"
            }, {
                id: "4175",
                letter: "lzdsd",
                name: "列支敦士登",
                pinyin: "liezhidunshideng"
            }, {
                id: "40",
                letter: "lmny",
                name: "罗马尼亚",
                pinyin: "luomaniya"
            }, {
                id: "352",
                letter: "lsb",
                name: "卢森堡",
                pinyin: "lusenbao"
            }, {
                id: "960",
                letter: "medf",
                name: "马尔代夫",
                pinyin: "maerdaifu"
            }, {
                id: "60",
                letter: "mlxy",
                name: "马来西亚 ",
                pinyin: "malaixiya"
            }, {
                id: "223",
                letter: "ml",
                name: "马里",
                pinyin: "mali"
            }, {
                id: "222",
                letter: "mltny",
                name: "毛里塔尼亚",
                pinyin: "maolitaniya"
            }, {
                id: "596",
                letter: "mtnk",
                name: "马提尼克",
                pinyin: "matinike"
            }, {
                id: "1",
                letter: "mg",
                name: "美国",
                pinyin: "meiguo"
            }, {
                id: "976",
                letter: "mg",
                name: "蒙古",
                pinyin: "menggu"
            }, {
                id: "880",
                letter: "mjlg",
                name: "孟加拉国",
                pinyin: "mengjialaguo"
            }, {
                id: "95",
                letter: "md",
                name: "缅甸",
                pinyin: "miandian"
            }, {
                id: "210",
                letter: "mlg",
                name: "摩洛哥",
                pinyin: "moluoge"
            }, {
                id: "52",
                letter: "mxg",
                name: "墨西哥",
                pinyin: "moxige"
            }, {
                id: "338",
                letter: "nslf",
                name: "南斯拉夫",
                pinyin: "nansilafu"
            }, {
                id: "674",
                letter: "nl",
                name: "瑙鲁",
                pinyin: "naolu"
            }, {
                id: "977",
                letter: "nbe",
                name: "尼泊尔",
                pinyin: "niboer"
            }, {
                id: "505",
                letter: "njlg",
                name: "尼加拉瓜",
                pinyin: "nijialagua"
            }, {
                id: "234",
                letter: "nrly",
                name: "尼日利亚",
                pinyin: "niriliya"
            }, {
                id: "683",
                letter: "nad",
                name: "纽埃岛",
                pinyin: "niuaidao"
            }, {
                id: "6723",
                letter: "nfkd",
                name: "诺福克岛",
                pinyin: "nuofukedao"
            }, {
                id: "47",
                letter: "nw",
                name: "挪威",
                pinyin: "nuowei"
            }, {
                id: "351",
                letter: "pty",
                name: "葡萄牙",
                pinyin: "putaoya"
            }, {
                id: "81",
                letter: "rb",
                name: "日本",
                pinyin: "riben"
            }, {
                id: "46",
                letter: "rd",
                name: "瑞典",
                pinyin: "ruidian"
            }, {
                id: "41",
                letter: "rs",
                name: "瑞士",
                pinyin: "ruishi"
            }, {
                id: "503",
                letter: "sewd",
                name: "萨尔瓦多",
                pinyin: "saerwaduo"
            }, {
                id: "221",
                letter: "snje",
                name: "塞内加尔",
                pinyin: "saineijiaer"
            }, {
                id: "966",
                letter: "stalb",
                name: "沙特阿拉伯",
                pinyin: "shatealabo"
            }, {
                id: "6724",
                letter: "sdd",
                name: "圣诞岛",
                pinyin: "shengdandao"
            }, {
                id: "1809",
                letter: "slxy",
                name: "圣卢西亚",
                pinyin: "shengluxiya"
            }, {
                id: "223",
                letter: "smln",
                name: "圣马力诺",
                pinyin: "shengmalinuo"
            }, {
                id: "94",
                letter: "sllk",
                name: "斯里兰卡 ",
                pinyin: "sililanka"
            }, {
                id: "597",
                letter: "sln",
                name: "苏里南",
                pinyin: "sulinan"
            }, {
                id: "677",
                letter: "slmqd",
                name: "所罗门群岛",
                pinyin: "suoluomenqundao"
            }, {
                id: "66",
                letter: "tg",
                name: "泰国",
                pinyin: "taiguo"
            }, {
                id: "886",
                letter: "tw",
                name: "台湾",
                pinyin: "taiwan"
            }, {
                id: "676",
                letter: "tj",
                name: "汤加",
                pinyin: "tangjia"
            }, {
                id: "90",
                letter: "teq",
                name: "土耳其",
                pinyin: "tuerqi"
            }, {
                id: "216",
                letter: "tns",
                name: "突尼斯",
                pinyin: "tunisi"
            }, {
                id: "688",
                letter: "twl",
                name: "图瓦卢",
                pinyin: "tuwalu"
            }, {
                id: "678",
                letter: "wnat",
                name: "瓦努阿图",
                pinyin: "wanuatu"
            }, {
                id: "502",
                letter: "wdml",
                name: "危地马拉",
                pinyin: "weidimala"
            }, {
                id: "1809",
                letter: "wejqd",
                name: "维尔京群岛",
                pinyin: "weierjingqundao"
            }, {
                id: "1808",
                letter: "wkd",
                name: "威克岛",
                pinyin: "weikedao"
            }, {
                id: "58",
                letter: "wnrl",
                name: "委内瑞拉",
                pinyin: "weineiruila"
            }, {
                id: "673",
                letter: "wl",
                name: "文莱",
                pinyin: "wenlai"
            }, {
                id: "852",
                letter: "xg",
                name: "香港",
                pinyin: "xianggang"
            }, {
                id: "1808",
                letter: "xwy",
                name: "夏威夷",
                pinyin: "xiaweiyi"
            }, {
                id: "34",
                letter: "xby",
                name: "西班牙",
                pinyin: "xibanya"
            }, {
                id: "30",
                letter: "xl",
                name: "希腊",
                pinyin: "xila"
            }, {
                id: "65",
                letter: "xjp",
                name: "新加坡",
                pinyin: "xinjiapo"
            }, {
                id: "64",
                letter: "xxl",
                name: "新西兰",
                pinyin: "xinxilan"
            }, {
                id: "685",
                letter: "xsmy",
                name: "西萨摩亚",
                pinyin: "xisamoya"
            }, {
                id: "963",
                letter: "xly",
                name: "叙利亚",
                pinyin: "xuliya"
            }, {
                id: "1809",
                letter: "ymj",
                name: "牙买加",
                pinyin: "yamaijia"
            }, {
                id: "39",
                letter: "ydl",
                name: "意大利",
                pinyin: "yidali"
            }, {
                id: "964",
                letter: "ylk",
                name: "伊拉克",
                pinyin: "yilake"
            }, {
                id: "98",
                letter: "yl",
                name: "伊朗",
                pinyin: "yilang"
            }, {
                id: "91",
                letter: "yd",
                name: "印度",
                pinyin: "yindu"
            }, {
                id: "62",
                letter: "ydnxy",
                name: "印度尼西亚",
                pinyin: "yindunixiya"
            }, {
                id: "44",
                letter: "yg",
                name: "英国",
                pinyin: "yingguo"
            }, {
                id: "972",
                letter: "ysl",
                name: "以色列",
                pinyin: "yiselie"
            }, {
                id: "962",
                letter: "yd",
                name: "约旦",
                pinyin: "yuedan"
            }, {
                id: "84",
                letter: "yn",
                name: "越南",
                pinyin: "yuenan"
            }, {
                id: "350",
                letter: "zblt",
                name: "直布罗陀",
                pinyin: "zhibuluotuo"
            }, {
                id: "56",
                letter: "zl",
                name: "智利",
                pinyin: "zhili"
            }, {
                id: "1808",
                letter: "ztd",
                name: "中途岛",
                pinyin: "zhongtudao"
            }],
            cityJson: {
                citys: [{
                    child: [{
                        id: 1,
                        name: "北京"
                    }, {
                        id: 2,
                        name: "海淀"
                    }, {
                        id: 3,
                        name: "朝阳"
                    }, {
                        id: 4,
                        name: "顺义"
                    }, {
                        id: 5,
                        name: "怀柔"
                    }, {
                        id: 6,
                        name: "通州"
                    }, {
                        id: 7,
                        name: "昌平"
                    }, {
                        id: 8,
                        name: "延庆"
                    }, {
                        id: 9,
                        name: "丰台"
                    }, {
                        id: 10,
                        name: "石景山"
                    }, {
                        id: 11,
                        name: "大兴"
                    }, {
                        id: 12,
                        name: "房山"
                    }, {
                        id: 13,
                        name: "密云"
                    }, {
                        id: 14,
                        name: "门头沟"
                    }, {
                        id: 15,
                        name: "平谷"
                    }, {
                        id: 16,
                        name: "西城"
                    }, {
                        id: 17,
                        name: "东城"
                    }],
                    id: 10101,
                    name: "北京"
                }, {
                    child: [{
                        id: 1,
                        name: "上海"
                    }, {
                        id: 2,
                        name: "闵行"
                    }, {
                        id: 3,
                        name: "宝山"
                    }, {
                        id: 5,
                        name: "嘉定"
                    }, {
                        id: 7,
                        name: "金山"
                    }, {
                        id: 8,
                        name: "青浦"
                    }, {
                        id: 9,
                        name: "松江"
                    }, {
                        id: 10,
                        name: "奉贤"
                    }, {
                        id: 11,
                        name: "崇明"
                    }, {
                        id: 12,
                        name: "徐汇"
                    }, {
                        id: 13,
                        name: "浦东"
                    }, {
                        id: 14,
                        name: "黄浦"
                    }, {
                        id: 15,
                        name: "长宁"
                    }, {
                        id: 16,
                        name: "静安"
                    }, {
                        id: 17,
                        name: "普陀"
                    }, {
                        id: 18,
                        name: "闸北"
                    }, {
                        id: 19,
                        name: "虹口"
                    }, {
                        id: 20,
                        name: "杨浦"
                    }],
                    id: 10102,
                    name: "上海"
                }, {
                    child: [{
                        id: 1,
                        name: "天津"
                    }, {
                        id: 2,
                        name: "武清"
                    }, {
                        id: 3,
                        name: "宝坻"
                    }, {
                        id: 4,
                        name: "东丽"
                    }, {
                        id: 5,
                        name: "西青"
                    }, {
                        id: 6,
                        name: "北辰"
                    }, {
                        id: 7,
                        name: "宁河"
                    }, {
                        id: 9,
                        name: "静海"
                    }, {
                        id: 10,
                        name: "津南"
                    }, {
                        id: 14,
                        name: "蓟县"
                    }, {
                        id: 15,
                        name: "和平"
                    }, {
                        id: 16,
                        name: "河东"
                    }, {
                        id: 17,
                        name: "河西"
                    }, {
                        id: 18,
                        name: "南开"
                    }, {
                        id: 19,
                        name: "河北"
                    }, {
                        id: 20,
                        name: "红桥"
                    }, {
                        id: 21,
                        name: "滨海新区"
                    }],
                    id: 10103,
                    name: "天津"
                }, {
                    child: [{
                        id: 1,
                        name: "重庆"
                    }, {
                        id: 2,
                        name: "永川"
                    }, {
                        id: 3,
                        name: "合川"
                    }, {
                        id: 4,
                        name: "南川"
                    }, {
                        id: 5,
                        name: "江津"
                    }, {
                        id: 6,
                        name: "万盛"
                    }, {
                        id: 7,
                        name: "渝北"
                    }, {
                        id: 8,
                        name: "北碚"
                    }, {
                        id: 9,
                        name: "巴南"
                    }, {
                        id: 10,
                        name: "长寿"
                    }, {
                        id: 11,
                        name: "黔江"
                    }, {
                        id: 13,
                        name: "万州"
                    }, {
                        id: 14,
                        name: "涪陵"
                    }, {
                        id: 15,
                        name: "开县"
                    }, {
                        id: 16,
                        name: "城口"
                    }, {
                        id: 17,
                        name: "云阳"
                    }, {
                        id: 18,
                        name: "巫溪"
                    }, {
                        id: 19,
                        name: "奉节"
                    }, {
                        id: 20,
                        name: "巫山"
                    }, {
                        id: 21,
                        name: "潼南"
                    }, {
                        id: 22,
                        name: "垫江"
                    }, {
                        id: 23,
                        name: "梁平"
                    }, {
                        id: 24,
                        name: "忠县"
                    }, {
                        id: 25,
                        name: "石柱"
                    }, {
                        id: 26,
                        name: "大足"
                    }, {
                        id: 27,
                        name: "荣昌"
                    }, {
                        id: 28,
                        name: "铜梁"
                    }, {
                        id: 29,
                        name: "璧山"
                    }, {
                        id: 30,
                        name: "丰都"
                    }, {
                        id: 31,
                        name: "武隆"
                    }, {
                        id: 32,
                        name: "彭水"
                    }, {
                        id: 33,
                        name: "綦江"
                    }, {
                        id: 34,
                        name: "酉阳"
                    }, {
                        id: 36,
                        name: "秀山"
                    }, {
                        id: 37,
                        name: "渝中"
                    }, {
                        id: 38,
                        name: "大渡口"
                    }, {
                        id: 39,
                        name: "江北"
                    }, {
                        id: 40,
                        name: "沙坪坝"
                    }, {
                        id: 41,
                        name: "九龙坡"
                    }, {
                        id: 42,
                        name: "南岸"
                    }, {
                        id: 43,
                        name: "两江新区"
                    }, {
                        id: 44,
                        name: "双桥"
                    }],
                    id: 10104,
                    name: "重庆"
                }, {
                    child: [{
                        id: 1,
                        name: "哈尔滨"
                    }, {
                        id: 2,
                        name: "齐齐哈尔"
                    }, {
                        id: 3,
                        name: "牡丹江"
                    }, {
                        id: 4,
                        name: "佳木斯"
                    }, {
                        id: 5,
                        name: "绥化"
                    }, {
                        id: 6,
                        name: "黑河"
                    }, {
                        id: 7,
                        name: "大兴安岭"
                    }, {
                        id: 8,
                        name: "伊春"
                    }, {
                        id: 9,
                        name: "大庆"
                    }, {
                        id: 10,
                        name: "七台河"
                    }, {
                        id: 11,
                        name: "鸡西"
                    }, {
                        id: 12,
                        name: "鹤岗"
                    }, {
                        id: 13,
                        name: "双鸭山"
                    }],
                    id: 10105,
                    name: "黑龙江"
                }, {
                    child: [{
                        id: 1,
                        name: "长春"
                    }, {
                        id: 2,
                        name: "吉林"
                    }, {
                        id: 3,
                        name: "延边"
                    }, {
                        id: 4,
                        name: "四平"
                    }, {
                        id: 5,
                        name: "通化"
                    }, {
                        id: 6,
                        name: "白城"
                    }, {
                        id: 7,
                        name: "辽源"
                    }, {
                        id: 8,
                        name: "松原"
                    }, {
                        id: 9,
                        name: "白山"
                    }],
                    id: 10106,
                    name: "吉林"
                }, {
                    child: [{
                        id: 1,
                        name: "沈阳"
                    }, {
                        id: 2,
                        name: "大连"
                    }, {
                        id: 3,
                        name: "鞍山"
                    }, {
                        id: 4,
                        name: "抚顺"
                    }, {
                        id: 5,
                        name: "本溪"
                    }, {
                        id: 6,
                        name: "丹东"
                    }, {
                        id: 7,
                        name: "锦州"
                    }, {
                        id: 8,
                        name: "营口"
                    }, {
                        id: 9,
                        name: "阜新"
                    }, {
                        id: 10,
                        name: "辽阳"
                    }, {
                        id: 11,
                        name: "铁岭"
                    }, {
                        id: 12,
                        name: "朝阳"
                    }, {
                        id: 13,
                        name: "盘锦"
                    }, {
                        id: 14,
                        name: "葫芦岛"
                    }],
                    id: 10107,
                    name: "辽宁"
                }, {
                    child: [{
                        id: 1,
                        name: "呼和浩特"
                    }, {
                        id: 2,
                        name: "包头"
                    }, {
                        id: 3,
                        name: "乌海"
                    }, {
                        id: 4,
                        name: "乌兰察布"
                    }, {
                        id: 5,
                        name: "通辽"
                    }, {
                        id: 6,
                        name: "赤峰"
                    }, {
                        id: 7,
                        name: "鄂尔多斯"
                    }, {
                        id: 8,
                        name: "巴彦淖尔"
                    }, {
                        id: 9,
                        name: "锡林郭勒"
                    }, {
                        id: 10,
                        name: "呼伦贝尔"
                    }, {
                        id: 11,
                        name: "兴安盟"
                    }, {
                        id: 12,
                        name: "阿拉善盟"
                    }],
                    id: 10108,
                    name: "内蒙古"
                }, {
                    child: [{
                        id: 1,
                        name: "石家庄"
                    }, {
                        id: 2,
                        name: "保定"
                    }, {
                        id: 3,
                        name: "张家口"
                    }, {
                        id: 4,
                        name: "承德"
                    }, {
                        id: 5,
                        name: "唐山"
                    }, {
                        id: 6,
                        name: "廊坊"
                    }, {
                        id: 7,
                        name: "沧州"
                    }, {
                        id: 8,
                        name: "衡水"
                    }, {
                        id: 9,
                        name: "邢台"
                    }, {
                        id: 10,
                        name: "邯郸"
                    }, {
                        id: 11,
                        name: "秦皇岛"
                    }],
                    id: 10109,
                    name: "河北"
                }, {
                    child: [{
                        id: 1,
                        name: "太原"
                    }, {
                        id: 2,
                        name: "大同"
                    }, {
                        id: 3,
                        name: "阳泉"
                    }, {
                        id: 4,
                        name: "晋中"
                    }, {
                        id: 5,
                        name: "长治"
                    }, {
                        id: 6,
                        name: "晋城"
                    }, {
                        id: 7,
                        name: "临汾"
                    }, {
                        id: 8,
                        name: "运城"
                    }, {
                        id: 9,
                        name: "朔州"
                    }, {
                        id: 10,
                        name: "忻州"
                    }, {
                        id: 11,
                        name: "吕梁"
                    }],
                    id: 10110,
                    name: "山西"
                }, {
                    child: [{
                        id: 1,
                        name: "西安"
                    }, {
                        id: 2,
                        name: "咸阳"
                    }, {
                        id: 3,
                        name: "延安"
                    }, {
                        id: 4,
                        name: "榆林"
                    }, {
                        id: 6,
                        name: "商洛"
                    }, {
                        id: 7,
                        name: "安康"
                    }, {
                        id: 8,
                        name: "汉中"
                    }, {
                        id: 9,
                        name: "宝鸡"
                    }, {
                        id: 10,
                        name: "铜川"
                    }, {
                        id: 11,
                        name: "杨凌"
                    }],
                    id: 10111,
                    name: "陕西"
                }, {
                    child: [{
                        id: 1,
                        name: "济南"
                    }, {
                        id: 2,
                        name: "青岛"
                    }, {
                        id: 3,
                        name: "淄博"
                    }, {
                        id: 4,
                        name: "德州"
                    }, {
                        id: 5,
                        name: "烟台"
                    }, {
                        id: 6,
                        name: "潍坊"
                    }, {
                        id: 7,
                        name: "济宁"
                    }, {
                        id: 8,
                        name: "泰安"
                    }, {
                        id: 9,
                        name: "临沂"
                    }, {
                        id: 10,
                        name: "菏泽"
                    }, {
                        id: 11,
                        name: "滨州"
                    }, {
                        id: 12,
                        name: "东营"
                    }, {
                        id: 13,
                        name: "威海"
                    }, {
                        id: 14,
                        name: "枣庄"
                    }, {
                        id: 15,
                        name: "日照"
                    }, {
                        id: 16,
                        name: "莱芜"
                    }, {
                        id: 17,
                        name: "聊城"
                    }],
                    id: 10112,
                    name: "山东"
                }, {
                    child: [{
                        id: 1,
                        name: "乌鲁木齐"
                    }, {
                        id: 2,
                        name: "克拉玛依"
                    }, {
                        id: 3,
                        name: "石河子"
                    }, {
                        id: 4,
                        name: "昌吉"
                    }, {
                        id: 5,
                        name: "吐鲁番"
                    }, {
                        id: 6,
                        name: "巴州"
                    }, {
                        id: 7,
                        name: "阿拉尔"
                    }, {
                        id: 8,
                        name: "阿克苏"
                    }, {
                        id: 9,
                        name: "喀什"
                    }, {
                        id: 10,
                        name: "伊犁"
                    }, {
                        id: 11,
                        name: "塔城"
                    }, {
                        id: 12,
                        name: "哈密"
                    }, {
                        id: 13,
                        name: "和田"
                    }, {
                        id: 14,
                        name: "阿勒泰"
                    }, {
                        id: 15,
                        name: "克州"
                    }, {
                        id: 16,
                        name: "博州"
                    }],
                    id: 10113,
                    name: "新疆"
                }, {
                    child: [{
                        id: 1,
                        name: "拉萨"
                    }, {
                        id: 2,
                        name: "日喀则"
                    }, {
                        id: 3,
                        name: "山南"
                    }, {
                        id: 4,
                        name: "林芝"
                    }, {
                        id: 5,
                        name: "昌都"
                    }, {
                        id: 6,
                        name: "那曲"
                    }, {
                        id: 7,
                        name: "阿里"
                    }],
                    id: 10114,
                    name: "西藏"
                }, {
                    child: [{
                        id: 1,
                        name: "西宁"
                    }, {
                        id: 2,
                        name: "海东"
                    }, {
                        id: 3,
                        name: "黄南"
                    }, {
                        id: 4,
                        name: "海南"
                    }, {
                        id: 5,
                        name: "果洛"
                    }, {
                        id: 6,
                        name: "玉树"
                    }, {
                        id: 7,
                        name: "海西"
                    }, {
                        id: 8,
                        name: "海北"
                    }, {
                        id: 9,
                        name: "格尔木"
                    }],
                    id: 10115,
                    name: "青海"
                }, {
                    child: [{
                        id: 1,
                        name: "兰州"
                    }, {
                        id: 2,
                        name: "定西"
                    }, {
                        id: 3,
                        name: "平凉"
                    }, {
                        id: 4,
                        name: "庆阳"
                    }, {
                        id: 5,
                        name: "武威"
                    }, {
                        id: 6,
                        name: "金昌"
                    }, {
                        id: 7,
                        name: "张掖"
                    }, {
                        id: 8,
                        name: "酒泉"
                    }, {
                        id: 9,
                        name: "天水"
                    }, {
                        id: 10,
                        name: "陇南"
                    }, {
                        id: 11,
                        name: "临夏"
                    }, {
                        id: 12,
                        name: "甘南"
                    }, {
                        id: 13,
                        name: "白银"
                    }, {
                        id: 14,
                        name: "嘉峪关"
                    }],
                    id: 10116,
                    name: "甘肃"
                }, {
                    child: [{
                        id: 1,
                        name: "银川"
                    }, {
                        id: 2,
                        name: "石嘴山"
                    }, {
                        id: 3,
                        name: "吴忠"
                    }, {
                        id: 4,
                        name: "固原"
                    }, {
                        id: 5,
                        name: "中卫"
                    }],
                    id: 10117,
                    name: "宁夏"
                }, {
                    child: [{
                        id: 1,
                        name: "郑州"
                    }, {
                        id: 2,
                        name: "安阳"
                    }, {
                        id: 3,
                        name: "新乡"
                    }, {
                        id: 4,
                        name: "许昌"
                    }, {
                        id: 5,
                        name: "平顶山"
                    }, {
                        id: 6,
                        name: "信阳"
                    }, {
                        id: 7,
                        name: "南阳"
                    }, {
                        id: 8,
                        name: "开封"
                    }, {
                        id: 9,
                        name: "洛阳"
                    }, {
                        id: 10,
                        name: "商丘"
                    }, {
                        id: 11,
                        name: "焦作"
                    }, {
                        id: 12,
                        name: "鹤壁"
                    }, {
                        id: 13,
                        name: "濮阳"
                    }, {
                        id: 14,
                        name: "周口"
                    }, {
                        id: 15,
                        name: "漯河"
                    }, {
                        id: 16,
                        name: "驻马店"
                    }, {
                        id: 17,
                        name: "三门峡"
                    }, {
                        id: 18,
                        name: "济源"
                    }],
                    id: 10118,
                    name: "河南"
                }, {
                    child: [{
                        id: 1,
                        name: "南京"
                    }, {
                        id: 2,
                        name: "无锡"
                    }, {
                        id: 3,
                        name: "镇江"
                    }, {
                        id: 4,
                        name: "苏州"
                    }, {
                        id: 5,
                        name: "南通"
                    }, {
                        id: 6,
                        name: "扬州"
                    }, {
                        id: 7,
                        name: "盐城"
                    }, {
                        id: 8,
                        name: "徐州"
                    }, {
                        id: 9,
                        name: "淮安"
                    }, {
                        id: 10,
                        name: "连云港"
                    }, {
                        id: 11,
                        name: "常州"
                    }, {
                        id: 12,
                        name: "泰州"
                    }, {
                        id: 13,
                        name: "宿迁"
                    }],
                    id: 10119,
                    name: "江苏"
                }, {
                    child: [{
                        id: 1,
                        name: "武汉"
                    }, {
                        id: 2,
                        name: "襄阳"
                    }, {
                        id: 3,
                        name: "鄂州"
                    }, {
                        id: 4,
                        name: "孝感"
                    }, {
                        id: 5,
                        name: "黄冈"
                    }, {
                        id: 6,
                        name: "黄石"
                    }, {
                        id: 7,
                        name: "咸宁"
                    }, {
                        id: 8,
                        name: "荆州"
                    }, {
                        id: 9,
                        name: "宜昌"
                    }, {
                        id: 10,
                        name: "恩施"
                    }, {
                        id: 11,
                        name: "十堰"
                    }, {
                        id: 12,
                        name: "神农架"
                    }, {
                        id: 13,
                        name: "随州"
                    }, {
                        id: 14,
                        name: "荆门"
                    }, {
                        id: 15,
                        name: "天门"
                    }, {
                        id: 16,
                        name: "仙桃"
                    }, {
                        id: 17,
                        name: "潜江"
                    }],
                    id: 10120,
                    name: "湖北"
                }, {
                    child: [{
                        id: 1,
                        name: "杭州"
                    }, {
                        id: 2,
                        name: "湖州"
                    }, {
                        id: 3,
                        name: "嘉兴"
                    }, {
                        id: 4,
                        name: "宁波"
                    }, {
                        id: 5,
                        name: "绍兴"
                    }, {
                        id: 6,
                        name: "台州"
                    }, {
                        id: 7,
                        name: "温州"
                    }, {
                        id: 8,
                        name: "丽水"
                    }, {
                        id: 9,
                        name: "金华"
                    }, {
                        id: 10,
                        name: "衢州"
                    }, {
                        id: 11,
                        name: "舟山"
                    }],
                    id: 10121,
                    name: "浙江"
                }, {
                    child: [{
                        id: 1,
                        name: "合肥"
                    }, {
                        id: 2,
                        name: "蚌埠"
                    }, {
                        id: 3,
                        name: "芜湖"
                    }, {
                        id: 4,
                        name: "淮南"
                    }, {
                        id: 5,
                        name: "马鞍山"
                    }, {
                        id: 6,
                        name: "安庆"
                    }, {
                        id: 7,
                        name: "宿州"
                    }, {
                        id: 8,
                        name: "阜阳"
                    }, {
                        id: 9,
                        name: "亳州"
                    }, {
                        id: 10,
                        name: "黄山"
                    }, {
                        id: 11,
                        name: "滁州"
                    }, {
                        id: 12,
                        name: "淮北"
                    }, {
                        id: 13,
                        name: "铜陵"
                    }, {
                        id: 14,
                        name: "宣城"
                    }, {
                        id: 15,
                        name: "六安"
                    }, {
                        id: 16,
                        name: "巢湖"
                    }, {
                        id: 17,
                        name: "池州"
                    }],
                    id: 10122,
                    name: "安徽"
                }, {
                    child: [{
                        id: 1,
                        name: "福州"
                    }, {
                        id: 2,
                        name: "厦门"
                    }, {
                        id: 3,
                        name: "宁德"
                    }, {
                        id: 4,
                        name: "莆田"
                    }, {
                        id: 5,
                        name: "泉州"
                    }, {
                        id: 6,
                        name: "漳州"
                    }, {
                        id: 7,
                        name: "龙岩"
                    }, {
                        id: 8,
                        name: "三明"
                    }, {
                        id: 9,
                        name: "南平"
                    }],
                    id: 10123,
                    name: "福建"
                }, {
                    child: [{
                        id: 1,
                        name: "南昌"
                    }, {
                        id: 2,
                        name: "九江"
                    }, {
                        id: 3,
                        name: "上饶"
                    }, {
                        id: 4,
                        name: "抚州"
                    }, {
                        id: 5,
                        name: "宜春"
                    }, {
                        id: 6,
                        name: "吉安"
                    }, {
                        id: 7,
                        name: "赣州"
                    }, {
                        id: 8,
                        name: "景德镇"
                    }, {
                        id: 9,
                        name: "萍乡"
                    }, {
                        id: 10,
                        name: "新余"
                    }, {
                        id: 11,
                        name: "鹰潭"
                    }],
                    id: 10124,
                    name: "江西"
                }, {
                    child: [{
                        id: 1,
                        name: "长沙"
                    }, {
                        id: 2,
                        name: "湘潭"
                    }, {
                        id: 3,
                        name: "株洲"
                    }, {
                        id: 4,
                        name: "衡阳"
                    }, {
                        id: 5,
                        name: "郴州"
                    }, {
                        id: 6,
                        name: "常德"
                    }, {
                        id: 7,
                        name: "益阳"
                    }, {
                        id: 8,
                        name: "娄底"
                    }, {
                        id: 9,
                        name: "邵阳"
                    }, {
                        id: 10,
                        name: "岳阳"
                    }, {
                        id: 11,
                        name: "张家界"
                    }, {
                        id: 12,
                        name: "怀化"
                    }, {
                        id: 14,
                        name: "永州"
                    }, {
                        id: 15,
                        name: "湘西"
                    }],
                    id: 10125,
                    name: "湖南"
                }, {
                    child: [{
                        id: 1,
                        name: "贵阳"
                    }, {
                        id: 2,
                        name: "遵义"
                    }, {
                        id: 3,
                        name: "安顺"
                    }, {
                        id: 4,
                        name: "黔南"
                    }, {
                        id: 5,
                        name: "黔东南"
                    }, {
                        id: 6,
                        name: "铜仁"
                    }, {
                        id: 7,
                        name: "毕节"
                    }, {
                        id: 8,
                        name: "六盘水"
                    }, {
                        id: 9,
                        name: "黔西南"
                    }],
                    id: 10126,
                    name: "贵州"
                }, {
                    child: [{
                        id: 1,
                        name: "成都"
                    }, {
                        id: 2,
                        name: "攀枝花"
                    }, {
                        id: 3,
                        name: "自贡"
                    }, {
                        id: 4,
                        name: "绵阳"
                    }, {
                        id: 5,
                        name: "南充"
                    }, {
                        id: 6,
                        name: "达州"
                    }, {
                        id: 7,
                        name: "遂宁"
                    }, {
                        id: 8,
                        name: "广安"
                    }, {
                        id: 9,
                        name: "巴中"
                    }, {
                        id: 10,
                        name: "泸州"
                    }, {
                        id: 11,
                        name: "宜宾"
                    }, {
                        id: 12,
                        name: "内江"
                    }, {
                        id: 13,
                        name: "资阳"
                    }, {
                        id: 14,
                        name: "乐山"
                    }, {
                        id: 15,
                        name: "眉山"
                    }, {
                        id: 16,
                        name: "凉山"
                    }, {
                        id: 17,
                        name: "雅安"
                    }, {
                        id: 18,
                        name: "甘孜"
                    }, {
                        id: 19,
                        name: "阿坝"
                    }, {
                        id: 20,
                        name: "德阳"
                    }, {
                        id: 21,
                        name: "广元"
                    }],
                    id: 10127,
                    name: "四川"
                }, {
                    child: [{
                        id: 1,
                        name: "广州"
                    }, {
                        id: 2,
                        name: "韶关"
                    }, {
                        id: 3,
                        name: "惠州"
                    }, {
                        id: 4,
                        name: "梅州"
                    }, {
                        id: 5,
                        name: "汕头"
                    }, {
                        id: 6,
                        name: "深圳"
                    }, {
                        id: 7,
                        name: "珠海"
                    }, {
                        id: 8,
                        name: "佛山"
                    }, {
                        id: 9,
                        name: "肇庆"
                    }, {
                        id: 10,
                        name: "湛江"
                    }, {
                        id: 11,
                        name: "江门"
                    }, {
                        id: 12,
                        name: "河源"
                    }, {
                        id: 13,
                        name: "清远"
                    }, {
                        id: 14,
                        name: "云浮"
                    }, {
                        id: 15,
                        name: "潮州"
                    }, {
                        id: 16,
                        name: "东莞"
                    }, {
                        id: 17,
                        name: "中山"
                    }, {
                        id: 18,
                        name: "阳江"
                    }, {
                        id: 19,
                        name: "揭阳"
                    }, {
                        id: 20,
                        name: "茂名"
                    }, {
                        id: 21,
                        name: "汕尾"
                    }],
                    id: 10128,
                    name: "广东"
                }, {
                    child: [{
                        id: 1,
                        name: "昆明"
                    }, {
                        id: 2,
                        name: "大理"
                    }, {
                        id: 3,
                        name: "红河"
                    }, {
                        id: 4,
                        name: "曲靖"
                    }, {
                        id: 5,
                        name: "保山"
                    }, {
                        id: 6,
                        name: "文山"
                    }, {
                        id: 7,
                        name: "玉溪"
                    }, {
                        id: 8,
                        name: "楚雄"
                    }, {
                        id: 9,
                        name: "普洱"
                    }, {
                        id: 10,
                        name: "昭通"
                    }, {
                        id: 11,
                        name: "临沧"
                    }, {
                        id: 12,
                        name: "怒江"
                    }, {
                        id: 13,
                        name: "迪庆"
                    }, {
                        id: 14,
                        name: "丽江"
                    }, {
                        id: 15,
                        name: "德宏"
                    }, {
                        id: 16,
                        name: "西双版纳"
                    }],
                    id: 10129,
                    name: "云南"
                }, {
                    child: [{
                        id: 1,
                        name: "南宁"
                    }, {
                        id: 2,
                        name: "崇左"
                    }, {
                        id: 3,
                        name: "柳州"
                    }, {
                        id: 4,
                        name: "来宾"
                    }, {
                        id: 5,
                        name: "桂林"
                    }, {
                        id: 6,
                        name: "梧州"
                    }, {
                        id: 7,
                        name: "贺州"
                    }, {
                        id: 8,
                        name: "贵港"
                    }, {
                        id: 9,
                        name: "玉林"
                    }, {
                        id: 10,
                        name: "百色"
                    }, {
                        id: 11,
                        name: "钦州"
                    }, {
                        id: 12,
                        name: "河池"
                    }, {
                        id: 13,
                        name: "北海"
                    }, {
                        id: 14,
                        name: "防城港"
                    }],
                    id: 10130,
                    name: "广西"
                }, {
                    child: [{
                        id: 0,
                        name: "海口"
                    }, {
                        id: 1,
                        name: "白沙"
                    }, {
                        id: 2,
                        name: "保亭"
                    }, {
                        id: 3,
                        name: "昌江"
                    }, {
                        id: 4,
                        name: "澄迈"
                    }, {
                        id: 5,
                        name: "定安"
                    }, {
                        id: 6,
                        name: "东方"
                    }, {
                        id: 7,
                        name: "儋州"
                    }, {
                        id: 8,
                        name: "乐东"
                    }, {
                        id: 9,
                        name: "临高"
                    }, {
                        id: 10,
                        name: "临水"
                    }, {
                        id: 11,
                        name: "南沙岛"
                    }, {
                        id: 12,
                        name: "琼海"
                    }, {
                        id: 13,
                        name: "琼中"
                    }, {
                        id: 14,
                        name: "三亚"
                    }, {
                        id: 15,
                        name: "屯昌"
                    }, {
                        id: 16,
                        name: "万宁"
                    }, {
                        id: 17,
                        name: "文昌"
                    }, {
                        id: 18,
                        name: "五指山"
                    }, {
                        id: 19,
                        name: "西沙"
                    }],
                    id: 10131,
                    name: "海南"
                }, {
                    child: [{
                        id: 1,
                        name: "香港"
                    }],
                    id: 10132,
                    name: "香港"
                }, {
                    child: [{
                        id: 1,
                        name: "澳门"
                    }],
                    id: 10133,
                    name: "澳门"
                }, {
                    child: [{
                        id: 1,
                        name: "台北"
                    }, {
                        id: 2,
                        name: "高雄"
                    }, {
                        id: 4,
                        name: "台中"
                    }],
                    id: 10134,
                    name: "台湾"
                }, {
                    child: [{
                        id: 1,
                        name: "国外"
                    }],
                    id: 10135,
                    name: "国外"
                }]
            },
        dialogAlert: function (e) {
                var n, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 2,
                    t = null;
                1 == i ? n = $(".dialog .dialog-common-warn-tips") : 2 == i && (n = $(".dialog-common-warn-tips")), e && t && clearTimeout(t), n.text(e), t = setTimeout(function () {
                    n.text("")
                }, 3e3)
            },
            subjects: {
                1: {
                    id: 1,
                    is_prefix: !1,
                    name: "news",
                    name_cn: "42区",
                    name_en: "news",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/news"
                },
                2: {
                    id: 2,
                    is_prefix: !0,
                    name: "scoff",
                    name_cn: "段子",
                    name_en: "scoff",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/scoff"
                },
                4: {
                    id: 4,
                    is_prefix: !1,
                    name: "pic",
                    name_cn: "图片",
                    name_en: "pic",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !1,
                    uri: "r/pic"
                },
                100: {
                    id: 100,
                    is_prefix: !1,
                    name: "tec",
                    name_cn: "挨踢1024",
                    name_en: "tec",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/tec"
                },
                151: {
                    id: 151,
                    is_prefix: !1,
                    name: "ask",
                    name_cn: "你问我答",
                    name_en: "ask",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/ask"
                },
                177: {
                    id: 177,
                    is_prefix: !1,
                    name: "video",
                    name_cn: "视频",
                    name_en: "video",
                    supportImage: !1,
                    supportLink: !1,
                    supportWord: !1,
                    uri: "r/video"
                }
            },
            searchSubjects: {
                1: {
                    id: 1,
                    is_prefix: !1,
                    name: "news",
                    name_cn: "42区",
                    name_en: "news",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/news"
                },
                2: {
                    id: 2,
                    is_prefix: !0,
                    name: "scoff",
                    name_cn: "段子",
                    name_en: "scoff",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/scoff"
                },
                4: {
                    id: 4,
                    is_prefix: !1,
                    name: "pic",
                    name_cn: "图片",
                    name_en: "pic",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !1,
                    uri: "r/pic"
                },
                100: {
                    id: 100,
                    is_prefix: !1,
                    name: "tec",
                    name_cn: "挨踢1024",
                    name_en: "tec",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/tec"
                },
                151: {
                    id: 151,
                    is_prefix: !1,
                    name: "ask",
                    name_cn: "你问我答",
                    name_en: "ask",
                    supportImage: !0,
                    supportLink: !0,
                    supportWord: !0,
                    uri: "r/ask"
                }
            },
            emailMap: {
                "qq.com": "http://mail.qq.com",
                "gmail.com": "http://mail.google.com",
                "sina.com": "http://mail.sina.com.cn",
                "sina.cn": "http://mail.sina.com.cn",
                "163.com": "http://mail.163.com",
                "126.com": "http://mail.126.com",
                "yeah.net": "http://www.yeah.net/",
                "sohu.com": "http://mail.sohu.com/",
                "tom.com": "http://mail.tom.com/",
                "sogou.com": "http://mail.sogou.com/",
                "139.com": "http://mail.10086.cn/",
                "hotmail.com": "http://www.hotmail.com",
                "live.com": "http://login.live.com/",
                "live.cn": "http://login.live.cn/",
                "live.com.cn": "http://login.live.com.cn",
                "189.com": "http://webmail16.189.cn/webmail/",
                "yahoo.com.cn": "http://mail.cn.yahoo.com/",
                "yahoo.cn": "http://mail.cn.yahoo.com/",
                "eyou.com": "http://www.eyou.com/",
                "21cn.com": "http://mail.21cn.com/",
                "188.com": "http://www.188.com/",
                "foxmail.com": "http://www.foxmail.com",
                "outlook.com": "http://www.outlook.com",
                "gozap.com": "https://mail.gozap.com/"
            },
            imgOldMap: {
                "http://img3.chouti.com/default_avatar_img.png": "/statics/images/image48-9d05fa83eb.png"
            }
    }
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    Handlebars.registerHelper("getImgUrl", function (e) {
        var n = ~e.indexOf("?imageView") ? e : e + "?imageView2/1/w/80/h/80/interlace/1";
        return window.CT.replaceHttps(n)
    }), Handlebars.registerHelper("topThree", function (e) {
        if (e < 3) return "top-three"
    }), Handlebars.registerHelper("ifNoMathing", function (e) {
        if (!e) return "no-matching"
    }), Handlebars.registerHelper("topThreeIcon", function (e) {
        return 0 === e ? new Handlebars.SafeString('<img class="circle" src="/statics/images/first-703e2c9dea.png" />') : 1 === e ? new Handlebars.SafeString('<img class="circle" src="/statics/images/second-d1402e37e7.png" />') : 2 === e ? new Handlebars.SafeString('<img class="circle" src="/statics/images/three-6396d64c8d.png" />') : void 0
    }), Handlebars.registerHelper("topIcon", function (e) {
        if (2 < e) return new Handlebars.SafeString('<div class="top-shadow"><span class="top-shadow-text">' + (e + 1) + "</span></div>")
    }), Handlebars.registerHelper("getTitle", function (e) {
        return 60 < e.length ? e.slice(0, 60) + "..." : e
    });
    Handlebars.registerHelper("getInfo", function (e) {
        var n = "";
        return e.sign ? n = e.sign : e.cityName || e.proveName ? n = e.proveName + e.cityName : e.choutiLife && (n = e.choutiLife), new Handlebars.SafeString(n)
    });
    var e = {
        extraLinkTmpl: '\n        {{#each list}}\n            <a class="top-ten link-statistics {{ifNoMathing imgUrl}} {{topThree @index}} clearfix" data-id="{{id}}" href="/link/{{id}}" target="_blank">\n                <div class="top-ten-matching-con left">\n                    {{#topThreeIcon @index}}{{/topThreeIcon}}\n                    {{#topIcon @index}}{{/topIcon}}\n                    {{#if imgUrl}} \n                        <img class="top-ten-matching-icon"\n                        src="{{getImgUrl imgUrl}}" />\n                    {{/if}}\n                    \n                </div>\n                <div class="top-ten-title left"  title="{{title}}">{{getTitle title}}</div>\n            </a>\n        {{/each}}\n    ',
        extraTopicTmpl: '\n        {{#each list}}\n            <div class="person-item clearfix  {{#unless @index}}person-item-first{{/unless}}" data-open="/topic/{{id}}">\n                <img class="person-avatar-icon left"\n                    src="{{replaceHttps imgUrl}}" />\n                <div class="topic-con left">\n                    <div class="topic-title" title="{{name}}">{{getTopicName name}}</div>\n                    <div class="topic-des">{{getThousand shareCount}}条分享</div>\n                </div>\n                {{#unless attention}}    \n                    <a class="topic-btn unattention" style="display:block;" data-topic-id="{{id}}">\n                        <img class="add-icon" src="/statics/images/add-11e64991a2.png"   />关注\n                    </a>\n                    <a class="topic-btn concerned" style="display:none;" data-topic-id="{{id}}" >\n                        <img class="right-icon" src="/statics/images/mark-91282b656d.png" />\n                        <span class="concerned-text">已关注</span>\n                        <img class="cancel-icon" src="/statics/images/cross-958ac07f5b.png" />\n                        <span class="cancel-text">取消关注</span>\n                    </a>\n                {{/unless}}\n                {{#if attention}}\n                    <a class="topic-btn unattention" data-topic-id="{{id}}"  style="display:none;">\n                        <img class="add-icon" src="/statics/images/add-11e64991a2.png" />关注\n                    </a>\n                    <a class="topic-btn concerned" style="display:block;" data-topic-id="{{id}}" >\n                        <img class="right-icon" src="/statics/images/mark-91282b656d.png" />\n                        <span class="concerned-text">已关注</span>\n                        <img class="cancel-icon" src="/statics/images/cross-958ac07f5b.png" />\n                        <span class="cancel-text">取消关注</span>\n                    </a>\n                {{/if}}\n                \n            </div>\n        {{/each}}\n    ',
        AttentionRecommendTmpl: '\n        {{#each list}}\n            <div class="user-items clearfix" >\n                <img class="left user-pic" src="{{replaceHttps imgUrl}}" data-jump="/publish/links/{{jid}}"/>\n                <div class="left user-info">\n                    <div class="name" data-jump="/publish/links/{{jid}}">{{{nick}}}</div>\n                    <div class="coments-items">{{getInfo this}}</div>\n                </div>\n                {{userAttention attentState jid}}\n            </div>  \n        {{/each}}\n    ',
        extraAdTmpl: '\n        {{#each list}}\n            <a class="ad-link {{#if @index}}hide-ad{{/if}}" id="ad_link_{{@index}}" data-idx="{{@index}}" href="{{adUrl}}" target="_blank;">\n                <img class="ad-image" src="{{replaceHttps imgUrl}}" />\n            </a>\n            \n        {{/each}}\n    ',
        extraDynamicTmpl: '\n        {{#if list.length}}\n            {{#each list}}\n                <div class="dynamic-item clearfix {{#unless @index}}dynamic-item-first{{/unless}}">\n                    {{#if isLink}}\n                        <a href="/publish/links/{{link.jid}}" target="_blank" class="dynamic-avatar-icon left"><img src="{{replaceHttps link.submittedUser.imgUrl}}" /></a>\n                    {{/if}}\n                    {{#if isComment}}\n                        <a href="/publish/links/{{comment.jid}}" target="_blank" class="dynamic-avatar-icon left"><img src="{{replaceHttps comment.user.imgUrl}}" /></a>\n                    {{/if}}\n                    \n                    <div class="dynamic-detail-con left">\n                        <div class="dynamic-author-con">\n                            {{#if isLink}}\n                                <a href="/publish/links/{{link.jid}}" target="_blank" class="dynamic-author-name">{{link.submittedUser.nick}}</a>\n                                <span class="dynamic-time">{{timeago link.createTime}}发布</span>\n                            {{/if}}\n                            {{#if isComment}}\n                                <a href="/publish/links/{{comment.jid}}" target="_blank" class="dynamic-author-name">{{comment.user.nick}}</a>\n                                <span class="dynamic-time comment-time" data-time="{{comment.createTime}}">{{timeagoComment comment.createTime}}评论</span>\n                            {{/if}}\n                        </div>\n                        <div class="dynamic-content-con">\n                            {{#if isLink}}\n                                <div class="dynamic-title link-statistics" data-open="/link/{{link.id}}" data-id="{{link.id}}">{{link.title}}</div>    \n                            {{/if}}\n                                               \n                            {{#if isComment}}\n                                <span data-open="/link/{{comment.link.id}}?commentId={{comment.id}}">\n                                    {{#if comment.isDissentTag}}\n                                        <span class="dynamic-dissentTag">{{comment.dissentTag}}</span>\n                                    {{/if}} \n                                    {{#if comment.content}}\n                                        <span class="dynamic-title">{{{comment.content}}}</span>\n                                    {{/if}} \n                                    {{#if comment.pictureUrl}}\n                                        <span class="img-comment" data-pic="{{comment.pictureUrl}}">\n                                            <img class="comment-img-icon" src="/statics/images/comment-img-ae5f5ee7b0.png" alt=""/>\n                                            <span class="comment-text">图片评论</span>\n                                            <span class="comment-picture hover-pic">\n                                                <span class="comment-picture-outer">\n                                                    <img class="down-angle-icon" src="/statics/images/down-angle2-8231dd51f8.png" />\n                                                    <img onerror="javascript:this.src=\'/statics/images/error_icon-a76486aa5a.png\';this.onerror=null;" src="{{replaceHttps comment.pictureUrl}}?imageView2/1/w/240/h/240/interlace/1" class="comment-hover-picture">\n                                                </span>\n                                            </span>\n                                        </span>\n                                    {{/if}}\n                                </span>                                \n                            {{/if}}\n                        </div>\n                        {{#if isComment}}\n                            <span class="dynamic-origin-link">\n                                {{#if comment.isParent}}\n                                    原文：{{comment.linkTitle}}\n                                {{else}}\n                                    评论：{{{comment.parent.content}}}\n                                    {{#if comment.parent.pictureUrl}}[图片]{{/if}}\n                                {{/if}}\n                            </span>\n                        {{/if}}\n                        <div class="dynamic-operate-con clearfix">\n                            {{#if isLink}}\n                                <div class="dynamic-operate-link right">\n                                    <a class="operate-item disabled recommend left clearfix {{#if link.hasUped}}active{{/if}}" href="/link/{{link.id}}" target="_blank">\n                                        <span class="recommend-icon left"></span>\n                                        <span class="recommend-num left">{{getThousand link.ups}}</span>\n                                    </a>\n                                    <a class="operate-item comment left clearfix {{#if link.commentHavePicture}} have-pic{{/if}}" href="/link/{{link.id}}?mark=true" target="_blank">\n                                        <span class="comment-icon left"></span>\n                                        {{#if link.commentsCount}}\n                                            <span class="comment-num left">{{getThousand link.commentsCount}}</span>\n                                        {{/if}}\n                                    </a>\n                                    <a class="operate-item disabled save left {{#if link.hasSaved}}active{{/if}}" href="/link/{{link.id}}" target="_blank">\n                                        <span class="save-icon"></span>\n                                    </a>\n                                </div>\n                            {{/if}}\n                            {{#if isComment}}\n                                <div class="dynamic-operate-comment">\n                                    <div class="reply-con right clearfix" id="replyCon" data-vote={{isVote}} data-id={{id}} data-self-status={{selfStatus}}>\n                                       {{#unless comment.isSeven}} \n                                            <a class="reply-item reply right" href="/link/{{comment.link.id}}?commentId={{comment.id}}" target="_blank">\n                                                回复\n                                            </a>\n                                        {{/unless}}\n                                        <a class="reply-item hate right {{downClass}}" href="/link/{{comment.link.id}}" target="_blank">\n                                            <span class="hate-icon"></span>\n                                            <span class="hate-num">{{getThousand comment.downs}}</span>\n                                        </a>\n\n                                        <a class="reply-item like {{upClass}} right" href="/link/{{comment.link.id}}" target="_blank">\n                                            <span class="like-icon"></span>\n                                            <span class="like-num">{{getThousand comment.ups}}</span>\n                                        </a>\n                                    </div>\n                                </div>\n                            {{/if}}\n                            \n                        </div>\n\n                    </div>\n                </div>\n            {{/each}}\n        {{/if}}\n        {{#unless list.length}}\n            <div class="no-data-tips">你关注的抽友最近比较安静，还没有新动态~</div>\n        {{/unless}}\n    '
    };
    _.extend(window.CT, e)
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        LinkTmpl: '\n    {{#each links}}\n        <div class="link-item clearfix link-item-{{id}} {{#if isBigMatching}} link-large-item {{/if}}  {{#if isWholeLine}}link-multi-item{{/if}} " \n            data-id="{{id}}"\n            data-has-saved="{{hasSaved}}"\n            data-has-uped="{{hasUped}}"\n            data-time-into-pool="{{timeIntoPool}}"\n            data-action-time="{{actionTime}}"\n            data-score="{{score}}">\n            {{#if showLinkBore}}\n                <a class="link-bore clearfix" href="javascript:;">\n                    <div class="left link-bore-hover">不感兴趣</div>\n                    <img class="right link-bore-close" src="/statics/images/close-gray-c7f3d10860.png"/>\n                </a>\n            {{/if}}\n            <div class="link-area clearfix">\n                {{#if hasMatchingOrBig}}\n                    <a class="common-matching-con left" href="javascript:;" data-matching="{{getLinkUrl this}}" target="_blank" data-pic="{{originalImgUrl}}">\n                        <img class="matching {{isImageScale imgUrl}}" src="{{replaceHttps imgUrl}}" />\n                        {{#if isMultiImgThree}}\n                            <span class="img-count">{{#if multigraphListLen}}<span>{{multigraphListLen}}</span>{{/if}}图</span>\n                        {{/if}}\n                    </a>\n                {{/if}}\n                <div class="link-info-con left">\n                    <div class="link-detail">\n                        <div class="link-mark clearfix">\n                            {{#if isBreak}}\n                                <img class="link-mark-icon left" src="/statics/images/mark/isbreak-d7033462f6.png" alt="突发"/>\n                            {{/if}}\n                            {{#if isTop}}\n                                <img class="link-mark-icon left" src="/statics/images/mark/istop-ff1d5d9352.png" alt="置顶"/>\n                            {{/if}}                   \n                            {{#if hasTopic}}\n                                <a class="topic-con left clearfix" href="/topic/{{topicId}}" target="_blank">\n                                    <img class="topic-icon left" src="/statics/images/mark/topic_icon-d15bdf1385.png" alt="">\n                                    <span class="left">{{getTopicName topicName}}</span>                            \n                                </a>\n                            {{/if}}\n                        </div>\n                        <a class="link-title link-statistics" data-id="{{id}}" href="{{getLinkUrl this}}" target="_blank">\n                            {{{title}}}\n                        </a>\n                        \n                        {{#if isMultiImg}}\n                            {{#unless isBigMatching}}\n                                <div class="images-con"  data-previews="{{multigraphList}}">\n                                    <div class="images-container" data-total="{{multigraphListLen}}" data-current="0" style="width: {{multiWidth}}px;">\n                                        {{#each multigraphCutList}}<img  src="{{replaceHttps this}}" alt="" class="image-item" data-current="{{@index}}">{{/each}}    \n                                    </div>\n                                                                            \n                                    <img class="turning-icon prev-icon" src="/statics/images/prev-937c1d0555.png" alt="">\n                                    {{#if isShowNext}} \n                                        <img class="turning-icon next-icon" src="/statics/images/next-f58064c8ad.png" alt="">\n                                        <span class="img-count"><span>{{multigraphListLen}}</span>图</span>\n                                    {{/if}}\n                                    \n                                </div>\n                            {{/unless}}\n                        {{/if}}\n                        {{#if hasDomain}}\n                            <div class="link-from">\n                                {{dealDomain domain}}\n                            </div>\n                        {{/if}}\n                        {{#if hasContent}}\n                            <div class="link-des">\n                                {{{content}}}\n                            </div>\n                        {{/if}}\n                    </div>\n\n                    <div class="operate-author-con clearfix">\n                        <div class="author-con left clearfix">\n                            <span class="left author-avatar-name clearfix" data-id="{{id}}" data-jid="{{submittedUser.jid}}" data-jump="/publish/links/{{submittedUser.jid}}">\n                                <img class="left author-avatar" src="{{replaceHttps submittedUser.imgUrl}}" alt="" data-jump="/publish/links/{{submittedUser.jid}}">\n                                <span class="left author-name" data-jump="/publish/links/{{submittedUser.jid}}">{{submittedUser.nick}}</span>\n                                \n                            </span>\n                            {{#if ../isHot}}\n                                <span class="left time-enter timeago"><span data-time="{{timeIntoPool}}" class="time-update">{{timeago timeIntoPool}}</span>入榜</span>\n                            {{/if}}\n                            {{#unless ../isHot}}\n                                <span class="left time-enter timeago"><span data-time="{{createTime}}"  class="time-update">{{timeago createTime}}</span>发布</span>\n                            {{/unless}}\n                            {{#if hasSubject}}\n                                <span class="left separate-line"></span>\n                                <a class="left category-icon {{getSubject subjectId}}-icon" href="{{getSubjectUrl subjectId}}" target="_blank">\n                                    <span class="category-icon-name">{{getSubjectName subjectId}}</span>\n                                </a>\n                            {{/if}}\n                        </div>\n                        <div class="operate-con right clearfix">\n                            <a class="operate-item recommend left clearfix {{getOperateClassName hasUped}}" href="javascript:;">\n                                <span class="recommend-icon left">\n                                    <span class="recommend-icon-img"></span>\n                                    <span class="recommend-icon-img-animate"></span>\n                                </span>\n                                <span class="recommend-num left">{{getThousand ups}}</span>\n                            </a>\n                            <a class="operate-item comment link-comment left clearfix" \n                                data-id="{{id}}"\n                                data-no-comments="{{noComments}}"\n                                data-comment-have-comments="{{commentHavePicture}}"\n                                data-link-expire="{{linkExpire}}"\n                                data-submit-jid="{{submittedUser.jid}}"\n                                href="javascript:;">\n                                <span class="comment-icon {{#if commentHavePicture}} have-pic{{/if}} left"></span>\n                                {{#if hasComments}}\n                                    <span class="comment-num left">{{getThousand commentsCount}}</span>\n                                {{/if}}\n                            </a>\n                            <a class="operate-item save left {{getOperateClassName hasSaved}}"  href="javascript:;">\n                                <span class="save-icon">\n                                    <span class="save-icon-img"></span>\n                                    <span class="save-icon-img-animate"></span>\n                                </span>\n                            </a>\n\n                            <a class="operate-item share left" href="javascript:;" \n                                data-title="{{parseTitle}}" \n                                data-content="{{content}}"                            \n                                data-pic="{{originalImgUrl}}"\n                                data-subject="{{subject}}"\n                                data-id="{{id}}"\n                                data-url="/share/link?link_id={{id}}">\n                                <span class="share-icon"></span>\n                                <span class="share-hover-con">\n                                    <span class="share-hover-con-bg">\n                                        <span class="share-inner-icon weixin-icon">\n                                            <span class="qrcode-con">\n                                                <img class="right-angle-icon" src="/statics/images/right-angle-dbcda87c97.png" />\n                                                <span class="qrcode-img"></span>\n                                            </span>\n                                        </span>    \n                                        <span class="share-inner-icon weibo-icon"></span>\n                                        <span class="share-inner-icon dou-icon"></span>\n                                        <span class="share-inner-icon qq-icon"></span>    \n                                        <span class="share-inner-icon link-icon"></span>\n                                    </span>\n                                </span>\n                            </a>\n\n\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="comment-area">\n\n            </div>\n        </div>\n        {{/each}}\n    '
    };
    _.extend(window.CT, e)
}(jQuery),
function (p) {
    function s(i, e, t) {
        if (_.isArray(e)) p.each(e, function (e, n) {
            s(i + "[" + e + "]", n, t)
        });
        else if (null != e && "object" === _typeof(e))
            for (var n in e) s(i + "." + n, e[n], t);
        else t(i, e)
    }

    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        showMask: function (e) {
            0 === p("#mask").length && p("body").append("<div id='mask' class='mask'></div>"), p("#mask").css({
                width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
            }).show()
        },
        resetMask: function () {
            p("#mask").css({
                width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
            }).show()
        },
        hideMask: function () {
            p("#mask").fadeOut(300);
            var e = setTimeout(function () {
                p("#mask").hide(), clearTimeout(e)
            }, 300)
        },
        hideMaskNow: function () {
            p("#mask").hide()
        },
        hideDialog: function () {
            p(".dialog").hide()
        },
        setPosition: function (e, n) {
            var i, t, a = {
                    target: null,
                    offset: {
                        left: 0,
                        top: 0
                    },
                    container: p(document.body),
                    position: "bottom"
                },
                s = p.extend({}, a, n);
            if (null !== s.target) {
                var o = s.target.offset(),
                    l = s.position;
                t = "left" === l ? (i = o.left - e.width(), o.top) : "right" === l ? (i = o.left + s.target.outerWidth(), o.top) : "top" === l ? (i = o.left, o.top - e.height()) : (i = o.left, o.top + s.target.outerHeight()), i += s.offset.left, t += s.offset.top
            } else {
                var r = document.documentElement.clientWidth,
                    c = document.documentElement.clientHeight,
                    d = e.width(),
                    m = e.height();
                i = Math.max(0, (r - d) / 2) + document.documentElement.scrollLeft + document.body.scrollLeft, t = Math.max(0, (c - m) / 2) + document.documentElement.scrollTop + document.body.scrollTop
            }
            e.css({
                zIndex: "101"
            }), e.offset({
                left: i,
                top: t
            })
        },
        bodyClick: function (e, n) {
            _.each(e, function (e) {
                e.click(function (e) {
                    e.stopPropagation()
                })
            }), p("html").click(function (e) {
                n.apply(null, arguments)
            })
        },
        getRandomId: function (e) {
            for (var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], i = "", t = 0; t < e; t++) i += n[Math.floor(35 * Math.random())];
            return i
        },
        isToJson: function (e) {
            return _.isObject(e) ? e : JSON.parse(e)
        },
        setRemainTime: function (a, e) {
            var s = Number(e),
                o = setInterval(function () {
                    if (0 < s) {
                        s -= 1;
                        var e = Math.floor(s % 60),
                            n = Math.floor(s / 60 % 60),
                            i = Math.floor(s / 3600 % 24),
                            t = Math.floor(s / 3600 / 24) + "天" + i + "小时" + n + "分" + e + "秒";
                        a.html(t)
                    } else clearInterval(o)
                }, 1e3)
        },
        getParam: function (e) {
            var n = location.search,
                i = new RegExp("[?&]" + e + "=([^&]+)", "g").exec(n),
                t = null;
            if (null != i) try {
                t = decodeURIComponent(decodeURIComponent(i[1]))
            } catch (e) {
                try {
                    t = decodeURIComponent(i[1])
                } catch (e) {
                    t = i[1]
                }
            }
            return t
        }
    };
    _.extend(window.CT, e, {
        param: function (e, i) {
            var t = {};
            return i && !_.isArray(e) ? p.each(e, function (e, n) {
                    t[e = i + "." + e] = n
                }) : t = e,
                function (e, t) {
                    var i = [],
                        a = function (e, n) {
                            n = p.isFunction(n) ? n() : n, i.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                        };
                    if (_.isArray(e)) p.each(e, function (e, n) {
                        var i = t ? t + "." + n.name : n.name;
                        a(i, n.value)
                    });
                    else
                        for (var n in e) s(n, e[n], a);
                    return i.join("&")
                }(t, i)
        }
    })
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        regPassword: /^([a-zA-Z0-9]|[`~!@#$%^&*\(\)+=|{}':;',\\\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]){6,16}$/,
        regMobile: /^1\d{10}$/,
        regNick: /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,10}$/,
        regEmail: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    };
    window.CT.regex = {
        regPassword: e.regPassword,
        regMobile: e.regMobile,
        regEmail: e.regEmail,
        regNick: e.regNick
    }
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        aEacape2Html: function (e) {
            var n = new RegExp(/(&lt;a.*?&lt;\/a&gt;)/),
                i = {
                    "&lt;a": "<a",
                    "target&#x3D;": "target=",
                    "&#x27;_blank&#x27;": '"_blank"',
                    "href&#x3D;": "href=",
                    "&#x27;": '"',
                    "&gt;": ">",
                    "&lt;/a&gt;": "</a>"
                },
                t = "(" + Object.keys(i).join("|") + ")",
                a = new RegExp(t, "g");
            return e.replace(n, function (e) {
                return e.replace(a, function (e) {
                    return i[e]
                })
            })
        },
        html2Escape: function (e) {
            return e.replace(/[<>&"]/g, function (e) {
                return {
                    "<": "&lt;",
                    ">": "&gt;",
                    "&": "&amp;",
                    '"': "&quot;"
                } [e]
            })
        },
        escape2Html: function (e) {},
        addZero: function (e) {
            var n = parseInt(e);
            if (n != n) throw new Error("addZero转换请输入数字");
            return -1 < n && n < 10 ? "0" + n : n
        },
        getDateObj: function (e) {
            var n = e.getFullYear(),
                i = e.getMonth() + 1,
                t = e.getDate(),
                a = e.getHours(),
                s = e.getMinutes(),
                o = e.getSeconds();
            return {
                year: n,
                month: window.CT.addZero(i),
                day: window.CT.addZero(t),
                hour: window.CT.addZero(a),
                min: window.CT.addZero(s),
                second: window.CT.addZero(o)
            }
        },
        getFormDateToDay: function (e) {
            var n = window.CT.getStandardTime(e),
                i = window.CT.getDateObj(n);
            return i.year + "-" + i.month + "-" + i.day
        },
        getFormDateToMin: function (e) {
            var n = window.CT.getStandardTime(e),
                i = window.CT.getDateObj(n);
            return i.year + "-" + i.month + "-" + i.day + " " + i.hour + ":" + i.min
        },
        getFormDateAll: function (e) {
            var n = window.CT.getStandardTime(e),
                i = window.CT.getDateObj(n);
            return i.year + "-" + i.month + "-" + i.day + " " + i.hour + ":" + i.min + ":" + i.second
        },
        getStandardTime: function (e) {
            var n, i = /\d{13}/.exec(e);
            return n = i ? Number(i[0]) : 1e3 * e, new Date(n)
        },
        getInputLength: function (e) {
            for (var n = 0, i = 0; i < e.length; i++) {
                var t = e.charCodeAt(i);
                1 <= t && t <= 126 || 65376 <= t && t <= 65439 ? n++ : n += 2
            }
            return n
        },
        getInput: function (e, i) {
            var t = "",
                n = window.CT.getInputLength(e);
            return i < n ? function e(n) {
                return t += n.charAt(0), window.CT.getInputLength(t) <= i ? e(n.slice(1)) : t = t.slice(0, -1)
            }(e) : e
        },
        getDifferTime: function (e) {
            var n = window.CT.getStandardTime(e),
                i = window.CT.getDateObj(n),
                t = n.getTime(),
                a = (new Date).getTime() - t,
                s = "";
            return a < 6e4 ? s = "刚刚" : a < 36e5 ? s = Math.floor(a / 6e4) + "分钟前" : a < 864e5 ? s = Math.floor(a / 36e5) + "小时" + Math.ceil(a % 36e5 / 6e4) + "分钟前" : a < 2592e6 ? (s = Math.floor(a / 864e5) + "天", 0 !== Math.floor(a % 864e5 / 36e5) ? s += Math.ceil(a % 864e5 / 36e5) + "小时前" : s += "前") : a < 31104e6 ? (s = Math.floor(a / 2592e6) + "个月", 0 !== Math.floor(a % 2592e6 / 864e5) ? s += Math.ceil(a % 2592e6 / 864e5) + "天前" : s += "前") : s = i.year + "-" + i.month + "-" + i.day, s
        },
        getCommentDifferTime: function (e) {
            var n = window.CT.getStandardTime(e),
                i = window.CT.getDateObj(n),
                t = n.getTime(),
                a = (new Date).getTime() - t;
            return a < 6e4 ? "刚刚" : a < 36e5 ? Math.floor(a / 6e4) + "分钟前" : a < 864e5 ? Math.floor(a / 36e5) + "小时前" : a < 2592e6 ? Math.floor(a / 864e5) + "天前" : a < 31104e6 ? Math.floor(a / 2592e6) + "个月前" : i.year + "-" + i.month + "-" + i.day
        },
        getDiffAge: function (e, n) {
            var i = window.CT.getStandardTime(e),
                t = window.CT.getStandardTime(n).getTime() - i.getTime;
            if (!(p < 36e5)) return t < 2592e6 ? Math.floor(t / 36e5) + "天" : t < 31104e6 ? Math.floor(t / 2592e6) + "月" : Math.floor(t / 31104e6) + "年";
            str = "0天"
        },
        timeChange: function () {
            timePool = window.setInterval(function () {
                $(".link-item").each(function () {
                    var e = $(this).data("timeIntoPool"),
                        n = $(this).data("nowTotalTime");
                    if (null == n || null == n) {
                        if (!e) return !1;
                        var i = e.substring(e.indexOf(",") + 1);
                        i = parseFloat(i / 1e3) + 6e4 + 6e4, $(this).data("nowTotalTime", i + 6e4)
                    } else {
                        i = parseFloat($(this).data("nowTotalTime"));
                        $(this).data("nowTotalTime", i + 6e4)
                    }
                    oldTime = e.substring(0, e.indexOf(",")), oldTime = parseFloat(oldTime / 1e3) + 6e4;
                    var t = chouti.getDifferTime(i, oldTime);
                    $(this).children(".news-content").children(".part2").children(".time-into").children(".time-a").children("b").html(t)
                })
            }, 6e4)
        },
        getThousand: function (e) {
            if (!e || !_.isNumber(e)) return 0;
            if (0 <= e) {
                if (e < 1e3) return e;
                var n = Math.floor(e / 1e3),
                    i = Math.floor((e - 1e3 * n) / 100);
                return 0 < i ? n + "." + i + "k" : n + "k"
            }
        },
        getCookie: function (e) {
            for (var n = document.cookie.split("; "), i = "", t = 0; t < n.length; t++) {
                var a = n[t].split("=");
                if (e == a[0]) {
                    i = a[1];
                    break
                }
            }
            return i
        },
        getQueryString: function (e) {
            var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                i = window.location.search.substr(1).match(n);
            return null != i ? unescape(i[2]) : null
        },
        replaceHttps: function (e) {
            return Object.hasOwnProperty.call(window.CT.config.imgOldMap, e) ? window.CT.config.imgOldMap[e] : ~e.indexOf("https") ? e : ~e.indexOf("http") ? e.replace("http://", "//") : e
        },
        subPhone: function (e) {
            if (e) return e.toString().substring(0, e.length - 8) + "****" + e.toString().substring(e.length - 4)
        },
        subMail: function (e) {
            if (e) {
                var n = e.split("@");
                return n[0].substring(0, 2) + "****" + n[0].substring(n[0].length - 1) + "@" + n[1]
            }
        }
    };
    _.extend(window.CT, e)
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        doSaveComment: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/comments/self",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        doCancelSaveComment: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/comments/self/del",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        doComment: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/comments/create",
                type: "POST",
                customize: !0,
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        doUpload: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            $.ajax({
                url: "/upload",
                type: "POST",
                data: e,
                contentType: !1,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        }
    };
    _.extend(window.CT, e)
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        doLogout: function (e, n, i) {
            $.ajax({
                url: "/logout",
                type: "GET",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        }
    };
    _.extend(window.CT, e)
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        preDealLinks: function (e, n) {
            return _.each(e, function (e) {
                e.hasTopic = "topic" != n.page && (!!e.topicId && !!e.topicId), e.isBigMatching = 1 == e.showType, e.isWholeLine = 1 != e.showType && !e.imgUrl || 1 != e.showType && e.multigraphList && 3 < e.multigraphList.length, e.hasMatchingOrBig = 1 == e.showType || 1 != e.showType && e.multigraphList && e.multigraphList.length < 4 || 1 != e.showType && !e.multigraphList && !!e.imgUrl, e.isMultiImg = !!e.multigraphList && 3 < e.multigraphList.length, e.isMultiImgThree = 1 != e.showType && !!e.multigraphList && e.multigraphList.length <= 3 && 1 < e.multigraphList.length, e.multigraphListLen = e.multigraphList ? e.multigraphList.length : 0, e.multiWidth = e.multigraphList ? 206 * e.multigraphList.length : 824, e.isShowNext = !!e.multigraphList && 4 < e.multigraphList.length, "pic" != n.subject && "video" != n.subject || (e.imgUrl ? "pic" == n.subject ? (e.imgUrlHeight ? e.imgPicUrl = ~e.imgUrl.indexOf("?imageslim") ? e.imgUrl : e.imgUrl + "?imageslim" : e.imgPicUrl = e.imgUrl + "?imageView2/1/w/226/h/226/interlace/1", e.imgUrlWidthNew = 226, e.imgUrlHeightNew = e.imgUrlHeight ? 226 * e.imgUrlHeight / e.imgUrlWidth : 226) : 286 < e.videoWidth && 178 < e.videoHeight ? (e.imgPicUrl = ~e.imgUrl.indexOf("?imageView") ? e.videoImgUrl : e.videoImgUrl + "?imageView2/1/w/286/h/178/interlace/1", e.imgUrlWidthNew = 286, e.imgUrlHeightNew = 178) : (e.imgPicUrl = ~e.imgUrl.indexOf("?imageslim") ? e.videoImgUrl : e.videoImgUrl + "?imageslim", e.imgUrlWidthNew = 286 < e.videoWidth ? "100%" : e.videoWidth, e.imgUrlHeightNew = 178 < e.videoHeight ? "100%" : e.videoHeight) : (e.imgPicUrl = "pic" == n.subject ? "/statics/images/pic-null-6686bea387.png" : "/statics/images/error_icon2-5e05fe6953.png", e.imgUrlWidthNew = "pic" == n.subject ? 226 : 286, e.imgUrlHeightNew = "pic" == n.subject ? 148 : 178)), 1 == e.showType && e.bindImageInfo && (e.bindImageInfo.imgUrl = ~e.bindImageInfo.imgUrl.indexOf("?imageView") ? e.bindImageInfo.imgUrl : e.bindImageInfo.imgUrl + "?imageView2/1/w/360/h/220/interlace/1"), e.imgUrl && (e.imgUrl = ~e.imgUrl.indexOf("?imageView") ? e.imgUrl : e.imgUrl + "?imageView2/1/w/240/h/240/interlace/1"), e.imgUrl = 1 == e.showType && "pic" != n.subject && "video" != n.subject ? e.bindImageInfo.imgUrl : e.imgUrl, e.hasMatching = !!e.imgUrl, e.noMatching = !e.imgUrl, e.hasDomain = !!e.domain, e.hasContent = !!e.content, e.hasSubject = !!e.subjectId && Object.hasOwnProperty.call(window.CT.config.subjects, e.subjectId) && "zone" != n.page, e.hasComments = 0 < e.commentsCount, e.showLinkBore = "recommend" == n.page, e.url = e.url && !~e.url.indexOf("pic/show") ? e.url : "/link/" + e.id, e.parseTitle = $("<div>".concat(e.title, "</div>")).text()
            }), e
        },
        doLike: function (e, n, i) {
            $.ajax({
                url: "/link/vote",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        cancelLike: function (e, n, i) {
            $.ajax({
                url: "/link/cancel/vote",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        saveLink: function (e, n, i) {
            $.ajax({
                url: "/link/self",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        cancelSaveLink: function (e, n, i) {
            $.ajax({
                url: "/link/cancel/self",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        doCommentVote: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/comments/vote",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        doCancelCommentVote: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/comments/cancel/vote",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        boreLink: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            $.ajax({
                url: "/link/bore",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        dealRecommendLink: function (o, l) {
            var e = o.data("id"),
                r = o.data("hasUped"),
                c = o.find(".recommend");

            function n(n) {
                var i = "",
                    t = "",
                    a = "",
                    s = 0,
                    e = new Image;
                e.src = r ? (i = "active", t = "cancel", a = "normal", s = 400, "/statics/images/operate/recommend_cancel-610912df69.png") : (i = "normal", t = "do", a = "active", s = 1200, "/statics/images/operate/recommend_do-19354d62e4.png"), e.onload = function () {
                    c.removeClass(i).addClass(t);
                    var e = setTimeout(function () {
                        c.removeClass(t).addClass(a), clearTimeout(e), l && _.isFunction(l) && l.call()
                    }, s);
                    o.data("has-uped", !r), o.find(".recommend-num").text(window.CT.getThousand(n))
                }
            }

            function i() {
                l && _.isFunction(l) && l.call()
            }

            r ? this.cancelLike({
                linkId: e
            }, n, i) : this.doLike({
                linkId: e
            }, n, i)
        },
        dealSaveLink: function (a, s) {
            var e = a.data("id"),
                o = a.data("hasSaved"),
                l = a.find(".save");

            function n() {
                var n = "",
                    i = "",
                    t = "",
                    e = new Image;
                e.src = o ? (n = "active", i = "cancel", t = "normal", "/statics/images/operate/save_cancel-7709333ea7.png") : (n = "normal", i = "do", t = "active", "/statics/images/operate/save_do-7254ea5565.png"), e.onload = function () {
                    l.removeClass(n).addClass(i);
                    var e = setTimeout(function () {
                        l.removeClass(i).addClass(t), clearTimeout(e), s && _.isFunction(s) && s.call()
                    }, 800);
                    a.data("has-saved", !o)
                }
            }

            function i() {
                s && _.isFunction(s) && s.call()
            }

            o ? this.cancelSaveLink({
                linkId: e
            }, n, i) : this.saveLink({
                linkId: e
            }, n, i)
        },
        linkStatistics: function (e, n) {
            var i = {};
            n && (i.siteId = n), $.ajax({
                url: "/link/click/" + e,
                type: "GET",
                data: i,
                success: function (e) {},
                error: function (e) {}
            })
        }
    };
    _.extend(window.CT, e)
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {}, window.share = {};
    var e = {
        getShortUrl: function (e, n, i) {
            $.ajax({
                url: "/share/short/url",
                type: "POST",
                data: {
                    url: encodeURI(location.origin + e.url)
                },
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        shareToSina: function (e) {
            e.pic = e.pic ? e.pic : window.location.origin + "/statics/images/logo-c30a1a3941.png";
            var n = {
                    url: e.url,
                    appkey: "579273896",
                    title: e.title,
                    pic: e.pic,
                    ralateUid: "1821459487",
                    searchPic: "false"
                },
                i = [];
            for (var t in n) i.push(t + "=" + encodeURIComponent(n[t] || ""));
            var a = "http://service.weibo.com/share/share.php?" + i.join("&");
            window.open(a, "", "width=700, height=480, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no")
        },
        shareToDouban: function (e) {
            e.pic = e.pic ? e.pic : window.location.origin + "/statics/images/logo-c30a1a3941.png", e.title = e.title.slice(0, 140), e.content = e.content || e.title;
            var n = document,
                i = encodeURIComponent,
                t = window.getSelection,
                a = n.getSelection,
                s = n.selection,
                o = t ? t() : a ? a() : s ? s.createRange().text : "",
                l = "http://www.douban.com/recommend/?url=" + i(e.url) + "&title=" + i(e.title) + "&image=" + i(e.pic) + "&text=" + i(e.content) + "&sel=" + i(o) + "&v=1",
                r = function () {
                    window.open(l, "douban", "toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330") || (location.href = l + "&r=1")
                };
            /Firefox/.test(navigator.userAgent) ? setTimeout(r, 0) : r()
        },
        shareToQQzone: function (e) {
            e.pic = e.pic ? e.pic : window.location.origin + "/statics/images/logo-c30a1a3941.png";
            var n = {
                    url: e.url,
                    desc: "",
                    summary: e.content,
                    title: e.title,
                    site: "抽屉新热榜",
                    pics: e.pic
                },
                i = [];
            for (var t in n) i.push(t + "=" + encodeURIComponent(n[t] || ""));
            var a = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + i.join("&");
            window.open(a, "", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no")
        },
        shareLink: function () {
            new ClipboardJS(".link-icon", {
                text: function (e) {
                    var n = $(e).parents(".share").data("shortUrl");
                    return window.CT.showTopTips("success", "复制成功"), n
                }
            })
        },
        generateQrcode: function () {
            $(".share").hover(function () {
                var n = $(this),
                    i = n.find(".qrcode-img"),
                    t = n.find(".share-hover-con"),
                    a = n.data("id"),
                    e = (n.data("title"), n.data("url"));
                n.data("shortUrl");
                _.isEmpty(window.share) || _.isEmpty(window.share[a]) || _.isEmpty(window.share[a].shortUrl) ? (window.share ? window.share[a] ? window.share[a].isShowShare = !0 : window.share[a] = {
                    isShowShare: !0
                } : (window.share = {}, window.share[a] = {
                    isShowShare: !0
                }), window.CT.getShortUrl({
                    url: e
                }, function (e) {
                    window.share[a].shortUrl = e, n.data("shortUrl", e), i.html(""), i.qrcode({
                        width: 128,
                        height: 128,
                        text: e
                    }), window.share[a].isShowShare && t.show()
                })) : t.show()
            }, function () {
                var e = $(this),
                    n = e.find(".share-hover-con"),
                    i = e.data("id");
                window.share ? window.share[i] ? window.share[i].isShowShare = !1 : window.share[i] = {
                    isShowShare: !1
                } : (window.share = {}, window.share[i] = {
                    isShowShare: !1
                }), e.hasClass("original-share") || n.hide()
            })
        }
    };
    _.extend(window.CT, e)
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        doTopicAttention: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/topic/" + e.id + "/attention/add",
                type: "POST",
                data: {},
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        cancelTopicAttention: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/topic/" + e.id + "/attention/remove",
                type: "POST",
                data: {},
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        }
    };
    _.extend(window.CT, e)
}(jQuery),
function () {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var e = {
        doAttention: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/attention/add",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        },
        cancelAttention: function (e, n, i) {
            if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
            if (1 == window.loginedUser.complateReg) {
                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                    modify: !0
                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
            }
            $.ajax({
                url: "/attention/cancel",
                type: "POST",
                data: e,
                success: function (e) {
                    _.isFunction(n) && n(e)
                },
                error: function (e) {
                    _.isFunction(i) && i(e)
                }
            })
        }
    };
    _.extend(window.CT, e)
}(jQuery),
function (e, i) {
    i("body").on("click", ".checkbox-icon", function (e) {
        var n = i(this);
        n.hasClass("checked") ? n.removeClass("checked") : n.addClass("checked")
    })
}(window, jQuery),
function (p) {
    p(window).resize(function () {
        p("#mask").css({
            width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
        })
    }), window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var l = function () {
            0 === p("#mask").length && p("body").prepend("<div id='mask' class='mask'></div>"), p("#mask").show()
        },
        i = function (e, n) {
            var i, t, a = {
                    target: null,
                    offset: {
                        left: 0,
                        top: 0
                    },
                    container: p(document.body),
                    position: "bottom"
                },
                s = p.extend({}, a, n);
            if (null !== s.target) {
                var o = s.target.offset(),
                    l = s.position;
                t = "left" === l ? (i = o.left - e.width(), o.top) : "right" === l ? (i = o.left + s.target.outerWidth(), o.top) : "top" === l ? (i = o.left, o.top - e.height()) : (i = o.left, o.top + s.target.outerHeight()), i += s.offset.left, t += s.offset.top
            } else {
                var r = document.documentElement.clientWidth,
                    c = document.documentElement.clientHeight,
                    d = e.width(),
                    m = e.height();
                i = Math.max(0, (r - d) / 2) + document.documentElement.scrollLeft + document.body.scrollLeft, t = Math.max(0, (c - m) / 2) + document.documentElement.scrollTop + document.body.scrollTop
            }
            e.css({
                zIndex: "101"
            }), e.offset({
                left: i,
                top: t
            })
        },
        n = function () {
            p("#mask").hide()
        },
        t = {
            id: "labi-dialog",
            title: "",
            closeText: "关闭",
            content: "",
            height: "auto",
            width: 300,
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            position: "center",
            zIndex: 100,
            dialogClass: "",
            draggable: !0,
            showMask: !0,
            buttons: {},
            btnTypes: !1,
            btnClassName: "t-r",
            btnHasDashed: !0,
            otherButtonPaneElem: !1,
            target: null,
            autoClose: !1,
            container: !1,
            closeDialogCallback: !1,
            showCloseButton: !0,
            stopCloseDialog: !1,
            returnInstance: !1,
            contentClass: "",
            topRemaind: !1,
            topRemaindHeightNumber: 1,
            topRemaindContainer: ""
        };

    function a(e) {
        return this.selfId = e.id, this.dialogDom = p("#" + e.id), this.options = e, this.btnMap = {}, this._init(), this.options.returnInstance ? this : this.dialogDom
    }

    p.extend(a.prototype, {
        _init: function () {
            this._createDialog(), this._instanceEvent()
        },
        _createDialog: function () {
            var e = this,
                n = e.options.container || p(document.body),
                i = e.options.buttons;
            0 < e.dialogDom.length && e.dialogDom.remove(), "object" === _typeof(i) && null !== i && p.each(i, function () {
                e.options.hasButtons = !0
            }), n.append(juicer(o, e.options)), e.dialogDom = p("#" + e.selfId), e.dialogDom.find(".dialog-content").html(e.options.content), e._buttonCreate()
        },
        _buttonCreate: function () {
            var s = this;
            if (s.options.showCloseButton) {
                var n = s.options.stopCloseDialog;
                s.dialogDom.find("#dialog-titlebar-close-a").bind("click", function (e) {
                    return n ? n.apply(this.arguments) && s._close() : s._close(), e.preventDefault(), !1
                })
            }
            if (s.options.hasButtons) {
                s.options.otherButtonPaneElem && s.dialogDom.find(".dialog-buttonpane").append(s.options.otherButtonPaneElem);
                var o = s.options.btnTypes;
                p.each(s.options.buttons, function (e, i) {
                    var n, t = {},
                        a = !1;
                    t.type = 1, "取消" != e && "关闭" != e && "返回首页" != e && "我知道了" != e || (t.type = 2, i || (a = !0)), o && o[e] && (t.type = o[e]), t.text = e, n = p(juicer(r, t)).attr("newbtn", "new").unbind().bind("click", function (e) {
                        var n;
                        "disabled" != p(this).attr("disabled") && ((a || !1 !== (n = i.apply(this.arguments))) && s._close(), "mask_hold" === n && l());
                        e.preventDefault()
                    }), (s.btnMap[e] = n).appendTo(s.dialogDom.find(".button-container"))
                })
            }
        },
        _instanceEvent: function () {
            var e = this,
                n = e.options;
            n.showMask && l(), i(e.dialogDom, {
                target: n.target,
                container: n.container
            }), e.dialogDom.addClass("animated jello"), n.autoClose && e.dialogDom.autoRemove(), n.draggable && p(".dialog-title").drag({
                target: e.dialogDom
            })
        },
        _close: function () {
            var e = this;
            e.options.showMask && n(), e.dialogDom.addClass("animated rotateOutDownLeft"), setTimeout(function () {
                e.dialogDom.remove()
            }, 500), e.options.closeDialogCallback && e.options.closeDialogCallback()
        },
        triggerClick: function (e) {
            this.btnMap[e].trigger("click")
        }
    }), window.dialog2 = function (e) {
        return new a(p.extend({}, t, e))
    };
    var v, s,
        o = '<div id = "${id}" class = "dialog ${dialogClass}" style="z-index:${zIndex}"><div class="dialog-td"><div class = "dialog-titlebar"><div class = "dialog-title"><span>${title}</span></div>{@if showCloseButton}<a href="javascript:;" id="dialog-titlebar-close-a"><div class = "newdialog-titlebar-close"></div></a>{@/if}</div>{@if topRemaind}<div class="dialog-remind dialog-remind-height${topRemaindHeightNumber}"><i class="dialog-remind-l"></i><i class="dialog-remind-r"></i><div class="dialog-remind-txt">$${topRemaindContainer}</div></div>{@/if}<div class = "dialog-content ${contentClass}"></div>{@if hasButtons}<div class = "dialog-buttonpane">{@if btnHasDashed == true}<div class="dialog-buttonpane-dashed"></div>{@/if}<div class = "dialog-button-container button-container ${btnClassName}"></div></div>{@/if}</div></div>',
        r = '<a href = "{@if href}${href}{@else}javascript:;{@/if}" {@if id}id = ${id}{@/if} class = "newbtn newbtn-${type}">${text}</a>';
    v = jQuery, s = {
        enable: !0,
        target: null,
        callback: {
            onMove: function (e) {},
            onDrop: function (e) {}
        }
    }, v.fn.drag = function (e) {
        var w = v.extend({}, s, e);
        return this.each(function () {
            if (w.enable) {
                var f = v(this);
                f.bind("mousedown", function (e) {
                    var i = w.target || f.parent().parent(),
                        n = i.outerHeight(),
                        t = i.outerWidth(),
                        a = i.offset(),
                        s = a.left,
                        o = a.top,
                        l = s,
                        r = o,
                        c = {
                            left: s,
                            top: o,
                            pageX: e.pageX,
                            pageY: e.pageY
                        },
                        d = v("<div></div>").appendTo(document.body),
                        m = v(document),
                        p = document.documentElement || document.body,
                        u = Math.max(p.scrollWidth, p.clientWidth),
                        h = Math.max(p.scrollHeight, p.clientHeight),
                        g = {
                            move: function (e) {
                                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), s = l + e.pageX - e.data.pageX, o = r + e.pageY - e.data.pageY, parseInt(s) < 0 && (s = 0), parseInt(o) < 0 && (o = 0), h - n < o && (o = h - n), u - t < s && (s = u - t), d.css({
                                    left: s,
                                    top: o
                                }), w.callback.onMove(e)
                            },
                            drop: function (e) {
                                d.remove(), i.css({
                                    left: s,
                                    top: o
                                });
                                var n = i.data("shim");
                                n && n.css({
                                    left: s,
                                    top: o
                                }), m.unbind("mousemove", g.move).css("cursor", ""), w.callback.onDrop(e)
                            }
                        };
                    m.css("cursor", "move"), d.css({
                        height: i.outerHeight(),
                        width: i.outerWidth(),
                        border: "1px dotted #333",
                        position: "absolute",
                        zIndex: parseInt(i.css("z-index")) + 1,
                        left: s,
                        top: o
                    }), m.bind("mousemove", c, g.move).bind("mouseup", c, g.drop)
                })
            }
        })
    }, _.extend(window.CT, {
        dialog2: dialog2
    })
}(jQuery),
function (e) {
    e(".input-border input").on("focus", function () {
        e(this).parent().css({
            "background-color": "#fff"
        })
    }).on("blur", function () {
        e(this).parent().css({
            "background-color": "#fbfafa"
        })
    })
}(jQuery),
function (o) {
    var n = {
        container: !1,
        current_page: 1,
        max_page: !1,
        view_string: "{current_page} / {max_page}",
        pageFn: function (e) {
            return !1
        },
        show_single_page: !1
    };

    function i(e) {
        var n = this;
        for (opt in e) n[opt] = e[opt];
        n.max_page = parseInt(n.max_page), n.current_page = parseInt(n.current_page), n.max_page < 2 && (n.max_page = 1), n._init()
    }

    _.extend(i.prototype, {
        _init: function () {
            var i = this;
            o.each(i.container, function (e, n) {
                i._render2container(o(n))
            })
        },
        _render2container: function (e) {
            var n = this,
                i = n._getViewStr(),
                t = {
                    current_page: n.current_page,
                    max_page: n.max_page,
                    viewStr: i
                },
                a = o(juicer(s, t));
            e.html(a), n._AddPageEvent(e), n._pageBtnGrey()
        },
        _AddPageEvent: function (e) {
            var n, i, t = this,
                a = e.find(".pagetool-select-con"),
                s = e.find(".pagetool-select");
            a.click(function () {
                s.toggle()
            }), n = [a], i = function () {
                s.hide()
            }, _.each(n, function (e) {
                e.click(function (e) {
                    e.stopPropagation()
                })
            }), o("html").click(function (e) {
                i.apply(null, arguments)
            }), e.find(".pre_link").click(function () {
                t.changePage("pre")
            }), e.find(".next_link").click(function () {
                t.changePage("next")
            }), e.find(".pagetool-select-li").hover(function () {
                o(this).addClass("pagetool-select-li-active")
            }, function () {
                o(this).removeClass("pagetool-select-li-active")
            }).click(function () {
                t.changePage(o(this).attr("pid"))
            })
        },
        changePage: function (e) {
            var n = this.current_page;
            if ("next" === e) {
                if (n === this.max_page) return !1;
                this.current_page++
            } else if ("pre" === e) {
                if (1 === n) return !1;
                this.current_page--
            } else {
                var i = parseInt(e);
                if (i === n) return !1;
                this.current_page = i
            }
            this._afterChangePage()
        },
        _afterChangePage: function () {
            this._pageBtnGrey(), o(".page_string").html(this._getViewStr()), this.pageFn.call(null, this.current_page)
        },
        _pageBtnGrey: function () {
            var e = this.current_page;
            o(".pre_link, .next_link").removeClass("page-link-grey"), 1 === e && o(".pre_link").addClass("page-link-grey"), e === this.max_page && o(".next_link").addClass("page-link-grey")
        },
        _getViewStr: function () {
            return this.view_string.replace("{current_page}", this.current_page).replace("{max_page}", this.max_page)
        }
    }), window.page = function (e) {
        return new i(_.extend({}, n, e))
    };
    var s = '<div class="button-group"><span class="button-group-btn pre_link">&lt;</span><span class="pagetool-select-con inline-block"><span class="page_string">${viewStr}</span><span></span><div class="pagetool-select"><ul>$${max_page|page_item_li}</ul></div></span><span class="button-group-btn next_link">&gt;</span></div>';
    juicer.register("page_item_li", function (e) {
        for (var n = "", i = 1; i <= e; i++) n += '<li class="pagetool-select-li" pid="' + i + '">' + i + " / " + e + "</li>";
        return n
    })
}(jQuery),
function (t) {
    var n = {
        $con: t(".page-con"),
        totalPage: 5,
        current: 5,
        type: "link",
        baseUrl: "/loans?currentPage=",
        callback: function () {}
    };

    function i(e) {
        this.pageTmpl = ['<ul class="pagination">', "{@if current == 1}", '<li class="disabled">', '<a><i class="page-icon first"></i></a>', "</li>", '<li class="disabled">', '<a><i class="page-icon prev"></i></a>', "</li>", "{@/if}", "{@if current > 1}", '<li class="">', '<a {@if type == "link"} href="${baseUrl}1" {@/if}><i class="page-icon first"></i></a>', "</li>", '<li class=" ">', '<a {@if type == "link"} href="${baseUrl}${current - 1}" {@/if}><i class="page-icon prev"></i></a>', "</li>", "{@/if}", "{@each arr as li, k}", '<li class=" {@if current == li}active{@/if}"><a data-page="${li}" class="normal-item" {@if type == "link" && current != li } href="${baseUrl}${li}" {@/if} >${li}</a></li>', "{@/each}", "{@if current == totalPage}", '<li class="disabled">', '<a><i class="page-icon next"></i></a>', "</li>", '<li class="disabled">', '<a><i class="page-icon last"></i></a>', "</li>", "{@/if}", "{@if current != totalPage}", '<li class="">', '<a  {@if type == "link"} href="${baseUrl}${current + 1}" {@/if}><i class="page-icon next"></i></a>', "</li>", '<li class=" ">', '<a  {@if type == "link"} href="${baseUrl}${totalPage}" {@/if}><i class="page-icon last"></i></a>', "</li>", "{@/if}", "</ul>"].join(""), this.opts = _.clone(e), this.init()
    }

    _.extend(i.prototype, {
        init: function () {
            this.render(), this.bindEvent()
        },
        render: function () {
            this.opts.$con.html(this.pagination(this.opts.current))
        },
        delayRender: function () {
            this.render()
        },
        bindEvent: function () {
            var i = this;
            "link" != i.opts.type && (i.opts.$con.on("click", ".normal-item", function (e) {
                e.preventDefault();
                var n = t(this).data("page");
                if (n == i.opts.current) return !1;
                i.opts.callback && "function" == typeof i.opts.callback && (i.opts.current = n, i.opts.callback(n), i.delayRender())
            }), i.opts.$con.on("click", ".first", function (e) {
                if (e.preventDefault(), 1 == i.opts.current) return !1;
                i.opts.callback && "function" == typeof i.opts.callback && (i.opts.current = 1, i.opts.callback(1), i.delayRender())
            }), i.opts.$con.on("click", ".last", function (e) {
                if (e.preventDefault(), i.opts.current == i.opts.totalPage) return !1;
                i.opts.callback && "function" == typeof i.opts.callback && (i.opts.current = i.opts.totalPage, i.opts.callback(i.opts.totalPage), i.delayRender())
            }), i.opts.$con.on("click", ".prev", function (e) {
                if (e.preventDefault(), 1 == i.opts.current) return L.showTopTips("warning", "已经是第一页"), !1;
                i.opts.callback && "function" == typeof i.opts.callback && (i.opts.current = i.opts.current - 1, i.opts.callback(i.opts.current), i.delayRender())
            }), i.opts.$con.on("click", ".next", function (e) {
                if (e.preventDefault(), i.opts.totalPage - i.opts.current == 0) return L.showTopTips("warning", "已经是最后一页"), !1;
                i.opts.callback && "function" == typeof i.opts.callback && (i.opts.current = i.opts.current + 1, i.opts.callback(i.opts.current), i.delayRender())
            }))
        },
        pagination: function () {
            var e = this,
                n = [];
            if (e.opts.current > e.opts.totalPage) return console.log("当前页数不能大约总页数"), !1;
            if (e.opts.totalPage <= 10)
                for (var i = 1; i <= e.opts.totalPage; i++) n.push(i);
            else {
                if (e.opts.current <= 10)
                    if (e.opts.current < 7)
                        for (i = 1; i <= 10; i++) n.push(i);
                    else
                        for (i = e.opts.current - 5; i <= e.opts.current + 4; i++) n.push(i);
                if (10 < e.opts.current)
                    if (e.opts.current <= e.opts.totalPage - 10)
                        for (i = e.opts.current - 5; i <= e.opts.current + 4; i++) n.push(i);
                    else
                        for (i = e.opts.totalPage - 9; i <= e.opts.totalPage; i++) n.push(i)
            }
            return juicer(e.pageTmpl, {
                baseUrl: e.opts.baseUrl,
                totalPage: e.opts.totalPage,
                current: e.opts.current,
                arr: n,
                type: e.opts.type
            })
        }
    }), window.paginationList = function (e) {
        return new i(_.extend(n, e))
    }
}(jQuery),
function (f) {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var n = {};

    function i(e) {
        this.current = e.current, this.previews = e.previews, this.$previewSlot = f(".preview-slot"), this.$previewCon = f(".preview-container-outer"), this.$previewStage = f(".preview-stage"), this.pageY = window.scrollY, this._init()
    }

    _.extend(i.prototype, {
        _init: function () {
            this._render()
        },
        stopBodyScroll: function (e) {
            var n = f("body");
            e ? (this.pageY = window.scrollY, n.css({
                position: "fixed",
                width: "100%"
            }), window.CT.showMask(!0)) : (n.css({
                position: "static",
                width: "auto"
            }), window.scrollTo(0, this.pageY), window.CT.hideMaskNow())
        },
        _render: function () {
            var e = this;
            0 === e.$previewSlot.length && f("body").append('<div class="preview-slot"></div>'), e.$previewSlot = f(".preview-slot"), e.$previewSlot.html(Handlebars.compile('\n        <div class="preview-container-outer">\n            <div class="preview-header">\n            \n                <span class="page-count"><span class="current">{{page}}</span> / <span class="total">{{total}}</span></span>\n                <span class="scale-con zoom"></span>\n                <img src="/statics/images/close-white-a421670cef.png" alt="" class="close-icon">\n            </div>\n            <img src="/statics/images/prev-icon-849a604af5.png" alt="" class="prev-icon" {{#if isFirst}}style="display: none;"{{/if}}>\n            <img src="/statics/images/next-icon-65c1b9b6c9.png" alt="" class="next-icon" {{#if isLast}}style="display: none;" {{/if}}>\n\n            <div class="preview-stage" draggable="true">\n                <div class="preview-container">\n\n                    <div class="preview-outer">\n                        <img src="/statics/images/loading-img-white-3d4bb26e8f.gif" alt="" class="loading-img">\n                        <span class="preview-item">\n                            \n                        </span>\n                    </div>\n                </div>\n            </div>\n            \n        </div>\n    ')({
                isFirst: 0 === e.current,
                current: e.current,
                page: e.current + 1,
                previews: e.previews,
                total: e.previews.length,
                isLast: e.current === e.previews.length - 1
            })), e.$previewCon = f(".preview-container-outer"), e.$previewStage = f(".preview-container-outer .preview-stage"), e.$previewContainer = f(".preview-container-outer .preview-container"), e.$previewOuter = f(".preview-container-outer .preview-outer"), e.$previewItem = f(".preview-container-outer .preview-item"), e.$loadingImg = f(".preview-container-outer .loading-img"), e.$prev = f(".preview-container-outer .prev-icon"), e.$next = f(".preview-container-outer .next-icon"), e.$current = f(".preview-container-outer .page-count .current"), e.$original = f(".preview-container-outer .original-image"), e.$pageCount = f(".preview-container-outer .page-count"), e.$scaleCon = f(".preview-container-outer .scale-con"), this.stopBodyScroll(!0);
            var n = e.previews[e.current];
            e.showImage(n), e.adjustContainer(), this._bindEvents()
        },
        adjustContainer: function () {
            this.$previewCon.css({
                top: "0px"
            }).show()
        },
        adjustImage: function (e, n) {
            var i = 0,
                t = 0,
                a = !1,
                s = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                o = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) - 56;
            return this.$prev.css({
                top: (o + 56 - 60) / 2 + 56 + "px"
            }), this.$next.css({
                top: (o + 56 - 60) / 2 + 56 + "px"
            }), n <= e ? (e < s ? i = e : (i = s, a = !0), o < (t = i * n / e) && (i = (t = o) * e / n, a = !0)) : (n < o ? t = n : (t = o, a = !0), s < (i = t * e / n) && (t = (i = s) * n / e, a = !0)), {
                hasAdjust: a,
                width: i,
                height: t,
                screenWidth: s,
                screenHeight: o + 56
            }
        },
        showImage: function (e) {
            var t = this;
            t.init = !0, t.$previewItem.hide(), t.$previewContainer.css({
                width: "300px",
                height: "300px",
                left: "50%",
                "margin-left": "-150px",
                top: "200px"
            }).data("zoom", 100), t.$loadingImg.show(), t.loading = !0;
            var a = new Image;
            a.onload = function () {
                var e = a.width,
                    n = a.height;
                t.loading = !1;
                var i = t.adjustImage(e, n);
                a.width = i.width, a.height = i.height, t.original = {
                    imgWidth: e,
                    imgHeight: n
                }, t.screen = {
                    screenWidth: i.screenWidth,
                    screenHeight: i.screenHeight
                }, t.$previewContainer.css({
                    width: Math.floor(i.width) + "px",
                    height: Math.floor(i.height) + "px",
                    left: "50%",
                    "margin-left": -i.width / 2 + "px",
                    top: (i.screenHeight - i.height - 56) / 2 + "px"
                }), t.$previewStage.css({
                    width: "100%",
                    height: Math.floor(i.screenHeight - 56) + "px"
                }), i.hasAdjust && (t.$previewContainer.data("zoom", 1), t.$previewContainer.data("width", i.width), t.$previewContainer.data("imgWidth", e), t.$previewContainer.data("height", i.height), t.$previewContainer.data("imgHeight", n), t.$previewContainer.data("screenWidth", i.screenWidth), t.$previewContainer.data("screenHeight", i.screenHeight)), t.$loadingImg.hide(), i.hasAdjust ? (t.$previewItem.html(f(a).clone().addClass("show-img zoom-in")).show(), t.$previewItem.append(f(a).clone().addClass("original-img")), t.$previewContainer.find(".original-img").css({
                    width: Math.floor(e) + "px",
                    height: Math.floor(n) + "px"
                }), t.$pageCount.addClass("hasScale"), t.$scaleCon.css("display", "inline-block")) : (t.$previewItem.html(f(a).addClass("show-img")).show(), t.$pageCount.removeClass("hasScale"), t.$scaleCon.hide())
            }, a.onerror = function () {
                throw new Error(a.src + " :图片预览加载失败")
            }, a.src = window.CT.replaceHttps(e)
        },
        prevImg: function () {
            var e = this;
            if (e.loading) return !1;
            if (0 === e.current) return !1;
            1 === e.current && e.$prev.hide(), e.$scaleCon.addClass("zoom").hide(), e.$next.show(), e.current = e.current - 1;
            var n = e.previews[e.current];
            e.$current.text(e.current + 1), e.showImage(n)
        },
        nextImg: function () {
            var e = this;
            if (e.loading) return !1;
            if (e.current === e.previews.length - 1) return !1;
            e.current === e.previews.length - 2 && e.$next.hide(), e.$scaleCon.addClass("zoom").hide(), e.$prev.show(), e.current = e.current + 1;
            var n = e.previews[e.current];
            e.$current.text(e.current + 1), e.showImage(n)
        },
        _bindEvents: function () {
            var g = this;
            f(".preview-container-outer .close-icon").on("click", function () {
                g._hidePreview()
            }), f(".preview-container-outer .preview-stage").on("click", function (e) {
                e.stopPropagation(), g._hidePreview()
            }), f(".mask").on("click", function () {
                "block" === g.$previewCon.css("display") && g._hidePreview()
            }), f(".preview-container-outer .preview-container").on("click", function (e) {
                var n = f(this),
                    i = n.parents(".preview-stage"),
                    t = n.data("zoom"),
                    a = n.data("screenWidth"),
                    s = n.data("screenHeight"),
                    o = n.data("width"),
                    l = n.data("imgWidth"),
                    r = n.data("height"),
                    c = n.data("imgHeight"),
                    d = n.offset();
                if (e.stopPropagation(), 100 === t) return !1;
                if (1 === t) {
                    g.$previewStage.addClass("preview-stage-move"), g.$scaleCon.removeClass("zoom"), n.data("zoom", 2);
                    var m = e.pageX,
                        p = e.pageY,
                        u = Math.floor(l * (m - d.left) / o) - m,
                        h = Math.floor(c * (p - d.top) / r) - p;
                    g.$previewContainer.css({
                        width: Math.floor(l) + "px",
                        height: Math.floor(c) + "px",
                        left: "50%",
                        "margin-left": -l / 2 + "px",
                        top: (s - c - 56) / 2 + "px"
                    }), a < l && g.$previewContainer.css({
                        left: 0,
                        "margin-left": 0
                    }), s < c && g.$previewContainer.css({
                        top: 0
                    }), g.$previewContainer.find(".zoom-in").hide(), g.$previewContainer.find(".original-img").show(), i[0].scrollTo(u, h)
                } else g.$scaleCon.addClass("zoom"), g.$previewStage.removeClass("preview-stage-move"), n.data("zoom", 1), g.$previewContainer.css({
                    width: Math.floor(o) + "px",
                    height: Math.floor(r) + "px",
                    left: "50%",
                    "margin-left": -o / 2 + "px",
                    top: (s - r - 56) / 2 + "px"
                }), g.$previewContainer.find(".zoom-in").show(), g.$previewContainer.find(".original-img").hide()
            }), f(document).on("keyup", function (e) {
                var n = e.keyCode;
                37 === n && g.prevImg(), 39 === n && g.nextImg()
            }), f(".preview-container-outer .prev-icon").on("click", function () {
                g.prevImg()
            }), f(".preview-container-outer .next-icon").on("click", function () {
                g.nextImg()
            }), f(".preview-container-outer .scale-con").on("click", function () {
                var e = f(this);
                e.hasClass("zoom") ? e.removeClass("zoom") : e.addClass("zoom"), f(".preview-container-outer .preview-container").click()
            })
        },
        _hidePreview: function () {
            this.stopBodyScroll(!1), f(".preview-container-outer").hide(), f(document).off("keyup")
        }
    }), window.CT.preview = function (e) {
        return new i(_.extend(n, e))
    }
}(jQuery),
function () {
    for (var s = 0, e = ["ms", "moz", "webkit", "o"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (e, n) {
        var i = (new Date).getTime(),
            t = Math.max(0, 16 - (i - s)),
            a = window.setTimeout(function () {
                e(i + t)
            }, t);
        return s = i + t, a
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
        clearTimeout(e)
    })
}(),
function (e, s) {
    s("body").on("click", ".select-con", function (e) {
        e.stopPropagation();
        s(this);
        var n = s(e.target),
            i = n.hasClass("select-con") ? n : n.parents(".select-con"),
            t = i.find(".select-ul");
        "block" === t.css("display") ? s(".select-ul").hide() : "" != t.html() && t.show(), i.parent(".search-select-item").siblings().find(".select-ul").hide(), i.siblings().find(".select-ul").hide()
    }), s("body").on("click", ".select-li", function (e) {
        var n = s(this),
            i = n.parents(".select-con").find(".select-value"),
            t = n.data("id"),
            a = n.data("value");
        n.addClass("active").siblings().removeClass("active"), i.text(a), i.data("id", t), i.data("value", a)
    }), s("body").click(function (e) {
        var n = s(e.target);
        if (n.hasClass("select-con") || 0 < n.parents(".select-con").length) return !1;
        s(".select-ul").hide()
    })
}(window, jQuery),
function (e, t) {
    t("body").on("click", ".par-item-has-child", function (e) {
        var n = t(this),
            i = n.find("img");
        $child = n.next(".sub-con"), display = $child.css("display"), "none" == display ? ($child.css("display", "block"), i.addClass("img-transition")) : ($child.css("display", "none"), i.removeClass("img-transition "))
    })
}(window, jQuery),
function (t) {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var n = "确定",
        i = "取消";

    function a(e) {
        this.options = e, this.options.hasOk = !(!e.onOk || "function" != typeof e.onOk), this.options.hasCancel = !(!e.onCancel || "function" != typeof e.onCancel), this.options.hasClose = !(!e.onClose || "function" != typeof e.onClose), this.options.hasTitle = !!e.title, this.options.hasContent = !!e.content, this.options.autoClose = !!e.autoClose, this.options.okBtnClass = e.okBtnClass ? e.okBtnClass : "", this.options.okText = e.okText ? e.okText : n, this.options.cancelText = e.cancelText ? e.cancelText : i, this._init()
    }

    _.extend(a.prototype, {
        _init: function () {
            this._render(), this._bindEvents()
        },
        _createContainer: function () {
            t(".dialog-container").length <= 0 && t("body").append('<div class="dialog-container"></div>'), this.$container = t(".dialog-container")
        },
        _render: function () {
            var e = this;
            e._createContainer();
            var n = Handlebars.compile('\n        <div class="dialog newDialog commonDialog">\n            <img class="close-icon" src="/statics/images/close-8809a1ad23.png" />\n            <div class="common-dialog-content-con clearfix">\n                {{#if hasTitle}}\n                    <div class="dialog-title">{{title}}</div>\n                {{/if}}\n                {{#if hasContent}}\n                    <div class="dialog-content">{{{content}}}</div>\n                {{/if}}\n            </div>\n            <div class="common-dialog-btn-con clearfix {{#if hasCancel}} cancel-dialog-btn-con {{/if}}">\n                {{#if hasOk}}\n                    <a class="btn left confirm-btn {{okBtnClass}}">{{okText}}</a>\n                {{/if}}\n                {{#if hasCancel}}\n                    <a class="btn4 right cancel-btn">{{cancelText}}</a>\n                {{/if}}\n                \n                \n            </div>\n            \n        </div>\n    '),
                i = e.options;
            e.$container.html(n(i)), e.pageY = window.scrollY, t("body").css({
                position: "fixed",
                width: "100%"
            }), window.CT.showMask(), e.$dialog = t(".commonDialog").show(), window.CT.setPosition(e.$dialog)
        },
        _bindEvents: function () {
            var e = this;
            t(".dialog-container .close-icon").off().on("click", function () {
                e.options.hasClose && e.options.onClose(), e._close()
            }), t(".dialog-container .confirm-btn").off().on("click", function () {
                if (t(this).hasClass("disabled")) return !1;
                e.options.hasOk && e.options.onOk(), e.options.autoClose && e._close()
            }), t(".dialog-container .cancel-btn").off().on("click", function () {
                e.options.hasCancel && e.options.onCancel(), e._close()
            })
        },
        _close: function () {
            this.$dialog.html(""), this.$dialog.hide(), t("body").css({
                position: "static",
                width: "auto"
            }), window.scrollTo(0, this.pageY), window.CT.hideMaskNow()
        }
    }), window.CT.dialog = function (e) {
        return new a(e)
    }
}(jQuery),
function (e, d) {
    d(function () {
        d(".tool-tips").hover(function (e) {
            var n = d(this),
                i = n.width(),
                t = n.height(),
                a = n.find(".tool-tips-icon"),
                s = n.find(".tool-tips-content"),
                o = s.width(),
                l = s.height(),
                r = n.data("direction"),
                c = "tips-" + r;
            switch (a.addClass(c), d(".tool-tips-content").hide(), r) {
                case "left":
                    s.css({
                        left: i + 10 + "px",
                        top: -l / 3 + "px"
                    }), a.css({
                        top: l / 3 + "px",
                        left: "-8px"
                    });
                    break;
                case "right":
                    s.css({
                        left: -(o + 10) + "px",
                        top: -l / 3 + "px"
                    }), a.css({
                        top: l / 3 + "px",
                        left: o + "px"
                    });
                    break;
                case "top":
                    s.css({
                        left: -o / 3 + "px",
                        top: t + 10 + "px"
                    }), a.css({
                        top: "-8px",
                        left: o / 3 + "px"
                    });
                    break;
                case "bottom":
                    s.css({
                        left: -o / 3 + "px",
                        top: -(l + 10) + "px"
                    }), a.css({
                        top: l - 2 + "px",
                        left: o / 3 + "px"
                    })
            }
            s.show()
        }, function () {
            var e = d(this),
                n = e.data("delay"),
                i = e.find(".tool-tips-content");
            if (n) return setTimeout(function () {
                i.hide()
            }, 5e3), !1;
            setTimeout(function () {
                i.hide()
            }, 300)
        })
    })
}(0, jQuery),
function (e) {
    window.CT = window.hasOwnProperty("CT") ? window.CT : {};
    var s = !1,
        o = !1,
        t = !1,
        a = null,
        n = function () {
            if (!s) return !1;
            o && (o = clearTimeout(o)), s.hide()
        },
        l = function () {
            s = e(i), e("body").append(s), s.find("#tips_top_container_close").click(n)
        },
        i = '<div id="tips_top_container"><div class="inline-block tips-top"><span class="tips-top-text"></span></div></div>';
    window.showTopTips = function (e, n, i) {
        t = !0, a = (new Date).getTime(),
            function (e, n, i) {
                s || l();
                var t = s,
                    a = t.children();
                a.children("a"), a.find("span");
                i = i || 3e3, o && (o = clearTimeout(o)), o = setTimeout(function () {
                    t.hide(), o = null
                }, i), a.find("span").html(n), t.show(), window.CT.setPosition(t)
            }(0, n, i)
    };
    var r = function () {
        t = !1, n()
    };
    window.hideTopTips = r, window.setInterval(function () {
        if (t) {
            var e = (new Date).getTime();
            (null == a || 3e3 < e - a) && r()
        }
    }, 3e3), _.extend(window.CT, {
        showTopTips: showTopTips,
        hideTopTips: r
    }), window.phoneRegex = /^((111)|(121)|(13[0-9])|(14[0-9])|(15[^4,\D])|(166)|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/
}(jQuery),
function (m) {
    var p = '\n        <span class="author-hover-con" >\n            <span class="author-hover-inner-con" data-jid="{{jid}}" data-id="{{id}}">\n                <img src="/statics/images/white-angle-b653d167a1.png" alt="" class="white-angle">\n            \n                <span class="hover-loading-con">\n                    <span class="link-loading-icon small hover-loading-icon"><span class="rect rect1"></span><span class="rect rect2"></span><span class="rect rect3"></span></span>\n                </span>\n                \n                <span class="hover-content-con">\n                    \n                </span>\n            \n            </span>\n        </span>\n    ',
        u = '\n            <span class="author-info clearfix">\n                <img class="author-avatar-inner left" src="{{replaceHttps imgUrl}}" alt="" data-jump="/publish/links/{{jid}}" onerror="javascript:this.src=\'/statics/images/image48-9d05fa83eb.png\';this.onerror=null;">\n                <span class="author-info-detail left">\n                    <span class="nick" data-jump="/publish/links/{{jid}}">{{nick}}</span>\n                    <span class="sex-info clearfix">\n                        {{#if choutiLife}}\n                            <img class="time-icon" src="/statics/images/time_icon-142bd8e680.png" />\n                            <span class="age">{{choutiLife}}抽龄</span>\n                        {{/if}}\n                        \n                        {{#if proveName}}\n                            <img class="location-icon" src="/statics/images/position_icon-f79a908bae.png" />\n                            <span class="location">{{setArea proveName cityName}}</span>\n                        {{/if}}\n                        <span class="sex {{#if sex}}man{{/if}}{{#unless sex}}woman{{/unless}}" >{{#if sex}}男{{/if}}{{#unless sex}}女{{/unless}}</span>\n                    </span>\n                </span>\n                <span class="attenstate-con right"  data-jid="{{jid}}" data-nick="{{nick}}">\n                    {{userAttention attentState jid}}\n                </span>\n            </span>\n            {{#if sign}}\n            <span class="author-des">\n                <span class="des-content">简介： {{subSign sign}}</span>\n            </span>\n            {{/if}}\n            {{#unless sign}}\n            <span class="all-count-con clearfix">\n                <span class="count-item count-item1 publish-num-con left">\n                    <span class="count-num-item publish-num">{{getThousand submittedCount}}</span>\n                    <span class="count-name-item publish-name">发布</span>\n                </span>\n                <span class="count-line left"></span>\n                <span class="count-item publish-num-con left">\n                    <span class="count-num-item publish-num">{{getThousand likedCount}}</span>\n                    <span class="count-name-item publish-name">推荐</span>\n                </span>\n                <span class="count-line left"></span>\n                <span class="count-item publish-num-con left">\n                    <span class="count-num-item publish-num">{{getThousand commentsCount}}</span>\n                    <span class="count-name-item publish-name">评论</span>\n                </span>    \n            </span>\n            {{/unless}}\n        \n    ';
    window.userCard = {}, window.userData = {}, m("body").on("mouseenter mouseleave", ".author-avatar-name", function (e) {
        if (window.jid === m(this).data("jid")) return !1;
        var s = m(e.target).parents(".author-con"),
            o = s.find(".author-avatar-name"),
            l = s.find(".author-hover-con"),
            r = o.data("id"),
            c = o.data("jid"),
            d = l.length;
        "mouseenter" == e.type ? (window.userCard[r] ? window.userCard[r].inHover = !0 : (window.userCard[r] = {}, window.userCard[r].inHover = !0, window.userCard[r].jid = c), window.userCard[r].timId || (window.userCard[r].timId = setTimeout(function () {
            if (window.userCard[r].inHover)
                if (0 === d) {
                    var e = Handlebars.compile(p)({});
                    o.append(e), l = s.find(".author-hover-con");
                    var i = s.find(".hover-loading-con"),
                        t = s.find(".hover-content-con");
                    l.show();
                    var n = !1;
                    if (window.userCard[r].data ? n = !0 : window.userData.hasOwnProperty(window.userCard[r].jid) && (n = !0, window.userCard[r].data = window.userData[window.userCard[r].jid]), n) {
                        var a = Handlebars.compile(u)(window.userCard[r].data);
                        t.html(a), i.hide(), t.show()
                    } else {
                        if (!c) return window.showTopTips("warning", "用户jid不存在"), !1;
                        m.ajax({
                            url: "/users/profile?",
                            type: "GET",
                            data: {
                                jid: c
                            },
                            success: function (e) {
                                window.userCard[r].data = e, window.userData[c] = e;
                                var n = Handlebars.compile(u)(e);
                                t.html(n), m(".author-avatar-inner").on("error", function () {
                                    m(this).attr("src", "/statics/images/image48-9d05fa83eb.png")
                                }), i.hide(), t.show()
                            }
                        })
                    }
                } else l = s.find(".author-hover-con"), m(".author-avatar-inner").on("error", function () {
                    m(this).attr("src", "/statics/images/image48-9d05fa83eb.png")
                }), l.show()
        }, 1e3))) : "mouseleave" == e.type && (l.hide(), window.userCard[r].inHover = !1, clearTimeout(window.userCard[r].timId), window.userCard[r].timId = !1)
    }), m("body").on("mouseenter mouseleave", ".comment-avatar-con", function (e) {
        var n = m(e.target),
            s = (n.hasClass("comment-avatar-con") ? n : n.parents(".comment-avatar-con")).parent().find(".comment-user-card-con"),
            o = s.find(".author-hover-con"),
            l = s.data("jid"),
            r = s.data("id"),
            c = o.length;
        if (window.jid === l) return !1;
        "mouseenter" == e.type ? (window.userCard[r] ? (window.userCard[r].inHover = !0, window.userCard[r].inCard = !1) : window.userCard[r] = {
            inHover: !0,
            jid: l,
            timId: !1,
            inCard: !1
        }, window.userCard[r].timId || (window.userCard[r].timId = setTimeout(function () {
            if (window.userCard[r].inHover)
                if (0 === c) {
                    var e = Handlebars.compile(p)({
                        jid: l,
                        id: r
                    });
                    s.append(e), o = s.find(".author-hover-con");
                    var i = s.find(".hover-loading-con"),
                        t = s.find(".hover-content-con");
                    o.show();
                    var n = !1;
                    if (window.userCard[r].data ? n = !0 : window.userData.hasOwnProperty(window.userCard[r].jid) && (n = !0, window.userCard[r].data = window.userData[window.userCard[r].jid]), n) {
                        var a = Handlebars.compile(u)(window.userCard[r].data);
                        t.html(a), i.hide(), t.show()
                    } else {
                        if (!l) return window.showTopTips("warning", "用户jid不存在"), !1;
                        m.ajax({
                            url: "/users/profile?",
                            type: "GET",
                            data: {
                                jid: l
                            },
                            success: function (e) {
                                window.userCard[r].data = e, window.userData[l] = e;
                                var n = Handlebars.compile(u)(e);
                                t.html(n), m(".author-avatar-inner").on("error", function () {
                                    m(this).attr("src", "/statics/images/image48-9d05fa83eb.png")
                                }), i.hide(), t.show()
                            }
                        })
                    }
                } else m(".author-avatar-inner").on("error", function () {
                    m(this).attr("src", "/statics/images/image48-9d05fa83eb.png")
                }), o.show()
        }, 1500))) : "mouseleave" == e.type && (window.userCard[r].inHover = !1, clearTimeout(window.userCard[r].timId), window.userCard[r].timId = !1, window.userCard[r].timId2 ? (clearTimeout(window.userCard[r].timId2), window.userCard[r].timId2 = !1) : window.userCard[r].timId2 = setTimeout(function () {
            if (clearTimeout(window.userCard[r].timId2), window.userCard[r].timId2 = !1, window.userCard[r].inCard) return !1;
            o.hide(), window.userCard[r].inCard = !1
        }, 50))
    }), m("body").on("mouseenter mouseleave", ".comment-user-card-con .author-hover-con", function (e) {
        var n = m(this),
            i = n.find(".author-hover-inner-con"),
            t = i.data("id");
        i.data("jid");
        "mouseenter" == e.type ? window.userCard[t].inCard = !0 : "mouseleave" == e.type && (n.hide(), window.userCard[t].inCard = !1, window.userCard[t].inHover = !1, clearTimeout(window.userCard[t].timId), window.userCard[t].timId = !1)
    })
}(jQuery), $.extend(ViewPicture.prototype, {
        init: function () {
            L.showMask(!0);
            $("body").append('<div class="pic-con" style=""><div class="albums-slide-handler-name"></div><div class="albums-slide-handler-left"><a href="javascript:;" id="albums_slide_handler_left"></a></div><img class="pic-item"/><img class="pic-item-loading" src="/v2/assets/statics/images/loadinfo_white_48_48.gif"/><div class="albums-slide-handler-right"><a href="javascript:;" id="albums_slide_handler_right"></a></div></div>');
            var e = $(".pic-con");
            this.curScrollTop = $(window).scrollTop(), $(window).scrollTop(0), this.setPosition(e), this.renderImage()
        },
        showTools: function (e) {
            0 == $("#albums_slide_close_btn").length ? $("body").append('<a href="javascript:;" id="albums_slide_close_btn" class="albums-slide-close-btn"></a>') : $("#albums_slide_close_btn").show();
            var n = Math.abs(e - 80) / 2;
            $("#albums_slide_handler_left").css({
                marginTop: n
            });
            var i = Math.abs(e - 80) / 2;
            $("#albums_slide_handler_right").css({
                marginTop: i
            })
        },
        hideTools: function () {
            $(window).scrollTop(this.curScrollTop), $("#albums_slide_close_btn").hide()
        },
        setPosition: function (e) {
            var n = document.documentElement.clientWidth,
                i = document.documentElement.clientHeight,
                t = e.width(),
                a = e.height(),
                s = Math.max(0, (n - t) / 2) + (document.body.scrollLeft || document.documentElement.scrollLeft),
                o = Math.max(0, (i - a) / 2) + (document.body.scrollTop || document.documentElement.scrollTop);
            e.css({
                left: s + "px",
                top: o + "px"
            })
        },
        renderImage: function () {
            var o = this,
                l = o.dataArr[o.idx][o.imgIdx - 1].imagePath,
                r = $(".pic-item"),
                e = ($(".pic-item-loading"), $(".albums-slide-handler-name")),
                c = new Image;
            e.html(o.dataArr[o.idx][o.imgIdx - 1].name), window.url = l, c.onload = function () {
                r.attr("src", l);
                var e = document.documentElement.clientWidth,
                    n = document.documentElement.clientHeight,
                    i = Math.min(parseInt(c.width), e - 300),
                    t = Math.min(parseInt(c.height), n),
                    a = Math.max(0, (e - i) / 2) + (document.body.scrollLeft || document.documentElement.scrollLeft),
                    s = Math.max(0, (n - t) / 2) + (document.body.scrollTop || document.documentElement.scrollTop);
                $(".pic-item-loading").hide(), $(".pic-con").animate({
                    width: i + "px",
                    height: t + "px",
                    left: a + "px",
                    top: s + "px"
                }, function () {
                    r.fadeIn(300), r.show(), o.setPosition($(".pic-con"))
                }), r.attr("width", i), r.attr("height", t), o.showTools(t), o.bindEvents()
            }, c.onerror = function () {
                setTimeout(function () {
                    L.showTopTips("warning", "图片链接地址有误，请稍后重试！"), $(".pic-con").remove(), L.hideMask()
                }, 800)
            }, c.src = l
        },
        bindEvents: function () {
            var e = this;
            e.url;
            $("#albums_slide_close_btn").unbind().click(function () {
                $(".pic-con").remove(), L.hideMask(), e.hideTools()
            }), $("#albums_slide_handler_left").unbind().click(function () {
                1 < e.imgIdx ? (e.imgIdx--, e.renderImage()) : 0 < e.idx ? (e.idx--, e.imgIdx = e.dataArr[e.idx].length, e.renderImage()) : L.showTopTips("warning", "已经是第一张")
            }), $("#albums_slide_handler_right").unbind().click(function () {
                e.imgIdx < e.dataArr[e.idx].length ? (e.imgIdx++, e.renderImage()) : e.idx < e.dataArr.length - 1 ? (e.idx++, e.imgIdx = 1, e.renderImage()) : L.showTopTips("warning", "已经是最后一张")
            })
        }
    }),
    function () {
        var n = {},
            i = function () {
                function n(e) {
                    _classCallCheck(this, n), this._init()
                }

                return _createClass(n, [{
                    key: "_init",
                    value: function () {
                        this._render()
                    }
                }, {
                    key: "_render",
                    value: function () {
                        window.CT.showMask(), window.CT.hideDialog();
                        var e = Handlebars.compile('<div class="dialog newDialog bind-phone-dialog">\n        <img class="close-icon" src="/statics/images/close-8809a1ad23.png" />\n        <h1>绑定手机号</h1>\n        <p>依照《互联网跟帖评论服务管理规定》</p>\n        <p>请绑定手机号后进行发布与评论。</p>\n        \n        <button class="bind-phone-btn">立刻绑定</button>\n    </div>');
                        $("body").append(e({})), $(".dialog").css({
                            top: parseFloat((document.documentElement.clientHeight - $(".dialog").height()) / 2) + "px"
                        }), this._bindEvents()
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        $("body").on("click", ".close-icon", function (e) {
                            $(e.target).parent(".bind-phone-dialog").remove(), window.CT.hideMask()
                        }), $("body").on("click", ".charact", function (e) {
                            window.CT.showReleaseText()
                        }), $("body").on("click", ".publish-pictures", function (e) {
                            window.CT.showReleasePic()
                        }), $("body").on("click", ".publish-url", function (e) {
                            window.CT.showReleaseUrl()
                        }), $("body").on("click", ".bind-phone-btn", function (e) {
                            location.href = "/phone/validate"
                        })
                    }
                }]), n
            }();
        window.CT.bingPhoneDialog = function (e) {
            return new i(_.extend({}, n, e))
        }
    }(jQuery),
    function () {
        window.CT = window.hasOwnProperty("CT") ? window.CT : {};
        var e = {
            isUserBan: function () {
                return !(!window.action || 2 != window.action) && (window.showTopTips("error", "你已被封禁"), !0)
            },
            isBindPhone: function () {
                return !!window.phone || (window.CT.bingPhoneDialog(), !1)
            }
        };
        _.extend(window.CT, e)
    }(jQuery),
    function (r) {
        function e() {
            this.$linkLoading = r(".extra-loading-more.link-loading-more"), this.$extraLinks = r(".extra-links-con"), this.$extraHourCon = r(".con-hour"), this.$extra24Con = r(".con-24hr"), this.$extra72Con = r(".con-72hr"), this.$extra168Con = r(".con-168hr"), this.$topicLoading = r(".extra-loading-more.topic-loading-more"), this.$extraTopic = r(".extra-hot-topic"), this.$adCon = r(".ad-con"), this.$extraRecommendCon = r(".extra-attention-recommend-con"), this.$extraRecommendLoading = r(".extra-loading-more.recommend-loading-more"), this.$extraRecommend = r(".extra-attention-recommend"), this.$extraRecommendList = r(".extra-attention-recommend-list"), this.$changeAttentionBtn = r(".another-batch"), this.$extraDynamicCon = r(".extra-common-dynamic-con"), this.$dynamicLoading = r(".extra-loading-more.dynamic-loading-more"), this.$extraDynamic = r(".extra-attention-dynamic"), this.$extraDynamicConTitle = r(".extra-common-dynamic-con .extra-dynamic-title"), this.lastRecommend = "", this.currentTime = "24hr", this.preTime = "24hr", this.extraLinkData = {
                "24hr": {
                    list: [],
                    isGetData: !1
                },
                "72hr": {
                    list: [],
                    isGetData: !1
                },
                "168hr": {
                    list: [],
                    isGetData: !1
                }
            }, this.extraLinkInit = !0, this.curIdx = 0, this._init(), this._bindEvent()
        }

        _.extend(e.prototype, {
            _init: function () {
                var e = this;
                e._renderLink("24hr"), e._renderLink("72hr"), e._renderLink("168hr"), e._renderAd(), e._renderTopic(), e.$extraRecommendCon.show(), e._renderRecommendAttention(!0), window.jid && e._renderDynamic()
            },
            _renderDynamic: function () {
                var t = this,
                    e = this.$extraDynamicCon.length;
                window.followCount && 0 < window.followCount && (t.$extraDynamicCon.show(), 0 < e && r.ajax({
                    url: "/attention/dynamic",
                    type: "GET",
                    data: {
                        count: 5,
                        type: 3
                    },
                    success: function (e) {
                        _.each(e, function (e) {
                            e.isComment = !1, e.isLink = !1, 1 === e.type ? e.isLink = !0 : 2 === e.type && (e.isComment = !0, e.comment.isParent = !(!e.comment || 0 !== e.comment.depth), e.comment.isDissentTag = !(2 == e.comment.action || !e.comment.dissentTag), e.comment.isSeven = 6 === e.comment.depth)
                        }), t.$dynamicLoading.hide();
                        var n = Handlebars.compile(window.CT.extraDynamicTmpl),
                            i = {
                                list: 5 < e.length ? e.slice(0, 5) : e
                            };
                        5 < e.length && t.$extraDynamicConTitle.html("还有更多新动态"), t.$extraDynamic.html(n(i)).show(), t._bindDynamic()
                    },
                    error: function (e) {}
                }))
            },
            _bindDynamic: function () {
                r(".dynamic-avatar-icon").on("error", function () {
                    r(this).attr("src", "/statics/images/image48-9d05fa83eb.png")
                })
            },
            _renderAd: function () {
                var t = this;
                0 < this.$adCon.length && r.ajax({
                    url: "/index/advert",
                    type: "GET",
                    data: {
                        pageNum: 1,
                        pageSize: 25
                    },
                    success: function (e) {
                        var n = Handlebars.compile(window.CT.extraAdTmpl),
                            i = {
                                list: e
                            };
                        if (t.$adCon.html(n(i)), 1 < e.length) setInterval(function () {
                            t.curIdx < 4 ? t.curIdx++ : t.curIdx = 0, r(".ad-link").fadeOut(), r("#ad_link_" + t.curIdx).fadeIn()
                        }, 8e3)
                    },
                    error: function (e) {}
                })
            },
            _renderLink: function (n, e) {
                var i = this,
                    t = this.$extraLinks.length,
                    a = Handlebars.compile(window.CT.extraLinkTmpl),
                    s = i.preTime;
                if (0 < t)
                    if (i.extraLinkData[n].isGetData) {
                        if (e) {
                            var o = parseInt(s),
                                l = parseInt(n);
                            r(".con-" + n).css({
                                left: "8px"
                            }), o < l ? (r(".con-" + s).removeClass("slideOutLeft animated slideInRight slideOutRight slideInLeft").addClass("slideOutLeft animated"), r(".con-" + n).removeClass("slideOutLeft animated slideInRight slideOutRight slideInLeft").addClass("slideInRight animated")) : (r(".con-" + s).removeClass("slideOutLeft animated slideInRight slideOutRight slideInLeft").addClass("slideOutRight animated"), r(".con-" + n).removeClass("slideOutLeft animated slideInRight slideOutRight slideInLeft").addClass("slideInLeft animated"))
                        }
                    } else i.extraLinkInit && i.$linkLoading.show(), r.ajax({
                        url: "/top/" + n,
                        type: "GET",
                        data: {},
                        success: function (e) {
                            i.extraLinkData[n].list = e, i.extraLinkData[n].isGetData = !0, i.extraLinkInit && (i.extraLinkInit = !1), i.$linkLoading.hide(), r(".con-" + n).html(a(i.extraLinkData[n])).show(), i._bindLink()
                        },
                        error: function (e) {}
                    })
            },
            _bindLink: function () {
                r(".top-ten-matching-icon").on("error", function () {
                    r(this).attr("src", "/statics/images/error_icon-a76486aa5a.png")
                })
            },
            _renderTopic: function () {
                var t = this;
                0 < this.$extraTopic.length && (t.$extraTopic.hide(), t.$topicLoading.show(), r.ajax({
                    url: "/topic/5/top",
                    type: "GET",
                    data: {},
                    success: function (e) {
                        t.$topicLoading.hide();
                        var n = Handlebars.compile(window.CT.extraTopicTmpl),
                            i = {
                                list: e
                            };
                        t.$extraTopic.html(n(i)).show(), t._bindTopic()
                    },
                    error: function (e) {}
                }))
            },
            _bindTopic: function () {
                r(".person-avatar-icon").on("error", function () {
                    r(this).attr("src", "/statics/images/error_icon-a76486aa5a.png")
                })
            },
            _renderRecommendAttention: function (t) {
                var a = this;
                0 < this.$extraRecommend.length && (t && (a.$extraRecommend.hide(), a.$extraRecommendLoading.show()), r.ajax({
                    url: "/attention/recommend",
                    type: "GET",
                    data: {
                        afterTime: a.lastRecommend && a.lastRecommend.releaseCountOfOneYear ? a.lastRecommend.releaseCountOfOneYear : "",
                        count: 5
                    },
                    success: function (e) {
                        if (a.$extraRecommendLoading.hide(), 0 < e.length) {
                            var n = Handlebars.compile(window.CT.AttentionRecommendTmpl),
                                i = {
                                    list: e
                                };
                            a.lastRecommend = e[e.length - 1], a.$extraRecommendList.html(n(i)), a.$extraRecommend.show(), a.$changeAttentionBtn.css({
                                display: "block"
                            }), a._bindRecommendAttention()
                        } else a.$changeAttentionBtn.css({
                            display: "none"
                        });
                        t || a.$changeAttentionBtn.find(".refresh-icon").removeClass("active")
                    },
                    error: function (e) {
                        t || a.$changeAttentionBtn.find(".refresh-icon").removeClass("active")
                    }
                }))
            },
            _bindRecommendAttention: function () {
                r(".user-pic").on("error", function () {
                    r(this).attr("src", "/statics/images/image48-9d05fa83eb.png")
                })
            },
            _bindEvent: function () {
                var a = this;
                r("body").on("click", ".nav-li-extra", function (e) {
                    var n = r(this).find("a"),
                        i = n.data("time"),
                        t = n.hasClass("active");
                    a.preTime = r('.nav-li-extra a[class="active"]').data("time"), a.extraLinkData[i].isGetData && (t || (r(".nav-li-extra a").removeClass("active"), n.addClass("active"), a.currentTime = i, a._renderLink(i, !0)))
                }), r("body").on("click", ".another-batch", function (e) {
                    a.$changeAttentionBtn.find(".refresh-icon").addClass("active");
                    var n = setTimeout(function () {
                        clearTimeout(n), a._renderRecommendAttention(!1)
                    }, 1e3)
                }), r("body").on("click", ".user-items .user-btn", function (e) {
                    var n = r(e.currentTarget),
                        i = n.siblings(".concerned"),
                        t = n.siblings(".mutual"),
                        a = n.siblings(".unattention"),
                        s = n.data("jid"),
                        o = n.hasClass("unattention");
                    o && window.CT.doAttention({
                        jid: window.jid,
                        toJid: s
                    }, function (e) {
                        window.CT.showTopTips("success", e.info), n.hide(), 1 == e.attentState ? i.show() : 3 == e.attentState && t.show()
                    }), o || window.CT.cancelAttention({
                        jid: window.jid,
                        toJid: s
                    }, function (e) {
                        window.CT.showTopTips("success", e.info), n.hide(), a.show()
                    })
                }), r("body").on("click", ".topic-btn", function (e) {
                    e.stopPropagation();
                    var n = r(e.currentTarget),
                        i = n.siblings(".concerned"),
                        t = n.siblings(".unattention"),
                        a = n.data("topicId");
                    n.hasClass("unattention") ? window.CT.doTopicAttention({
                        id: a
                    }, function (e) {
                        window.CT.showTopTips("success", "关注成功"), n.hide(), i.show()
                    }) : window.CT.cancelTopicAttention({
                        id: a
                    }, function (e) {
                        window.CT.showTopTips("success", "取消成功"), n.hide(), t.show()
                    })
                });
                var e = r(".extra-report-container"),
                    n = r(".report-news-con"),
                    i = r(".report-child-con"),
                    t = 0;
                setInterval(function () {
                    ++t % 2 == 0 ? (e.append(i.clone()), e.animate({
                        top: "-44px"
                    }, function () {
                        r(".report-child-con").eq(0).remove(), e.css({
                            top: 0
                        })
                    })) : (e.append(n.clone()), e.animate({
                        top: "-44px"
                    }, function () {
                        r(".report-news-con").eq(0).remove(), e.css({
                            top: 0
                        })
                    }))
                }, 3e3)
            }
        }), new e
    }(jQuery),
    function (l) {
        function n(e) {
            return this.ele = e.ele, this.rules = e.rules, this.errorTips = e.errorTips, this.handle = i, this.errorList = [], this.newRules = [], this._init(), this
        }

        window.CT = window.hasOwnProperty("CT") ? window.CT : {};
        var i = {
            onfocusin: function (e, n) {
                this._check(e, n)
            },
            onfocusout: function (e, n) {
                this._check(e, n)
            },
            onkeyup: function (e, n) {
                this._check(e, n)
            },
            onclick: function (e, n) {
                this._check(e, n)
            },
            highlight: function (e, n) {},
            unhighlight: function (e, n) {}
        };
        l.extend(n.prototype, {
            _init: function () {
                var a = this;
                for (var e in a.rules)
                    for (var n = 0; n < a.rules[e].length; n++) a.newRules.push(l.extend({}, a.rules[e][n], {
                        obj: e
                    }));
                return l.each(a.newRules, function (i, t) {
                    l(a.ele).on(t.tigger, 'input[name="' + t.obj + '"]', function (e) {
                        var n = "on" + t.tigger;
                        a.handle[n] && a.handle[n].call(a, i, e)
                    })
                }), a
            },
            _alert: function (e) {
                var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                    i = l(".dialog-common-warn-tips");
                0 < n.length && (i = l(n).find(i)), e && t && (clearTimeout(t), i.text("")), i.text(e);
                var t = setTimeout(function () {
                    i.text("")
                }, 3e3)
            },
            _check: function (e, n) {
                var i = this,
                    t = n.target,
                    a = "text" === l(t).attr("type") ? l(t).val() : l(t).text(),
                    s = i.newRules[e],
                    o = Object.getOwnPropertyNames(s)[0];
                if (i._methods[o](a, n, s[o])) i.errorList[e] = l.extend({}, s, {
                    isVaildate: !0
                }), i._alert("");
                else {
                    if (0 == a.length && 0 < e) return i.errorList[e - 1] = l.extend({}, s, {
                        isVaildate: !1
                    }), i._alert(i.newRules[e - 1].messages), !1;
                    i._alert(s.messages), i.errorList[e] = l.extend({}, s, {
                        isVaildate: !1
                    })
                }
                return i
            },
            _methods: {
                required: function (e, n, i) {
                    return 0 < (e = e.trim()).length
                },
                email: function (e, n, i) {
                    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
                },
                url: function (e, n) {
                    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
                },
                number: function (e, n) {
                    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
                },
                digits: function (e, n) {
                    return /^\d+$/.test(e)
                },
                minlength: function (e, n, i) {
                    return e.length >= i
                },
                between: function (e, n, i) {
                    return e.length >= i[0] && e.length < i[1]
                },
                maxlength: function (e, n, i) {
                    return e.length <= i
                }
            }
        }), window.CT.fromCheck = function (e) {
            return new n(l.extend({}, e))
        }
    }(jQuery), jQuery, $(function () {
        function e() {
            this._init()
        }

        _.extend(e.prototype, {
            _init: function () {
                this._loginEvent(), this._hoverEvent(), this._searchEvent(), this._releaseEvent(), this._jumpEvent(), this._shareEvent(), this._userCardEvent(), this._sideTool(), this._previewImage(), this._previewCommentImage(), this._statistics(), this._task(), "true" == window.CT.getQueryString("showLogin") && window.CT.showLogin()
            },
            _releaseEvent: function () {
                // $(".publish-btn").click(function (e) {
                //     if (window.loginedUser) return window.CT.isBindPhone() && (window.CT.isUserBan() || (1 != window.loginedUser.complateReg ? window.CT.showRelease() : window.CT.showRegisterNext({
                //         modify: !0
                //     }))), !1;
                //     window.CT.showLogin()
                // })
            },
            _loginEvent: function () {
                $("#login_btn").click(function (e) {
                    window.CT.showLogin()
                }), $("body").on("click", ".logout", function (e) {
                    window.CT.doLogout({}, function (e) {})
                })
            },
            _searchEvent: function () {
                $(".search-icon").click(function () {
                    var e = "" + $(this).parent(".search").find(".search-input").val();
                    (e = e.replace(/\s*/g, "")) && window.open("/search?words=" + encodeURIComponent(e) + "&searchType=2", "_blank")
                }), $(".search-input").on("keyup", function (e) {
                    "13" == e.keyCode && $(".search-icon").click()
                })
            },
            _jumpEvent: function () {
                $("body").on("click", "span[data-jump]", function () {
                    var e = $(this).data("jump");
                    location.href = e
                }), $("body").on("click", "div[data-jump]", function () {
                    var e = $(this).data("jump");
                    location.href = e
                }), $("body").on("click", "img[data-jump]", function () {
                    var e = $(this).data("jump");
                    location.href = e
                }), $("body").on("click", "*[data-open]", function (e) {
                    e.stopPropagation();
                    var n = $(this),
                        i = n.data("open");
                    return !(!i || "javascript:;" == i) && !n.hasClass("img-comment") && void window.open(i, "_blank")
                })
            },
            _hoverEvent: function () {
                var n = $(".zone-area-btn"),
                    i = $(".zone-container"),
                    t = $(".discovery-area-btn"),
                    a = $(".discovery-container");
                n.on("click", function (e) {
                    e.stopPropagation(), a.hide(), t.removeClass("hover"), n.hasClass("hover") ? (i.hide(), n.removeClass("hover")) : (i.show(), n.addClass("hover"))
                }), t.on("click", function (e) {
                    e.stopPropagation(), i.hide(), n.removeClass("hover"), t.hasClass("hover") ? (a.hide(), t.removeClass("hover")) : (a.show(), t.addClass("hover"))
                }), $("body").on("click", function (e) {
                    i.hide(), n.removeClass("hover"), a.hide(), t.removeClass("hover")
                })
            },
            _shareEvent: function () {
                $("body").on("click", ".weibo-icon", function (e) {
                    var n = $(e.target).parents(".share"),
                        i = n.data("title"),
                        t = n.data("content"),
                        a = n.data("pic"),
                        s = (n.data("subject"), n.data("shortUrl"));
                    n.data("url"), window.CT.shareToSina({
                        title: i,
                        content: t,
                        pic: a,
                        url: s
                    })
                }), $("body").on("click", ".dou-icon", function (e) {
                    var n = $(e.target).parents(".share"),
                        i = n.data("title"),
                        t = n.data("content"),
                        a = n.data("pic"),
                        s = (n.data("subject"), n.data("shortUrl"));
                    n.data("url");
                    location.origin, window.CT.shareToDouban({
                        title: i,
                        content: t,
                        pic: a,
                        url: s
                    })
                }), $("body").on("click", ".qq-icon", function (e) {
                    var n = $(e.target).parents(".share"),
                        i = n.data("title"),
                        t = n.data("content"),
                        a = n.data("pic"),
                        s = (n.data("subject"), n.data("shortUrl"));
                    n.data("url");
                    location.origin, window.CT.shareToQQzone({
                        title: i,
                        content: t,
                        pic: a,
                        url: s
                    })
                }), window.CT.shareLink()
            },
            _userCardEvent: function () {
                $("body").on("click", ".author-hover-con .user-btn", function (e) {
                    e.stopPropagation(), e.preventDefault();
                    var n = $(e.currentTarget),
                        i = n.siblings(".concerned"),
                        t = n.siblings(".mutual"),
                        a = n.siblings(".unattention"),
                        s = n.data("jid"),
                        o = n.hasClass("unattention");
                    o && window.CT.doAttention({
                        jid: window.jid,
                        toJid: s
                    }, function (e) {
                        window.CT.showTopTips("success", e.info), n.hide(), 1 == e.attentState ? i.show() : 3 == e.attentState && t.show()
                    }), o || window.CT.cancelAttention({
                        jid: window.jid,
                        toJid: s
                    }, function (e) {
                        window.CT.showTopTips("success", e.info), n.hide(), a.show()
                    })
                })
            },
            _sideTool: function () {
                window.scrollTo(0, 0), $(".ad-con").offset(), $("body").on("click", ".back-top", function () {
                    return $("html,body").animate({
                        scrollTop: 0
                    }, 500), !1
                }), $(window).scroll(function () {
                    if (0 < $(window).scrollTop()) {
                        if ($(".header-fix").addClass("header-fix-shadow"), $(".discovery-header-fix .discovery-header").addClass("discovery-header-shadow"), 500 < $(window).scrollTop() ? $(".side-tool .back-top").show() : $(".side-tool .back-top").hide(), $(".tiny-container").length) {
                            var e = $(".tiny-container").offset().top;
                            $(window).scrollTop() > e ? $(".tiny-container .sub").addClass("personal-nav-fixed") : $(".tiny-container .sub").removeClass("personal-nav-fixed")
                        }
                    } else $(".header-fix").removeClass("header-fix-shadow"), $(".discovery-header-fix .discovery-header").removeClass("discovery-header-shadow"), $(".tiny-container .sub").removeClass("personal-nav-fixed"), $(".side-tool .back-top").hide()
                })
            },
            _previewCommentImage: function () {
                $("body").on("click", ".img-comment", function (e) {
                    e.stopPropagation(), e.preventDefault();
                    var n = $(this),
                        i = [n.data("open") || n.data("pic")];
                    window.CT.preview({
                        previews: i,
                        current: 0
                    })
                }), $("body").on("click", ".common-matching-con", function (e) {
                    e.stopPropagation(), e.preventDefault();
                    var n = $(this),
                        i = n.data("open") || n.data("pic"),
                        t = n.data("matching"),
                        a = [i];
                    i ? window.CT.preview({
                        previews: a,
                        current: 0
                    }) : t && "javascript:;" != t && window.open(t, "_blank;")
                })
            },
            _previewImage: function () {
                $("body").on("click", ".images-con .image-item", function (e) {
                    e.preventDefault(), e.stopPropagation();
                    var n = $(e.target),
                        i = n.data("current"),
                        t = n.parents(".images-con").data("previews");
                    "string" == typeof t && (t = t.split(",")), window.CT.preview({
                        previews: t,
                        current: i
                    })
                }), $("body").on("click", ".images-con .prev-icon", function (e) {
                    var n = $(e.target).parents(".images-con"),
                        i = n.find(".images-container"),
                        t = n.find(".prev-icon"),
                        a = n.find(".next-icon"),
                        s = (i.data("total"), i.data("current"));
                    if (!(0 < s)) return t.hide(), !1;
                    a.show(), s -= 1, i.css({
                        left: -206 * s + "px"
                    }), i.data("current", s), 0 === s && t.hide()
                }), $("body").on("click", ".images-con .next-icon", function (e) {
                    var n = $(e.target).parents(".images-con"),
                        i = n.find(".images-container"),
                        t = n.find(".prev-icon"),
                        a = n.find(".next-icon"),
                        s = i.data("total") - 4,
                        o = i.data("current");
                    if (!(o < s)) return a.hide(), !1;
                    t.show(), o += 1, i.css({
                        left: -206 * o + "px"
                    }), i.data("current", o), o === s && a.hide()
                })
            },
            _updateCommentTime: function () {
                $(".comment-time").each(function (e, n) {
                    var i = $(n),
                        t = i.data("time"),
                        a = window.CT.getCommentDifferTime(t);
                    i.text(a + "评论")
                })
            },
            _updateLinkTime: function () {
                $(".time-update").each(function (e, n) {
                    var i = $(n),
                        t = i.data("time"),
                        a = window.CT.getDifferTime(t);
                    i.text(a)
                })
            },
            _task: function () {
                var e = this;
                setInterval(function () {
                    e._updateCommentTime(), e._updateLinkTime()
                }, 6e4)
            },
            _statistics: function () {
                $("body").on("click", ".link-statistics", function (e) {
                    var n = $(this).data("id");
                    window.CT.linkStatistics(n)
                }), $("body").on("click", ".weibo-icon", function (e) {
                    var n = $(e.target).parents(".share").data("id");
                    window.CT.linkStatistics(n, 1)
                }), $("body").on("click", ".dou-icon", function (e) {
                    var n = $(e.target).parents(".share").data("id");
                    window.CT.linkStatistics(n, 2)
                }), $("body").on("click", ".qq-icon", function (e) {
                    var n = $(e.target).parents(".share").data("id");
                    window.CT.linkStatistics(n, 3)
                })
            },
            _bindKeyComb: function () {
                $(document).keydown(function (e) {
                    e.ctrlKey && 13 == e.keyCode && ($(".comment-item-btn").click(), $(".comment-btn").click())
                })
            }
        }), new e
    }),
    function (d) {
        var e = window.CT.config,
            s = e.areas,
            m = e.dialogAlert,
            n = window.CT.regex,
            i = n.regMobile,
            t = n.regPassword,
            p = {
                password: function (e) {
                    return e.password && 0 != e.password.length ? !!t.test(e.password) || (m("密码6~16位数字、大小写字母或常用符号", 1), !1) : (m("密码不能为空", 1), !1)
                },
                username: function (e) {
                    return !(!e.username || 0 == e.username.length) || (m("用户名不能为空", 1), !1)
                }
            },
            a = function () {
                function n(e) {
                    _classCallCheck(this, n), this.$dialogDom = d(".login-dialog"), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, this.type = "phone", this.options = e, this._init(), this.state = {
                        captchaIns: "",
                        NECaptchaValidate: "",
                        regUserName: /^(\w){6,16}$/,
                        params: {}
                    }
                }

                return _createClass(n, [{
                    key: "_filterUrl",
                    value: function () {
                        var e = window.location.search.slice(1).split("&"),
                            n = window.location.origin,
                            i = window.location.pathname;
                        if (1 == e.length && "" == e[0]) return n + i;
                        var t = e.indexOf("showLogin=true"); -
                        1 !== t && e.splice(t, 1);
                        var a = e.join(",").replace(/,/g, "&");
                        return a ? n + i + "?" + a : n + i
                    }
                }, {
                    key: "_init",
                    value: function () {
                        this._render()
                    }
                }, {
                    key: "_render",
                    value: function () {
                        var e = this,
                            n = e.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), d("body").css("overflow", "hidden"), 0 < n) e.$dialogDom.addClass(e.options.showClass ? e.options.showClass : "scaleIn").removeClass("scaleOut").show();
                        else {
                            var i = Handlebars.compile('\n        <div class="login-dialog dialog animated2">\n            <img class="close-icon" src="/statics/images/close-8809a1ad23.png" />\n            <div class="auto-center">\n                <div class="login-head">\n                  <img src="/statics/images/Line-3-6@2x-ea9450509e.png" alt="">\n                  <span class="title">不正经的资讯社区</span>\n                  <img src="/statics/images/Line-3-7@2x-3e1c54cdb1.png" alt="">\n                </div>\n                <div class="login-type">\n                  <a class="link-normal active" href="javascript:;">邮箱登录</a>\n                  <a class="link-normal username-login" href="javascript:;" data-type="username">用户名登录</a>\n                </div>\n <form action="/login" method="post">                <div class="login-body">\n                    <div class="form-item login-item clearfix phone-item mt24">\n                        <div class="select-con left">\n                            <ul style="width: 140%" class="select-ul">\n                             {{#each areas}}\n                                <li class="select-li" data-id=+{{id}} data-value={{name}}+{{id}}><span>{{name}}+{{id}}</span></li>\n                              {{/each}}\n                            </ul>\n                        </div>\n                        <div class="input-item input-item-short left clearfix" style="width: 342px;">\n                            <input type="text"  class="input" name="email" placeholder="邮箱" value="" />\n                        </div>\n                    </div>\n        \n                    <div class="form-item login-item clearfix username-item mt24">\n                        <div class="input-item left clearfix">\n                            <input type="text" class="input user-name" name="username" placeholder="用户名" />\n                        </div>\n                    </div>\n                </div>\n                <form class="login-footer">\n                    <div class="form-item login-item clearfix mt24">\n                        <div class="input-item left clearfix">\n                            <input type="password" maxlength="16" class="input pwd-input pwd-input-active pwd-password-input" name="password" placeholder="密码"  />\n                                                        <img src="/statics/images/eyes@2x-58efb50695.png" alt="" class="eyes-icon eye-close">\n                            <img src="/statics/images/eye-close-ced302b9c0.png" alt="" class="eyes-icon eye-open">\n                        </div>\n                    </div>\n                      \n       \n                    <div id="captcha" class="mt18"></div>\x3c!--网易易盾--\x3e\n                    <div class="form-item mt24 clearfix">\n                        <div class="new-dialog-tips dialog-common-warn-tips" style="float: left;"></div> \x3c!--错误提示--\x3e\n                        <div class="right">\n                        <a href="/resetpwd/init" target="_blank" class="link-normal link-active forget-tips">忘记密码?</a>\n                        </div>\n                    </div>\n                  \n                    <div class="form-item mt24">\n                        <input type="hidden" name="captchaId" id="captchaId" value="474417edadf3452fa78306837a94b428">\n                        <button type="submit" class="btn-large login-btn">登录</button>\n                    </div>\n   </form>                 \n                    <div class="form-item mt24 center">\n                        <div class="bottom-tips">\n                        还没加入抽屉？马上去<a href="javascript:;" class="link-normal link-active open-register-dialog">注册</a>\n                        </div>\n                    </div>\n                    \n                </div>\n              </div>\n        </div>'),
                                t = {
                                    areas: s
                                };
                            d("body").append(i(t)), e.$dialogDom = d(".login-dialog"), window.CT.setPosition(d(".login-dialog")), d(".login-dialog").addClass("scaleIn").show();
                            var a = d("#captchaId");
                            a.length && (d("input[name='captchaId']").val("474417edadf3452fa78306837a94b428"), e._getAmapuiPromise(a))
                        }
                        d(".login-phone").on("propertychange input", function (e) {
                            var n = d(e.target),
                                i = n.parent().siblings().find(".select-value").data("id"),
                                t = n.val();
                            "+86" == i && d(".login-phone").attr("maxlength", 11).val(t.replace(/[^\d]/g, ""))
                        }), e._bindEvents()
                    }
                }, {
                    key: "_clearInput",
                    value: function () {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
                            n = this,
                            i = n.$dialogDom;
                        if (n.state.params = {}, n.state.NECaptchaValidate = "", i.find("input[name=phone]").val(""), i.find("input[name=username]").val(""), i.find(".pwd-text-input").val("").hide(), i.find(".pwd-password-input").val("").show(), i.find(".select-value").data("id", "+86").text("中国+86"), i.find(".eye-open").hide(), i.find(".eye-close").show(), i.find(".login-body").show(), e) {
                            e.addClass("active").siblings().removeClass("active"), n.type = e.data("type");
                            var t = e.index();
                            i.find(".login-body .form-item").hide().eq(t).show()
                        } else i.find(".login-type a").eq(0).addClass("active").siblings().removeClass("active"), n.type = "phone", i.find(".login-body .form-item").hide().eq(0).show()
                    }
                }, {
                    key: "_getAmapuiPromise",
                    value: function (e) {
                        var i = this;
                        initNECaptcha({
                            element: e,
                            captchaId: "474417edadf3452fa78306837a94b428",
                            enableClose: !0,
                            mode: "bind",
                            width: "344px",
                            height: "42px",
                            onVerify: function (e, n) {
                                if (e) return !1;
                                n && n.validate && (i.state.params.NECaptchaValidate = n.validate, i.state.captchaIns.close(), i._login(i.state.params), i.state.captchaIns && i.state.captchaIns.refresh())
                            }
                        }, function (e) {
                            i.state.captchaIns = e
                        }, function (e) {})
                    }
                }, {
                    key: "_login",
                    value: function (e) {
                        var i = this;
                        d.ajax({
                            url: "/login",
                            type: "POST",
                            customize: !0,
                            data: e,
                            success: function (e) {
                                d(".login-btn").attr("disabled", !0);
                                var n = i._filterUrl();
                                if (-1 !== n.indexOf("resetpwd")) return !(window.location.href = "/");
                                window.location.href = n || "/", setTimeout(function () {
                                    i._clearInput()
                                }, 2e3)
                            },
                            error: function (e) {
                                m(e.msg, 1), d(".login-btn").attr("disabled", !1), i.state.captchaIns && i.state.captchaIns.refresh()
                            }
                        })
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var l = this,
                            i = l.$dialogDom,
                            t = i.find(".eye-open"),
                            a = i.find(".eye-close"),
                            s = i.find(".pwd-password-input"),
                            o = i.find(".pwd-text-input"),
                            r = i.find(".login-phone"),
                            c = i.find(".user-name");
                        i.on("click", ".close-icon", function (e) {
                            d("body").css("overflow", "auto"), d(window).scrollTop(l.curScrollTop), i.removeClass("animated2 scaleInY scaleIn").addClass("animated2 scaleOut");
                            var n = setTimeout(function () {
                                i.hide(), window.CT.hideMask(), clearTimeout(n)
                            }, 300);
                            l._clearInput()
                        }), i.on("click", ".open-register-dialog", function (e) {
                            window.CT.hideDialog(), window.CT.showRegister(), l._clearInput()
                        }), i.on("click", ".login-type a", function (e) {
                            m("");
                            var n = d(e.target);
                            l._clearInput(n)
                        }), i.on("click", ".eye-close", function (e) {
                            a.hide(), t.show();
                            var n = s.val();
                            s.hide().removeClass("pwd-input-active"), o.val(n).show().addClass("pwd-input-active")
                        }), i.on("click", ".eye-open", function (e) {
                            t.hide(), a.show();
                            var n = o.val();
                            o.hide().removeClass("pwd-input-active"), s.val(n).show().addClass("pwd-input-active")
                        }), i.on("blur", "input", function (e) {
                            var n, i = d(e.target),
                                t = i.val().trim(),
                                a = i.attr("name"),
                                s = "+" + d(".login-dialog .select-value").text().split("+")[1];
                            p[a]((_defineProperty(n = {}, a, t), _defineProperty(n, "prefix", s), n))
                        }), i.on("click", ".select-li", function (e) {
                            "+86" !== d(this).data("id") ? d(".login-phone").removeAttr("maxlength") : d(".login-phone").attr("maxlength", 11)
                        }), i.on("click", ".login-btn", function (e) {
                            var n = l.type,
                                i = r.val().trim(),
                                t = c.val().trim(),
                                a = d(".pwd-input-active").val().trim(),
                                s = "+" + d(".login-dialog .select-value").text().split("+")[1],
                                o = {
                                    password: a
                                };
                            if ("phone" === n) {
                                if (!p.phone({
                                        phone: i,
                                        prefix: s
                                    })) return !1;
                                o.loginType = 2, o.phone = s + i
                            } else {
                                if (!p.username({
                                        username: t
                                    })) return !1;
                                o.loginType = 1, o.jid = t
                            }
                            if (!p.password({
                                    password: a
                                })) return !1;
                            l.state.params = o, d(".login-btn").attr("disabled", !0), l.state.captchaIns && l.state.captchaIns.verify()
                        }), i.on("keydown", function (e) {
                            13 == e.keyCode && d(".login-dialog .login-btn").click()
                        })
                    }
                }]), n
            }();
        window.CT.showLogin = function (e) {
            m("");
            return new a(_.extend({}, {}, e))
        }
    }(jQuery),
    function () {
        var n = new(function () {
            function e() {
                _classCallCheck(this, e), this.$loading = $(".notice-loading-more"), this.$msgCon = $(".msg-outer-con"), this.$newDot = $(".new-dot"), this.$noticeIcon = $(".notice-icon"), this._init()
            }

            return _createClass(e, [{
                key: "_init",
                value: function () {
                    window.jid && this._getNotice()
                }
            }, {
                key: "_getNotice",
                value: function () {
                    var i = this;
                    $.ajax({
                        url: "/notice/index",
                        type: "GET",
                        data: {
                            pageSize: 3
                        },
                        success: function (e) {
                            i.$loading.hide(), e.windowJid = window.jid, e.comments && 0 < e.comments.length ? (e.hasComments = !0, e.comments.forEach(function (e) {
                                e.isDissentTag = !(2 == e.action || !e.dissentTag), 2 === e.commentsType ? e.isComment = !0 : e.isComment = !1
                            })) : e.hasComments = !1;
                            var n = Handlebars.compile('\n        <span class="msg-con">\n            <img src="/statics/images/white-angle-b653d167a1.png" alt="" class="white-angle">\n            <span class="msg-block title-con clearfix">\n                <a class="title left" href="/message/comment">评论 {{#if noticeNum.commentsCount}}<span class="comment-num">{{noticeNum.commentsCount}}</span>{{/if}}</a>\n                <a href="/notify" class="setting right">设置</a>\n                {{#if noticeNum.attentionCount}}<a class="new-attention right" href="/attention/fans/{{windowJid}}" >{{noticeNum.attentionCount}}个新关注</a>{{/if}}\n            </span>\n            {{#if hasComments}}\n            {{#each comments}}\n                <span class="msg-block comment-item clearfix" >\n                    <span class="comment-title-con msg-block clearfix" data-jump="/publish/links/{{fromUser.jid}}">\n                        <span class="comment-title left" >{{fromUser.nick}}</span>\n                        <span class="comment-time right" data-time="{{createTime}}">{{timeagoComment createTime}}</span>\n                    </span>\n                    <span class="comment-des-con msg-block clearfix" data-jump="/message/comment">\n                    \x3c!--data-jump="/link/{{links.id}}"--\x3e\n                    {{#if isComment}}\n                     <span class="source-from left">评论了你:</span>{{else}} <span class="source-from left">回复了你:</span>\n                    {{/if}}                       \n                        <span class="source-content left" style="word-break: break-all">\n                            {{#if isDissentTag}}\n                                <span class="dissentTag">{{dissentTag}}</span>\n                            {{/if}}\n                        {{{content}}}\n                        {{#if commentVo.pictureUrl}}[图片]{{/if}}\n                        </span>\n                    </span>\n                </span>\n            {{/each}}\n            {{/if}}\n            {{#unless hasComments}}\n                <span class="notice-tips">还没有新的评论消息~</span>\n            {{/unless}}    \n            {{#if hasComments}}\n                <span class="msg-block comment-all clearfix">\n                <img src="/statics/images/double-arrow-73d31c254d.png" alt="" class="double-arrow-icon right">\n                <span class="comment-all-text right"  data-jump="/message/comment">查看全部</span>\n                </span>\n            {{/if}}\n            <span class="notify-con clearfix">\n            <a class="notify left"  href="/message/notice">\n                通知 {{#if noticeNum.adviceCount}}<span class="notify-num">{{noticeNum.adviceCount}}</span>{{/if}}\n            </a>\n            <a class="feed right"  href="/dynamic/all">\n                动态 {{#if noticeNum.dynamicFlag}}<span class="feed-dot"></span>{{/if}}\n            </a>\n            </span>\n\n        </span>\n    ');
                            i.$msgCon.html(n(e)).show(), 0 < e.totalCount ? i.$newDot.css("display", "inline-block") : i.$newDot.css("display", "none")
                        },
                        error: function (e) {}
                    })
                }
            }]), e
        }());
        window.CT.fetchNotify = function (e) {
            return n._init()
        }
    }(jQuery),
    function () {
        var e = window.CT.config,
            s = e.areas,
            d = e.dialogAlert,
            n = window.CT.regex,
            i = n.regMobile,
            t = n.regPassword,
            a = {},
            m = {
                password: function (e) {
                    return e.password && 0 != e.password.length ? !!t.test(e.password) || (d("密码6~16位数字、大小写字母或常用符号", 1), !1) : (d("密码不能为空", 1), !1)
                },
                username: function (e) {
                    return !(!e.username || 0 == e.username.length) || (d("用户名不能为空", 1), !1)
                },
                sms: function (e) {
                    return e.sms && 0 != e.sms.length ? 4 === e.sms.length || (d("邮箱验证码位数不正确", 1), !1) : (d("邮箱验证码不能为空", 1), !1)
                }
            },
            o = function () {
                function n(e) {
                    _classCallCheck(this, n), this.$dialogDom = $(".register-dialog"), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, this.state = {
                        captchaIns: "",
                        NECaptchaValidate: "",
                        params: {},
                        timer: null
                    }, this._init()
                }

                return _createClass(n, [{
                    key: "_getAmapuiPromise",
                    value: function (e) {
                        var i = this;
                        initNECaptcha({
                            element: e,
                            captchaId: "474417edadf3452fa78306837a94b428",
                            mode: "bind",
                            width: "344px",
                            height: "42px",
                            enableClose: !0,
                            onVerify: function (e, n) {
                                if (e) return !1;
                                n && n.validate && (i.state.params.NECaptchaValidate = n.validate, i.state.captchaIns.close(), "sms" == i.state.params.msgType && i._countDown(), i._sendCode(i.state.params), i.state.captchaIns && i.state.captchaIns.refresh())
                            }
                        }, function (e) {
                            i.state.captchaIns = e
                        }, function (e) {})
                    }
                }, {
                    key: "_countDown",
                    value: function () {
                        var e = this,
                            n = e.state,
                            i = 59;
                        e.state.timer = setInterval(function () {
                            i <= 0 ? ($(".register-validate-code").text("重新获取").removeAttr("disabled"), $(".voice-code").attr("disabled", !1), e.state.captchaIns && e.state.captchaIns.refresh(), clearInterval(n.timer)) : ($(".register-validate-code").attr("disabled", !0).text("".concat(i--, "s")), $(".voice-code").attr("disabled", !0))
                        }, 1e3)
                    }
                }, {
                    key: "_sendCode",
                    value: function (e, n) {
                        var i = this.state;
                        $.ajax({
                            url: "/send/verify/code",
                            type: "POST",
                            customize: !0,
                            data: e,
                            success: function (e) {
                                d(e.msg, 1)
                            },
                            error: function (e) {
                                i.timer && clearInterval(i.timer), i.captchaIns && i.captchaIns.refresh(), d(e.msg, 1)
                            }
                        })
                    }
                }, {
                    key: "_init",
                    value: function () {
                        this._render()
                    }
                }, {
                    key: "_render",
                    value: function () {
                        var e = this,
                            n = e.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, $("body").css("overflow", "hidden"), 0 < n) e.$dialogDom.removeClass("scaleOut").addClass("scaleInY").show();
                        else {
                            var i = Handlebars.compile('\n            <div class="register-dialog dialog animated2">\n                <img class="close-icon" src="/statics/images/close-8809a1ad23.png"/>\n                <div class="auto-center">\n                <div class="login-head">\n                    <img src="/statics/images/Line-3-6@2x-ea9450509e.png" alt="">\n                    <span class="title">注册开启抽友身份</span>\n                    <img src="/statics/images/Line-3-7@2x-3e1c54cdb1.png" alt="">\n                </div>\n        \n                ' +
                                    '<div class="set-phone-number">\n  <form action="/signin" method="post">                 <div class="login-body">\n                        <div class="form-item login-item clearfix phone-item mt24">\n                            <div class="select-con left">\n                                <ul class="select-ul" style="width: 140%">\n                                    {{#each areas}}\n                                    <li class="select-li" data-id=+{{id}} data-value={{name}}+{{id}}><span>{{name}}+{{id}}</span></li>\n                                    {{/each}}\n        \n                                </ul>\n                            </div>\n                            <div class="input-item input-item-short left clearfix" style="width: 342px;">\n                                <input  class="input register-phone" placeholder="邮箱" name="email" value="" />\n                            </div>\n                        </div>\n                    </div>\n                    <div class="login-footer">\n        \n                        \x3c!--网易易盾--\x3e\n                        <div id="regsiter-captcha" style="display: none" class="mt18"></div>\n        \n                        <div class="form-item clearfix mt24">\n                            <div class="sms-item left">\n                                <div class="input-item  dialog-sms-input-item">\n                                    <input type="number" id="dialog-sms-input" name="sms" maxlength="6" class="input dialog-sms-input"\n                                           placeholder="邮箱验证码"/>\n                                </div>\n                            </div>\n                            <button href="javascript:;" class="btn-large register-validate-code right">发送验证码</button>\n                        </div>\n                        <div class="form-item mt18 clearfix">\n                            <div class="login-tips-con right">\n                                                                   </div>\n                        </div>\n                        <div class="form-item login-item clearfix mt24">\n                            <div class="input-item left clearfix">\n                                <input type="password" maxlength="16" class="input pwd-input pwd-input-active pwd-password-input" name="password" placeholder="密码6~16位数字、大小写字母或常用符号"  />\n                                                        \n                                <img src="/statics/images/eyes@2x-58efb50695.png" alt="" class="eyes-icon eye-close">\n                                <img src="/statics/images/eye-close-ced302b9c0.png" alt="" class="eyes-icon eye-open">\n                            </div>\n                        </div>\n                        \x3c!--错误提示--\x3e\n                        <div class="dialog-common-warn-tips mt12" style="height: 22px;"></div>\n                        <div class="form-item mt12">\n                        <input type="hidden" id="captchaId" name="captchaId" value="474417edadf3452fa78306837a94b428">\n                            <button type="submit" class="btn dialog-pre-register-btn" ">下一步</button>\n                        </div>\n </form>                       <div class="form-item mt24 center">\n                            <div class="bottom-tips">\n                                已经是抽友？马上去<a href="javascript:;" class="link-normal link-active open-login-dialog">登录</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n            </div>'),
                                t = {
                                    areas: s
                                };
                            $("body").append(i(t)), e.$dialogDom = $(".register-dialog"), window.CT.setPosition($(".register-dialog")), $(".register-dialog").addClass("scaleInY").show();
                            var a = $(".register-dialog #captchaId");
                            a.length && ($("input[name='captchaId']").val("474417edadf3452fa78306837a94b428"), e._getAmapuiPromise(a))
                        }
                        e._bindEvents()
                    }
                }, {
                    key: "_clearInput",
                    value: function () {
                        var e = this,
                            n = e.$dialogDom;
                        e.state.params = {}, e.state.NECaptchaValidate = "", clearInterval(e.state.timer), n.find("input[name=phone]").val(""), n.find("input[name=sms]").val(""), n.find(".pwd-text-input").val("").hide(), n.find(".pwd-password-input").val("").show(), n.find(".select-value").data("id", "+86").text("中国+86"), n.find(".eye-open").hide(), n.find(".eye-close").show(), n.find(".register-validate-code").removeAttr("disabled").text("发送验证码"), n.find(".voice-code").removeAttr("disabled"), e.state.captchaIns && e.state.captchaIns.refresh()
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var o = this,
                            l = o.$dialogDom,
                            i = l.find(".eye-open"),
                            t = l.find(".eye-close"),
                            a = l.find(".pwd-password-input"),
                            s = l.find(".pwd-text-input"),
                            r = l.find(".register-phone"),
                            c = l.find("#dialog-sms-input");
                        l.on("click", ".close-icon", function (e) {
                            $("body").css("overflow", "auto"), $(window).scrollTop(o.curScrollTop), o.state.timer && clearInterval(o.state.timer), l.removeClass("animated2 scaleInY scaleIn").addClass("animated2 scaleOut");
                            var n = setTimeout(function () {
                                l.hide(), window.CT.hideMask(), clearTimeout(n)
                            }, 300);
                            o._clearInput()
                        }), l.on("click", ".open-login-dialog", function (e) {
                            window.CT.hideDialog(), window.CT.showLogin({
                                showClass: "scaleInY"
                            }), o._clearInput()
                        }), l.on("click", ".eye-close", function (e) {
                            t.hide(), i.show();
                            var n = a.val();
                            a.hide().removeClass("pwd-input-active"), s.val(n).show().addClass("pwd-input-active")
                        }), l.on("click", ".eye-open", function (e) {
                            i.hide(), t.show();
                            var n = s.val();
                            s.hide().removeClass("pwd-input-active"), a.val(n).show().addClass("pwd-input-active")
                        }), l.on("click", ".register-validate-code", function (e) {
                            var n = r.val().trim(),
                                i = "+" + $(".register-dialog .select-value").text().split("+")[1];
                            if (!m.phone({
                                    phone: n,
                                    prefix: i
                                })) return !1;
                            var t = {
                                codeType: "register",
                                msgType: "sms",
                                phone: i + n
                            };
                            o.state.params = t, o.state.captchaIns && o.state.captchaIns.verify()
                        }), l.on("click", ".voice-code", function (e) {
                            var n = r.val().trim(),
                                i = "+" + $(".register-dialog .select-value").text().split("+")[1];
                            if (!m.phone({
                                    phone: n,
                                    prefix: i
                                })) return !1;
                            var t = {
                                codeType: "register",
                                msgType: "voice",
                                phone: i + n
                            };
                            o.state.captchaIns && o.state.captchaIns.verify(), o.state.params = t
                        }), l.on("click", ".select-li", function (e) {
                            "+86" === $(this).data("id") ? r.attr("oninput", "if(value.length>11)value=value.slice(0,11)") : r.removeAttr("oninput")
                        }), l.on("blur", "input", function (e) {
                            var n, i = $(e.target),
                                t = i.val().trim(),
                                a = i.attr("name"),
                                s = "+" + $(".login-dialog .select-value").text().split("+")[1];
                            m[a]((_defineProperty(n = {}, a, t), _defineProperty(n, "prefix", s), n))
                        }), l.on("click", ".dialog-pre-register-btn", function (e) {
                            var n = r.val().trim(),
                                i = c.val().trim(),
                                t = l.find(".pwd-input-active").val().trim(),
                                a = "+" + $(".register-dialog .select-value").text().split("+")[1];
                            if (!m.phone({
                                    phone: n,
                                    prefix: a
                                })) return !1;
                            if (!m.sms({
                                    sms: i
                                })) return !1;
                            if (!m.password({
                                    password: t
                                })) return !1;
                            var s = {
                                newPwd: t,
                                phone: a + n,
                                verifyCode: i,
                                modify: !1
                            };
                            $.ajax({
                                url: "/pre/register",
                                type: "POST",
                                customize: !0,
                                data: s,
                                success: function (e) {
                                    window.CT.showRegisterNext(s), o._clearInput()
                                },
                                error: function (e) {
                                    o.state.captchaIns && o.state.captchaIns.refresh(), d(e.msg, 1)
                                }
                            })
                        }), l.on("keydown", function (e) {
                            13 == e.keyCode && $(".register-dialog .dialog-pre-register-btn").click()
                        })
                    }
                }]), n
            }();
        window.CT.showRegister = function (e) {
            return d(""), new o(_.extend({}, a, e))
        }
    }(jQuery),
    function () {
        var _window$CT$config3 = window.CT.config,
            areas = _window$CT$config3.areas,
            cityJson = _window$CT$config3.cityJson,
            dialogAlert = _window$CT$config3.dialogAlert,
            tipsType = 1,
            defaults = {},
            check = {
                nick: function (e) {
                    return 0 == e.nick.length ? (dialogAlert("昵称有点不对劲", tipsType), !1) : !!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(e.nick) || (dialogAlert("昵称只支持中英文、数字和下划线", tipsType), !1)
                },
                password: function (e) {
                    return e.password && 0 != e.password.length ? !!regPassword.test(e.password) || (dialogAlert("密码6~16位数字、大小写字母或常用符号", tipsType), !1) : (dialogAlert("密码不能为空", tipsType), !1)
                },
                username: function (e) {
                    return !(!e.username || 0 == e.username.length) || (dialogAlert("用户名不能为空", tipsType), !1)
                }
            },
            dialogTmpl = '\n            <div class="register-next-dialog dialog animated2">\n                <img class="close-icon" src="/statics/images/close-8809a1ad23.png"/>\n                <div class="auto-center">\n                <div class="login-head">\n                    <img src="/statics/images/Line-3-6@2x-ea9450509e.png" alt="">\n                    <span class="title">完善抽友名片</span>\n                    <img src="/statics/images/Line-3-7@2x-3e1c54cdb1.png" alt="">\n                </div>\n                <div class="login-body">\n                    <div class="form-item login-item clearfix mt24">\n                        <div class="input-item left clearfix">\n                            <input type="text" maxlength="10" class="input register-username" placeholder="设置你的专属昵称"/>\n                        </div>\n                    </div>\n                    <div class="form-item mt24">\n                        <a class="reciprocity active" data-id="false">女</a>\n                        <a class="reciprocity"data-id="true">男</a>\n        \n                    </div>\n                    <div class="form-item">\n        \n                        <div class="area">\n                            <div class="select-con left">\n                                <div class="select-current select-country clearfix register-check-city">\n                                    <span class="current-country select-value" >北京</span>\n                                    <img src="/statics/images/triangle2-c9486adb57.png" class="select-icon"/>\n                                </div>\n                                <ul class="select-ul" id="select-city">\n                                    {{#each cityJson.citys}}\n                                       <li class="select-li" data-id={{id}} data-value={{name}}><span>{{name}}</span></li>\n                                    {{/each}}\n                                </ul>\n                            </div>\n        \n                        </div>\n        \n                        <div class="area">\n                            <div class="select-con left">\n                                <div class="select-current select-country clearfix register-check-area">\n                                    <span class="current-country select-value" data-id="1">北京</span>\n                                    <img src="/statics/images/triangle2-c9486adb57.png" class="select-icon"/>\n                                </div>\n                                 <ul class="select-ul" id="render-area"></ul>\n        \n                            </div>\n                        </div>\n        \n                    </div>\n                    <div class="form-item login-item clearfix mt24">\n                        <div class="input-item left clearfix">\n                            <input type="text" maxlength="20" class="input register-sign"\n                                   placeholder="说说你将是怎样的一位抽友……"/>\n                        </div>\n                    </div>\n                    \x3c!--错误提示--\x3e\n                    <div class="dialog-common-warn-tips mt12"></div>\n                      <div class="agree mt24">\n                         <span class="dialog-tips">注册代表你已阅读并同意\n                                <a href="/service" target="_blank" class="link-normal link-active">服务条款</a>及\n                                <a href="/privacy" target="_blank" class="link-normal link-active">隐私政策</a>\n                            </span>\n        \n                    </div>\n        \n        \n                    <div class="form-item mt12">\n                            <a href="javascript:;" class="btn-large dialog-register-btn">注册</a>\n                             <div class="bottom-tips">\n                                已经是抽友？马上去<a href="javascript:;" class="link-normal link-active open-login-dialog">登录</a>\n                            </div>\n                    </div>\n        \n        \n                </div>\n                </div>\n            </div>',
            RegisterNextDialog = function () {
                function RegisterNextDialog(e) {
                    _classCallCheck(this, RegisterNextDialog), this.options = e, this.$dialogDom = $(".register-next-dialog"), this.state = {
                        phone: e.phone,
                        password: e.newPwd,
                        modify: e.modify || !1
                    }, this._init()
                }

                return _createClass(RegisterNextDialog, [{
                    key: "_init",
                    value: function () {
                        this._render()
                    }
                }, {
                    key: "_render",
                    value: function _render() {
                        var self = this,
                            len = self.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), $("body").css("overflow", "hidden"), 0 < len) self.$dialogDom.removeClass("scaleOut").addClass("scaleInY").show();
                        else {
                            var template = Handlebars.compile(dialogTmpl),
                                context = {
                                    areas: areas,
                                    cityJson: eval(cityJson)
                                };
                            $("body").append(template(context)), self.$dialogDom = $(".register-next-dialog"), window.CT.setPosition($(".register-next-dialog")), $(".register-next-dialog").addClass("scaleInY").show()
                        }
                        self.state.modify && ($(".agree").hide(), $(".bottom-tips").hide(), $(".dialog-register-btn").text("提交资料")), self._bindEvents()
                    }
                }, {
                    key: "_refreshArea",
                    value: function (i) {
                        for (var e = "", n = cityJson.citys.filter(function (e, n) {
                                return e.name == i
                            })[0].child, t = 0; t < n.length; t++) 1 == n.length ? e += '<li class="select-li" data-id='.concat(n[0].id, "  data-value=").concat(n[0].name, " >\n                             <span>").concat(n[0].name, "</span>\n                           </li>") : e += '<li class="select-li" data-id='.concat(n[t].id, "  data-value=").concat(n[t].name, " >\n                             <span>").concat(n[t].name, "</span>\n                           </li>");
                        $("#render-area").html(e)
                    }
                }, {
                    key: "_goRegister",
                    value: function (e) {
                        var n = this,
                            i = this.state.type;
                        $.ajax({
                            url: "/register",
                            type: "POST",
                            customize: !0,
                            data: e,
                            success: function (e) {
                                n._clearInput(), window.CT.RegisterSuccess()
                            },
                            error: function (e) {
                                dialogAlert(e.msg, i)
                            }
                        })
                    }
                }, {
                    key: "_goModifyInfo",
                    value: function (e) {
                        var n = this.state.type;
                        $.ajax({
                            url: "/modify/user/info",
                            type: "POST",
                            customize: !0,
                            data: e,
                            success: function (e) {
                                var n = window.location.href;
                                window.location.href = n, self._clearInput()
                            },
                            error: function (e) {
                                dialogAlert(e.msg, n)
                            }
                        })
                    }
                }, {
                    key: "_clearInput",
                    value: function () {
                        var e = this.$dialogDom;
                        e.find("input[type!=hidden]").val(""), e.find("reciprocity").removeClass("active").eq(0).addClass("active"), e.find(".register-check-area").find(".select-value").text("北京"), e.find(".register-check-city").find(".select-value").text("北京"), e.find("#select-city li").eq(1).addClass("active").siblings().removeClass("active")
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var l = this,
                            i = l.$dialogDom,
                            t = i.find("#select-city");
                        i.on("blur", ".register-username", function (e) {
                            var n = $(e.target).val().trim();
                            check.nick({
                                nick: n
                            })
                        }), i.on("click", "#select-city .select-li", function (e) {
                            for (var n = $(this).data("id"), i = [], t = cityJson.citys, a = 0; a < t.length; a++) t[a].id == n && i.push(t[a].child[0].name);
                            $(".register-check-area").find(".select-value").text(i.join(""))
                        }), i.on("click", ".register-check-city", function (e) {
                            $("#render-area").hide()
                        }), i.on("click", ".register-check-area", function (e) {
                            t.hide();
                            var n = $(".register-check-city").find(".select-value").text().trim();
                            l._refreshArea(n)
                        }), i.on("click", ".reciprocity", function (e) {
                            $(e.target).siblings().removeClass("active").end().addClass("active")
                        }), i.on("click", ".close-icon", function (e) {
                            $("body").css("overflow", "auto"), i.removeClass("animated2 scaleInY").addClass("animated2 scaleOut");
                            var n = setTimeout(function () {
                                i.remove(), window.CT.hideMask(), clearTimeout(n)
                            }, 300);
                            l._clearInput()
                        }), i.on("click", ".open-login-dialog", function (e) {
                            window.CT.hideDialog(), window.CT.showLogin({
                                showClass: "scaleInY"
                            }), l._clearInput()
                        }), i.on("click", ".dialog-register-btn", function (e) {
                            var n = $(".register-username").val().trim(),
                                i = $(".reciprocity").siblings(".active").data("id"),
                                t = $(".register-check-city").find(".select-value").text().trim(),
                                a = $(".register-check-area").find(".select-value").text().trim(),
                                s = $(".register-sign").val().trim();
                            if (!check.nick({
                                    nick: n
                                })) return !1;
                            var o = {
                                nick: n,
                                sex: i,
                                cityName: a === t ? "" : a,
                                proveName: t,
                                sign: s
                            };
                            l.state.modify ? l._goModifyInfo(o) : (o.phone = l.state.phone, o.password = l.state.password, l._goRegister(o))
                        }), i.on("keydown", function (e) {
                            13 == e.keyCode && $(".register-next-dialog .dialog-register-btn").click()
                        })
                    }
                }]), RegisterNextDialog
            }();
        window.CT.showRegisterNext = function (e) {
            return dialogAlert(""), new RegisterNextDialog(_.extend({}, defaults, e))
        }
    }(jQuery),
    function () {
        var n = {},
            i = function () {
                function n(e) {
                    _classCallCheck(this, n), this.$dialogDom = $(".register-success-dialog"), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, this._init()
                }

                return _createClass(n, [{
                    key: "_init",
                    value: function () {
                        this._render()
                    }
                }, {
                    key: "_render",
                    value: function () {
                        var e = this.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), $("body").css("overflow", "hidden"), 0 < e) this.$dialogDom.removeClass("scaleOut").addClass("scaleInY").show();
                        else {
                            var n = Handlebars.compile('<div class="register-success-dialog dialog">\n\n    <img class="close-icon" src="/statics/images/close-8809a1ad23.png"/>\n    <div class="auto-center">\n\n    <div class="login-body">\n      <div class="from-input">\n        <img class="register-success-icon" src="/statics/images/register_success@2x-7bf36cd0fc.png" alt="">\n        <div class="success-tips-dialog mt12">恭喜你已成功注册为抽友</div>\n      </div>\n       <div class="form-item"><a href="/" class="btn-large dialog-register-btn">确定</a></div>\n   </div>\n   </div>\n</div>');
                            $("body").append(n({})), this.$dialogDom = $(".register-success-dialog"), window.CT.setPosition($(".register-success-dialog")), $(".register-success-dialog").addClass("scaleInY").show()
                        }
                        this._bindEvents()
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var n = this,
                            e = $(".register-success-dialog");
                        e.on("click", ".close-icon", function (e) {
                            $("body").css("overflow", "auto"), $(window).scrollTop(n.curScrollTop), $(e.target).parent(".register-success-dialog").remove(), window.CT.hideMask()
                        }), e.on("click", ".dialog-register-btn", function (e) {
                            window.location.href = "/"
                        }), e.on("keydown", function (e) {
                            13 == e.keyCode && $(".register-success-dialog .dialog-register-btn").click()
                        })
                    }
                }]), n
            }();
        window.CT.RegisterSuccess = function (e) {
            return new i(_.extend({}, n, e))
        }
    }(jQuery),
    function () {
        var n = {},
            i = function () {
                function n(e) {
                    _classCallCheck(this, n), this.$dialogDom = $(".release-dialog"), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, this._init()
                }

                return _createClass(n, [{
                    key: "_init",
                    value: function () {
                        this._render()
                    }
                }, {
                    key: "_render",
                    value: function () {
                        var e = this,
                            n = e.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), $("body").css("overflow", "hidden"), 0 < n) e.$dialogDom.css({
                            left: 0,
                            top: 0
                        }), window.CT.setPosition($(".login-dialog")), e.$dialogDom.addClass("scaleIn").removeClass("scaleOut").show();
                        else {
                            var i = Handlebars.compile('<div class="dialog newDialog release-dialog animated2">\n        <img class="close-icon" src="/statics/images/close-8809a1ad23.png" />\n        <div class="publish-category-con clearfix">\n            <div class="publish-item charact left">\n                <img src="/statics/images/release_txt-a491bceff8.png" alt="" class="publish-text-icon">\n                <div class="publish-text">文字</div>\n            </div>\n            <div class="publish-item publish-pictures left">\n                <img src="/statics/images/release_img-0604239d83.png" alt="" class="publish-text-icon">\n                <div class="publish-text publish-pic-text">图片</div>\n            </div>\n            <div class="publish-item publish-url left">\n                <img src="/statics/images/release_url-1bef8f8460.png" alt="" class="publish-text-icon">\n                <div class="publish-text publish-url-text">链接</div>\n            </div>\n        </div>\n    </div>');
                            $("body").append(i({})), e.$dialogDom = $(".release-dialog"), window.CT.setPosition($(".release-dialog")), $(".release-dialog").addClass("scaleIn").show()
                        }
                        e._bindEvents()
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var i = this,
                            t = $(".release-dialog");
                        t.on("click", ".close-icon", function (e) {
                            $("body").css("overflow", "auto"), $(window).scrollTop(i.curScrollTop), t.removeClass("animated2 scaleInY").addClass("animated2 scaleOut");
                            var n = setTimeout(function () {
                                t.hide(), window.CT.hideMask(), clearTimeout(n)
                            }, 300)
                        }), t.on("click", ".charact", function (e) {
                            window.CT.showReleaseText()
                        }), $("body").on("click", ".publish-pictures", function (e) {
                            window.CT.showReleasePic()
                        }), $("body").on("click", ".publish-url", function (e) {
                            window.CT.showReleaseUrl()
                        })
                    }
                }]), n
            }();
        window.CT.showRelease = function (e) {
            return new i(_.extend({}, n, e))
        }
    }(jQuery),
    function () {
        var g = window.CT.config.dialogAlert,
            c = '{{#each topicList}}<li class="select-li" data-id={{id}} data-value="#{{name}}"><span>#{{name}}</span></li>{{/each}}',
            n = {};
        Handlebars.registerHelper("showUploadImg", function (e) {
            var n = '<div class="check check-'.concat(e, '" data-id="').concat(e, '">\n                         <div class="initLoading">\n                            <img class="release-dialog-loading-img" src="/statics/images/img_loading-b9124650cd.gif">\n                         </div>\n                         \n                         <div class="show-img">\n                          <a class="remove"  href="javascript:void(0)"><img src="/statics/images/removeUpload-f46f113509.png"  alt=""></a>\n                         <div class="reupload-hover"> \n                            <a class="release-dialog-update" href="javascript:void(0)">\n                                 <img class="pic" src=""  alt="">\n                            </a>\n                            \n                            <div class="reupload" style="display: none">\n                                <label for="opactity-file"><input type="file" class="opactity-file" style="display: none"/></label>\n                                <span class="reupload-text">重新上传</span>\n                            </div>\n                            \n                        </div>\n                        </div>\n                  </div> ');
            return new Handlebars.SafeString(n)
        });
        var r = function (e) {
                var n = e.lastIndexOf("."),
                    i = e.length,
                    t = e.substring(0, n),
                    a = e.substring(i, n);
                return window.CT.replaceHttps(t + "=C140x140" + a)
            },
            i = function () {
                function n(e) {
                    _classCallCheck(this, n), this.$dialogDom = $(".release-dialog-pic"), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, this.state = {
                        topicList: [],
                        errImg: {
                            imgUrl: "/statics/images/file_fail-f4e131f15b.png",
                            noUpload: !0
                        },
                        errorList: [],
                        imgCollection: [],
                        type: 1
                    }, this._render()
                }

                return _createClass(n, [{
                    key: "_render",
                    value: function () {
                        var e = this,
                            n = e.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), $("body").css("overflow", "hidden"), 0 < n) e.$dialogDom.addClass("scaleInY").removeClass("scaleOut").show();
                        else {
                            var i = Handlebars.compile('\n                    <div class="dialog newDialog release-dialog-pic animated2">\n                        <img class="close-icon" src="/statics/images/close-8809a1ad23.png" />\n                        <div class="release-text-container form-item">\n                            <div class="text-title">分享新发现</div>\n                            \n                            <div class="publish-options">\n                                <div class="publish-options-title"><span class="b">你的图片：</span>（最多可添加4张图片，支持jpg、jpeg、png、gif格式，大小不得超过10M。）</div>\n                                \n                                <div class="publish-options-picture">\n                                    <div class="dialog-check-img">\n                                        <div class="publish-upload-file check">\n                                            <label for="dialog-upload-pic" class="dialog-upload-label">\n                                                <input type="file" data-id="0" accept="image/*" data-type="0" name="addFile"  style="display:none;" id="dialog-upload-pic">\n                                            </label>\n                                        </div>\n                                    </div>\n                                </div>\n           \n                                <div class="publish-options-report" style="height: 98px;">\n                                    <textarea class="dialog-share-text" data-id="1" name="dialog-share-text" data-type="1"  placeholder="说你想说的……" ></textarea>\n                                    <p class="report-tips"><span class="comment-input-title">还可输入</span><span class="comment-input-num">150</span>字</p>\n                                </div>\n              \n                                <div class="search-topic select-con">\n                                    <input class="dialog-search-topic select-con select-value" data-type="2" name="dialog-search-topic" style="width: 90%"  \n                                    type="text" maxlength="16" placeholder="添加到话题（选填）">\n                              \n                                    <ul class="select-ul dialog-search-topic-items"></ul>\n                                </div>\n                \n              \n                                <div class="dialog-common-warn-tips"></div> \x3c!--错误提示--\x3e\n               \n                                <div class="publish-options">\n                                    <label for="">发布到：</label>\n                                    <span class="publish-options-select">\n                                        <a href="javascript:;" data-id="pic" class="active">图片</a>\n                                        <a href="javascript:;" data-id="ask" >你问我答</a>\n                                        <a href="javascript:;" data-id="news" >42区</a>\n                                        <a href="javascript:;" data-id="tec" >挨踢1024</a>\n                                        <a href="javascript:;" data-id="scoff" >段子</a>\n                                    </span>\n                                    <span class="btn right dialog-publish-btn disabled">发布</span>\n                                    <div class="btn loading-more-img-con comment-loading right dialog-release-btn-loading" style="width: 78px;padding: 8px 0;">\n                                        <span class="bounce bounce1"></span>\n                                        <span class="bounce bounce2"></span>\n                                        <span class="bounce bounce3"></span>\n                                    </div>\n                                </div>\n       \n                                <div class="publish-error"></div>\n                        </div>\n                    </div>');
                            $("body").append(i({})), e.$dialogDom = $(".release-dialog-pic"), window.CT.setPosition($(".release-dialog-pic")), $(".release-dialog-pic").addClass("scaleInY").show()
                        }
                        var t = window.location.pathname,
                            a = t.substr(1, t.length).split("/")[0],
                            s = t.substr(1, t.length).split("/")[1];
                        "topic" == a && e._showTopicList({
                            id: s
                        }), e._bindEvents(), e._showTextLength()
                    }
                }, {
                    key: "_showTextLength",
                    value: function () {
                        var e = $(".dialog-share-text").val().trim();
                        150 < e.length ? ($(".comment-input-title").text("标题字数超出"), $(".comment-input-num").text(e.length - 150), $(".report-tips").addClass("over")) : ($(".comment-input-title").text("还可输入"), $(".comment-input-num").text(150 - e.length), $(".report-tips").removeClass("over"))
                    }
                }, {
                    key: "_renderToplist",
                    value: function (i) {
                        var e = this.$dialogDom,
                            n = this.state.topicList.filter(function (e, n) {
                                if (-1 !== e.name.indexOf(i)) return e
                            }),
                            t = Handlebars.compile(c);
                        if (0 < n.length) {
                            var a = {
                                topicList: 0 < i.length ? n : this.state.topicList
                            };
                            e.find(".search-topic .select-ul").html(t(a)).show()
                        } else e.find(".search-topic .select-ul").html("").hide()
                    }
                }, {
                    key: "_showTopicList",
                    value: function (e) {
                        var s = this,
                            o = s.$dialogDom,
                            l = e.val,
                            r = e.id;
                        $.ajax({
                            url: "/topic/list",
                            type: "post",
                            data: {
                                pageSize: 100
                            },
                            success: function (e) {
                                var i = e.list;
                                if (function () {
                                        for (var e = [], n = 0; n < i.length; n++) i[n].image && e.push({
                                            id: i[n].id,
                                            name: i[n].name
                                        });
                                        i = e
                                    }(), s.state.topicList = i, r) {
                                    var t = o.find(".dialog-search-topic");
                                    i.map(function (e, n) {
                                        e.id == r && t.val("#" + e.name).data("id", e.id)
                                    })
                                } else if (l) s._renderToplist(l);
                                else {
                                    var n = Handlebars.compile(c),
                                        a = {
                                            topicList: i
                                        };
                                    $(".search-topic .select-ul").html(n(a)).show()
                                }
                            }
                        })
                    }
                }, {
                    key: "_hightligth",
                    value: function () {
                        var e = this.$dialogDom,
                            n = e.find(".dialog-check-img .check:not(.publish-upload-file)"),
                            i = e.find(".dialog-share-text").val().trim(),
                            t = e.find(".dialog-publish-btn");
                        0 < n.length && 0 < i.length ? t.removeClass("disabled") : t.addClass("disabled")
                    }
                }, {
                    key: "_clearInput",
                    value: function () {
                        var e = this.$dialogDom;
                        e.find(".dialog-share-text").val(""), e.find(".dialog-search-topic").val("").data("id", ""), e.find(".dialog-publish-btn").addClass("disabled"), e.find(".publish-options-select a").eq(0).addClass("active").siblings().removeClass("active"), e.find(".dialog-check-img .check:not(.publish-upload-file)").remove(), e.find(".dialog-release-btn-loading").hide(), e.find(".dialog-publish-btn").show()
                    }
                }, {
                    key: "_checkImgType",
                    value: function (e) {
                        var n = this.state.type;
                        if (e) {
                            var i = e.type.split("/")[1].toUpperCase(),
                                t = e.size,
                                a = {
                                    fileType: ["PNG", "GIF", "JPG", "JPEG"],
                                    maxSize: 10485760
                                };
                            return -1 == a.fileType.indexOf(i) ? (g("图片格式不支持", n), !1) : !(parseInt(t) >= parseInt(a.maxSize)) || (g("图片大小不得超过10M", n), !1)
                        }
                    }
                }, {
                    key: "_uploadImg",
                    value: function (e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
                            a = this,
                            s = a.state.type,
                            o = null,
                            l = a.state.errImg;
                        if (!a._checkImgType(e)) return !1;
                        var n = new FormData;
                        n.append("file", e), $.ajax({
                            url: "/upload",
                            type: "POST",
                            data: n,
                            contentType: !1,
                            customize: !0,
                            beforeSend: function () {
                                if (t) return t.find(".initLoading").show(), void t.find(".show-img").hide();
                                var e = $(".release-dialog-pic .check").length;
                                4 <= e ? $(".publish-upload-file").hide() : $(".publish-upload-file").show();
                                var n = $(".dialog-check-img .check:not(.publish-upload-file)").last();
                                o = 0 < n.length ? parseInt(n.data("id")) + 1 : e - 1;
                                var i = Handlebars.compile("{{showUploadImg index}}");
                                $(i({
                                    index: o
                                })).insertBefore($(".publish-upload-file"))
                            },
                            success: function (e) {
                                if (t) {
                                    var n = t.data("id");
                                    return t.find(".initLoading").hide(), t.find(".show-img").show(), t.find(".pic").attr("src", r(e[0].imgUrl)).data("url", e[0].imgUrl), void(a.state.imgCollection[n] = e[0])
                                }
                                var i = ".check-" + o;
                                a.state.imgCollection[o] = e[0], $(i).find(".pic").attr("src", r(e[0].imgUrl)).data("url", e[0].imgUrl), $(i).find(".initLoading").hide(), $(i).find(".show-img").show(), a._hightligth()
                            },
                            error: function (e) {
                                if (g(e.msg, s), t) {
                                    var n = t.data("id");
                                    return t.find(".initLoading").hide(), t.find(".show-img").show(), t.find(".pic").attr("src", l.imgUrl).data("url", ""), void(a.state.imgCollection[n] = l)
                                }
                                a.state.imgCollection[o] = l;
                                var i = ".check-" + o;
                                $(i).find(".initLoading").hide(), $(i).find(".show-img").show(), $(i).find(".pic").attr("src", l.imgUrl).data("url", "")
                            }
                        })
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var d = this,
                            m = d.$dialogDom,
                            p = m.find(".dialog-search-topic"),
                            u = m.find(".dialog-share-text"),
                            i = m.find(".publish-options-report"),
                            h = m.find(".dialog-release-btn-loading");
                        m.on("click", ".close-icon", function (e) {
                            $("body").css("overflow", "auto"), $(window).scrollTop(d.curScrollTop), m.removeClass("animated2 scaleInY").addClass("animated2 scaleOut");
                            var n = setTimeout(function () {
                                m.hide(), window.CT.hideMask(), clearTimeout(n)
                            }, 300);
                            d._clearInput()
                        }), m.on("focus input blur", ".dialog-search-topic", function (e) {
                            var n = e.type,
                                i = $(e.target),
                                t = i.val().trim(),
                                a = (i.data("id"), 0 == t.indexOf("#") ? t.substr(1, t.length) : t);
                            switch (n) {
                                case "focusin":
                                    i.parent().addClass("focus"), d._showTopicList({
                                        val: a
                                    });
                                    break;
                                case "input":
                                    d._renderToplist(a);
                                    break;
                                case "focusout":
                                    i.parent().removeClass("focus");
                                    var s = [];
                                    s.push(a), s.unshift("#"), i.val(0 !== t.length ? s.join("") : t);
                                    var o = d.state.topicList.filter(function (e, n) {
                                        return e.name === a
                                    });
                                    0 !== o.length ? p.data("id", o[0].id) : p.data("id", "")
                            }
                        }), m.on("click", ".select-li", function (e) {
                            e.stopPropagation();
                            var n = $(this),
                                i = n.parents(".select-con").find(".select-value"),
                                t = n.data("id"),
                                a = n.data("value");
                            i.val(a), i.data("id", t), i.data("value", a), $(".search-topic .select-ul").hide()
                        }), m.on("propertychange input click focus blur", ".dialog-share-text", function (e) {
                            d._showTextLength();
                            var n = e.type;
                            $(e.target).val().trim();
                            switch (n) {
                                case "focusin":
                                    i.addClass("focus"), d._showTextLength();
                                    break;
                                case "input":
                                    d._hightligth();
                                    break;
                                case "focusout":
                                    i.removeClass("focus")
                            }
                        }), m.on("change", "#dialog-upload-pic", function (e) {
                            var n = $(e.target).get(0).files[0];
                            $("#dialog-upload-pic").val(""), d._uploadImg(n)
                        }), m.on("mouseenter mouseleave", ".reupload-hover", function (e) {
                            "mouseenter" === e.type ? $(this).find(".reupload").show() : "mouseleave" === e.type && $(this).find(".reupload").hide()
                        }), m.on("click", ".reupload-text", function (e) {
                            $(this).parent(".reupload").siblings("a").find(".pic").data("url");
                            $(this).siblings().find(".opactity-file").click()
                        }), m.on("change", ".opactity-file", function (e) {
                            var n = $(e.target).get(0).files[0];
                            $(".opactity-file").val("");
                            var i = $(this).closest(".check");
                            d._uploadImg(n, i)
                        }), m.on("click", ".remove", function (e) {
                            var n = $(e.currentTarget).closest(".check"),
                                i = n.data("id"),
                                t = d.state.imgCollection;
                            delete t[i], n.remove(), d._hightligth(t), 4 < $(".check").length ? $(".publish-upload-file").hide() : $(".publish-upload-file").show()
                        }), m.on("click", ".publish-options-select a", function (e) {
                            $(e.target).addClass("active").siblings().removeClass("active")
                        }), m.on("click", ".dialog-publish-btn", function (e) {
                            var n = d.state.type,
                                i = $(e.target);
                            if (i.hasClass("disabled")) return !1;
                            for (var t = u.val().trim(), a = p.data("id"), s = m.find(".publish-options-select a.active").data("id"), o = d.state.imgCollection.filter(function (e, n) {
                                    return e
                                }), l = [], r = 0; r < o.length; r++) {
                                if (o[r].noUpload) return g("先删除上传失败的图片再发布吧！", n), !1;
                                l.push(o[r].imgUrl)
                            }
                            if (!a && 0 < p.val().trim().length) return g("该话题不可用", n), !1;
                            h.show(), i.hide();
                            var c = {
                                title: t,
                                topicId: a,
                                subject: s,
                                imgUrls: l.join(",")
                            };
                            $.ajax({
                                url: "/link/create",
                                type: "post",
                                customize: !0,
                                data: c,
                                success: function (e) {
                                    window.location.href = "/link/".concat(e.id)
                                },
                                error: function (e) {
                                    h.hide(), i.show(), g(e.msg, n)
                                }
                            })
                        })
                    }
                }]), n
            }();
        window.CT.showReleasePic = function (e) {
            return new i(_.extend({}, n, e))
        }
    }(jQuery),
    function () {
        var m = window.CT.config.dialogAlert,
            c = '{{#each topicList}}<li class="select-li" data-id={{id}} data-value="#{{name}}"><span>#{{name}}</span></li> {{/each}}',
            n = {},
            i = function () {
                function n(e) {
                    _classCallCheck(this, n), this.$dialogDom = $(".release-dialog-text"), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, this.state = {
                        topicList: [],
                        type: 1
                    }, this._render()
                }

                return _createClass(n, [{
                    key: "_render",
                    value: function () {
                        var e = this,
                            n = e.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), $("body").css("overflow", "hidden"), 0 < n) e.$dialogDom.addClass("scaleInY").removeClass("scaleOut").show();
                        else {
                            var i = Handlebars.compile('\n        <div class="dialog newDialog release-dialog-text animated2 ">\n            <img class="close-icon" src="/statics/images/close-8809a1ad23.png" />\n            <div class="release-text-container form-item">\n                <div class="text-title">分享新发现</div>\n                <div class="publish-options-report">\n                    <textarea class="dialog-share-text"  placeholder="说你想说的……"></textarea>\n                    <p class="report-tips"><span class="comment-input-title">还可输入</span><span class="comment-input-num">150</span>字</p>\n                </div>\n                <div class="search-topic select-con">\n                    <input class="dialog-search-topic select-con select-value"  style="width: 90%" type="text" maxlength="16" placeholder="添加到话题（选填）"/>\n                    <ul class="select-ul"></ul>\n                </div>\n            </div>\n             \n            <div class="dialog-common-warn-tips"></div>\x3c!--错误提示--\x3e\n            \n            <div class="publish-options">\n                <label for="">发布到：</label>\n                      <span class="publish-options-select">\n                        <a href="javascript:;" data-id="scoff" class="active">段子</a>\n                        <a href="javascript:;" data-id="ask" >你问我答</a>\n                        <a href="javascript:;" data-id="news" >42区</a>\n                        <a href="javascript:;" data-id="tec" >挨踢1024</a>\n                    </span>\n                <span class="btn right dialog-publish-btn disabled">发布</span>\n                <div class="btn loading-more-img-con comment-loading right dialog-release-btn-loading" style="width: 78px;padding: 8px 0;">\n                    <span class="bounce bounce1"></span>\n                    <span class="bounce bounce2"></span>\n                    <span class="bounce bounce3"></span>\n                </div>\n            </div>\n        </div>');
                            $("body").append(i({})), e.$dialogDom = $(".release-dialog-text"), window.CT.setPosition($(".release-dialog-text")), $(".release-dialog-text").addClass("scaleInY").show()
                        }
                        var t = window.location.pathname,
                            a = t.substr(1, t.length).split("/")[0],
                            s = t.substr(1, t.length).split("/")[1];
                        "topic" == a && e._showTopicList({
                            id: s
                        }), e._bindEvents(), e._showTextLength()
                    }
                }, {
                    key: "_showTextLength",
                    value: function () {
                        var e = $(".dialog-share-text").val().trim();
                        150 < e.length ? ($(".comment-input-title").text("标题字数超出"), $(".comment-input-num").text(e.length - 150), $(".report-tips").addClass("over")) : ($(".comment-input-title").text("还可输入"), $(".comment-input-num").text(150 - e.length), $(".report-tips").removeClass("over"))
                    }
                }, {
                    key: "_renderToplist",
                    value: function (i) {
                        var e = this.$dialogDom,
                            n = this.state.topicList.filter(function (e, n) {
                                if (-1 !== e.name.indexOf(i)) return e
                            }),
                            t = Handlebars.compile(c);
                        if (0 < n.length) {
                            var a = {
                                topicList: 0 < i.length ? n : this.state.topicList
                            };
                            e.find(".search-topic .select-ul").html(t(a)).show()
                        } else e.find(".search-topic .select-ul").html("").hide()
                    }
                }, {
                    key: "_showTopicList",
                    value: function (e) {
                        var s = this,
                            o = s.$dialogDom,
                            l = e.val,
                            r = e.id;
                        $.ajax({
                            url: "/topic/list",
                            type: "post",
                            data: {
                                pageSize: 100
                            },
                            success: function (e) {
                                var i = e.list;
                                if (function () {
                                        for (var e = [], n = 0; n < i.length; n++) i[n].word && e.push({
                                            id: i[n].id,
                                            name: i[n].name
                                        });
                                        i = e
                                    }(), s.state.topicList = i, r) {
                                    var t = o.find(".dialog-search-topic");
                                    i.map(function (e, n) {
                                        e.id == r && t.val("#" + e.name).data("id", e.id)
                                    })
                                } else if (l) s._renderToplist(l);
                                else {
                                    var n = Handlebars.compile(c),
                                        a = {
                                            topicList: i
                                        };
                                    $(".search-topic .select-ul").html(n(a)).show()
                                }
                            }
                        })
                    }
                }, {
                    key: "_clearInput",
                    value: function () {
                        var e = this.$dialogDom;
                        e.find(".dialog-share-text").val(""), e.find(".dialog-search-topic").val("").data("id", ""), e.find(".dialog-publish-btn").addClass("disabled"), e.find(".publish-options-select a").eq(0).addClass("active").siblings().removeClass("active"), e.find(".dialog-release-btn-loading").hide(), e.find(".dialog-publish-btn").show()
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var l = this,
                            i = l.$dialogDom,
                            r = i.find(".dialog-search-topic"),
                            c = i.find(".dialog-share-text"),
                            t = i.find(".dialog-publish-btn"),
                            a = i.find(".publish-options-report"),
                            d = i.find(".dialog-release-btn-loading");
                        i.on("click", ".close-icon", function (e) {
                            $("body").css("overflow", "auto"), $(window).scrollTop(l.curScrollTop), i.removeClass("animated2 scaleInY").addClass("animated2 scaleOut");
                            var n = setTimeout(function () {
                                i.hide(), window.CT.hideMask(), clearTimeout(n)
                            }, 300);
                            l._clearInput()
                        }), i.on("click", ".publish-options-select a", function (e) {
                            $(e.target).addClass("active").siblings().removeClass("active")
                        }), i.on("propertychange input blur focus", ".dialog-share-text", function (e) {
                            var n = e.type,
                                i = $(e.target).val().trim();
                            switch (n) {
                                case "focusin":
                                    a.addClass("focus"), l._showTextLength();
                                    break;
                                case "input":
                                    0 == i.length || 150 < i.length ? t.addClass("disabled") : t.removeClass("disabled"), l._showTextLength();
                                    break;
                                case "focusout":
                                    a.removeClass("focus")
                            }
                        }), i.on("click", ".select-li", function (e) {
                            e.stopPropagation();
                            var n = $(this),
                                i = n.parents(".select-con").find(".select-value"),
                                t = n.data("id"),
                                a = n.data("value");
                            i.val(a), i.data("id", t), i.data("value", a), $(".search-topic .select-ul").hide()
                        }), i.on("focus input blur", ".dialog-search-topic", function (e) {
                            var n = e.type,
                                i = $(e.target),
                                t = i.val().trim(),
                                a = (i.data("id"), 0 == t.indexOf("#") ? t.substr(1, t.length) : t);
                            switch (n) {
                                case "focusin":
                                    i.parent().addClass("focus"), l._showTopicList({
                                        val: a
                                    });
                                    break;
                                case "input":
                                    l._renderToplist(a);
                                    break;
                                case "focusout":
                                    i.parent().removeClass("focus");
                                    var s = [];
                                    s.push(a), s.unshift("#"), i.val(0 !== t.length ? s.join("") : t);
                                    var o = l.state.topicList.filter(function (e, n) {
                                        return e.name === a
                                    });
                                    0 !== o.length ? r.data("id", o[0].id) : r.data("id", "")
                            }
                        }), i.on("click", ".dialog-publish-btn", function (e) {
                            var n = l.state.type,
                                i = $(e.target);
                            if (i.hasClass("disabled")) return !1;
                            var t = c.val().trim(),
                                a = r.data("id"),
                                s = $(".publish-options-select a.active").data("id");
                            if (!a && 0 < r.val().trim().length) return m("该话题不可用", n), !1;
                            d.show(), i.hide();
                            var o = {
                                title: t,
                                topicId: a,
                                subject: s
                            };
                            $.ajax({
                                url: "/link/create",
                                type: "post",
                                customize: !0,
                                data: o,
                                success: function (e) {
                                    window.location.href = "/link/".concat(e.id)
                                },
                                error: function (e) {
                                    d.hide(), i.show(), m(e.msg, n)
                                }
                            })
                        })
                    }
                }]), n
            }();
        window.CT.showReleaseText = function (e) {
            return new i(_.extend({}, n, e))
        }
    }(jQuery),
    function () {
        var u = window.CT.config.dialogAlert,
            c = '{{#each topicList}}<li class="select-li" data-id={{id}} data-value="#{{name}}"><span>#{{name}}</span></li>{{/each}}';
        Handlebars.registerHelper("getTime", function (e) {
            var n = window.CT.getStandardTime(e),
                i = window.CT.getDateObj(n),
                t = n.getTime(),
                a = (new Date).getTime() - t;
            return a < 6e4 ? "刚刚" : a < 36e5 ? Math.floor(a / 6e4) + "分钟前" : a < 864e5 ? Math.floor(a / 36e5) + "小时" : a < 2592e6 ? Math.floor(a / 864e5) + "天前" : a < 31104e6 ? Math.floor(a / 2592e6) + "个月前" : i.year + "-" + i.month + "-" + i.day
        }), Handlebars.registerHelper("cutPic", function (e) {
            var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
                i = e.lastIndexOf("."),
                t = e.length,
                a = e.substring(0, i),
                s = e.substring(t, i);
            return n ? window.CT.replaceHttps(e) : window.CT.replaceHttps(a + "=C80x80" + s)
        }), Handlebars.registerHelper("getAreaIcon", function (e) {
            var n = "";
            switch (e) {
                case 1:
                    n = "news";
                    break;
                case 2:
                    n = "scoff";
                    break;
                case 4:
                    n = "pic";
                    break;
                case 100:
                    n = "tec";
                    break;
                case 151:
                    n = "ask";
                    break;
                case 177:
                    n = "video"
            }
            var i = "";
            return i += '<span class="category-icon ' + n + '-icon"></span>', new Handlebars.SafeString(i)
        });
        var n = {},
            i = function () {
                function n(e) {
                    _classCallCheck(this, n), this.$dialogDom = $(".release-dialog-url"), this.curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, this.state = {
                        topicList: [],
                        type: 1
                    }, this._render()
                }

                return _createClass(n, [{
                    key: "_render",
                    value: function () {
                        var e = this,
                            n = e.$dialogDom.length;
                        if (window.CT.showMask(), window.CT.hideDialog(), $("body").css("overflow", "hidden"), 0 < n) e.$dialogDom.addClass("scaleInY").removeClass("scaleOut").show();
                        else {
                            var i = Handlebars.compile('\n            <div class="dialog newDialog release-dialog-url animated2  ">\n                <img class="close-icon" src="/statics/images/close-8809a1ad23.png"/>\n                <div class="release-url-container form-item">\n                    <div class="text-title">分享新发现</div>\n                    \n                        <div class="release-url">\n                             <label>添加链接：</label>\n                             <div class="release-url-content">\n                                <input type="text" name="release-input-url" data-id="0" class="release-input-url" placeholder="http://">\n                                <button class="get-url-btn disabled" disabled >获取标题</button>\n                                \n                                <div class="btn loading-more-img-con comment-loading right release-btn-loading">\n                                    <span class="bounce bounce1"></span>\n                                    <span class="bounce bounce2"></span>\n                                    <span class="bounce bounce3"></span>\n                                </div>\n                             </div>\n                        </div>\n                                \n                        <div class="relese-url-items">\n                            <div class="publish-options-report disabled">\n                                <textarea class="dialog-share-text" name="dialog-share-text" data-id="1" disabled placeholder="输入你的链接标题……"></textarea>\n                                 <p class="report-tips"><span class="comment-input-title">还可输入</span><span class="comment-input-num">150</span>字</p>\n                            </div>\n                            <div class="search-topic select-con">\n                                <input class="dialog-search-topic select-con select-value" type="text" maxlength="16" placeholder="添加到话题（选填）">\n                                <ul class="select-ul dialog-search-topic-items" ></ul>\n                            </div>\n                                     \n                            <div class="dialog-common-warn-tips"></div>\x3c!--错误提示--\x3e\n                            <div class="publish-options" style="overflow: hidden">\n                                <label for="">发布到：</label>\n                                <span class="publish-options-select">\n                                    <a href="javascript:;" data-id="news" class="active">42区</a>\n                                    <a href="javascript:;" data-id="ask" >你问我答</a>\n                                    <a href="javascript:;" data-id="pic" >图片</a>\n                                    <a href="javascript:;" data-id="tec" >挨踢1024</a>\n                                    <a href="javascript:;" data-id="scoff" >段子</a>\n                                </span>\n                                <span class="btn right dialog-publish-btn disabled">发布</span>    \n                                <div class="btn loading-more-img-con comment-loading right dialog-release-btn-loading" style="width: 78px;padding: 8px 0;">\n                                    <span class="bounce bounce1"></span>\n                                    <span class="bounce bounce2"></span>\n                                    <span class="bounce bounce3"></span>\n                                </div>    \n                            </div>           \n                    </div>\n                                \n                </div>  \n            </div>');
                            $("body").append(i({})), e.$dialogDom = $(".release-dialog-url"), window.CT.setPosition($(".release-dialog-url")), $(".release-dialog-url").addClass("scaleInY").show()
                        }
                        var t = window.location.pathname,
                            a = t.substr(1, t.length).split("/")[0],
                            s = t.substr(1, t.length).split("/")[1];
                        "topic" == a && e._showTopicList({
                            id: s
                        }), e._bindEvents(), e._showTextLength()
                    }
                }, {
                    key: "_clearInput",
                    value: function () {
                        var e = this.$dialogDom;
                        e.find(".publish-options-select a").eq(0).addClass("active").siblings().removeClass("active"), e.find(".release-input-url").removeClass("disabled").removeAttr("disabled").val(""), e.find(".release-input-url .dialog-share-text").attr("disabled", !0).val(""), e.find(".publish-options-report").addClass("disabled"), e.find(".get-url-btn").attr("class", "get-url-btn disabled"), e.find(".repeat-contents-items").remove(), e.find(".relese-url-items").show(), e.find(".dialog-release-btn-loading").hide(), e.find(".dialog-publish-btn").show()
                    }
                }, {
                    key: "_showTextLength",
                    value: function () {
                        var e = this.$dialogDom.find(".dialog-share-text").val().trim();
                        150 < e.length ? ($(".comment-input-title").text("标题字数超出"), $(".comment-input-num").text(e.length - 150), $(".report-tips").addClass("over")) : ($(".comment-input-title").text("还可输入"), $(".comment-input-num").text(150 - e.length), $(".report-tips").removeClass("over"))
                    }
                }, {
                    key: "_renderToplist",
                    value: function (i) {
                        var e = this.$dialogDom,
                            n = this.state.topicList.filter(function (e, n) {
                                if (-1 !== e.name.indexOf(i)) return e
                            }),
                            t = Handlebars.compile(c);
                        if (0 < n.length) {
                            var a = {
                                topicList: 0 < i.length ? n : this.state.topicList
                            };
                            e.find(".search-topic .select-ul").html(t(a)).show()
                        } else e.find(".search-topic .select-ul").html("").hide()
                    }
                }, {
                    key: "_showTopicList",
                    value: function (e) {
                        var s = this,
                            o = s.$dialogDom,
                            l = e.val,
                            r = e.id;
                        $.ajax({
                            url: "/topic/list",
                            type: "post",
                            data: {
                                pageSize: 100
                            },
                            success: function (e) {
                                var i = e.list;
                                if (function () {
                                        for (var e = [], n = 0; n < i.length; n++) i[n].link && e.push({
                                            id: i[n].id,
                                            name: i[n].name
                                        });
                                        i = e
                                    }(), s.state.topicList = i, r) {
                                    var t = o.find(".dialog-search-topic");
                                    i.map(function (e, n) {
                                        e.id == r && t.val("#" + e.name).data("id", e.id)
                                    })
                                } else if (l) s._renderToplist(l);
                                else {
                                    var n = Handlebars.compile(c),
                                        a = {
                                            topicList: i
                                        };
                                    $(".search-topic .select-ul").html(n(a)).show()
                                }
                            }
                        })
                    }
                }, {
                    key: "_hightligth",
                    value: function () {
                        var e = this.$dialogDom,
                            n = e.find(".release-input-url").val().trim(),
                            i = e.find(".dialog-share-text").val().trim(),
                            t = e.find(".dialog-publish-btn");
                        0 < n.length && 0 < i.length && i.length <= 150 ? t.removeClass("disabled") : t.addClass("disabled")
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        var r = this,
                            i = r.$dialogDom,
                            c = i.find(".release-input-url"),
                            d = i.find(".dialog-share-text"),
                            m = i.find(".dialog-search-topic"),
                            t = i.find(".publish-options-report"),
                            s = i.find(".get-url-btn"),
                            o = i.find(".release-url-content .loading-more-img-con"),
                            l = (i.find(".publish-options .loading-more-img-con"), "get-url-btn reset"),
                            a = "get-url-btn disabled",
                            p = i.find(".dialog-release-btn-loading");
                        i.on("click", ".close-icon", function (e) {
                            $("body").css("overflow", "auto"), $(window).scrollTop(r.curScrollTop), i.removeClass("animated2 scaleInY").addClass("animated2 scaleOut");
                            var n = setTimeout(function () {
                                i.hide(), window.CT.hideMask(), clearTimeout(n)
                            }, 300);
                            r._clearInput()
                        }), i.on("focus input blur", ".dialog-search-topic", function (e) {
                            var n = e.type,
                                i = $(e.target),
                                t = i.val().trim(),
                                a = (i.data("id"), 0 == t.indexOf("#") ? t.substr(1, t.length) : t);
                            switch (n) {
                                case "focusin":
                                    i.parent().addClass("focus"), r._showTopicList({
                                        val: a
                                    });
                                    break;
                                case "input":
                                    r._renderToplist(a);
                                    break;
                                case "focusout":
                                    i.parent().removeClass("focus");
                                    var s = [];
                                    s.push(a), s.unshift("#"), i.val(0 !== t.length ? s.join("") : t);
                                    var o = r.state.topicList.filter(function (e, n) {
                                        return e.name === a
                                    });
                                    0 !== o.length ? m.data("id", o[0].id) : m.data("id", "")
                            }
                        }), i.on("click", ".select-li", function (e) {
                            e.stopPropagation();
                            var n = $(this),
                                i = n.parents(".select-con").find(".select-value"),
                                t = n.data("id"),
                                a = n.data("value");
                            i.val(a), i.data("id", t), i.data("value", a), $(".search-topic .select-ul").hide()
                        }), i.on("input", ".release-input-url", function (e) {
                            var n = $(e.target);
                            0 < n.val().trim().length ? n.siblings(".get-url-btn").attr({
                                class: "get-url-btn normal",
                                disabled: !1
                            }) : n.siblings(".get-url-btn").attr({
                                class: a,
                                disabled: !0
                            })
                        }), i.on("propertychange input focus blur", ".dialog-share-text", function (e) {
                            var n = e.type;
                            $(e.target).val().trim();
                            switch (n) {
                                case "focusin":
                                    t.addClass("focus"), r._showTextLength(), r._hightligth();
                                    break;
                                case "input":
                                    r._showTextLength(), r._hightligth();
                                    break;
                                case "focusout":
                                    t.removeClass("focus")
                            }
                        }), i.on("click", ".get-url-btn.normal", function (e) {
                            var t = r.state.type,
                                a = $(e.target),
                                n = c.val().trim();
                            $.ajax({
                                url: "/link/title",
                                type: "post",
                                data: {
                                    url: n
                                },
                                customize: !0,
                                beforeSend: function () {
                                    s.hide(), o.show()
                                },
                                success: function (e) {
                                    s.show(), o.hide(), $(".repeat-contents-items").hide(), $(".relese-url-items").show(), r._showTextLength(), a.text("更换链接").attr("class", l), a.siblings("input").attr({
                                        disabled: !0
                                    }).addClass("disabled"), d.val(e.title).removeAttr("disabled").focus().parent().removeClass("disabled")
                                },
                                error: function (e) {
                                    if (s.show(), o.hide(), 405 === e.code) {
                                        u(e.msg, t), $(".relese-url-items").hide(), $(".repeat-contents-items").remove(), a.text("更换链接").attr({
                                            class: l
                                        }), a.siblings("input").attr({
                                            disabled: !0
                                        }).addClass("disabled");
                                        var n = Handlebars.compile('\n            <div class="repeat-contents-items">\n                <div class="dialog-common-warn-tips"></div>\x3c!--错误提示--\x3e    \n                \n                <div class="repeat-link-con mt12" onclick="window.location.href = \'/link/{{repeatData.id}}\'">\n                    <div class="repeat-link-item clearfix" >\n                        <div class="repeat-link-area  clearfix">       \n                            {{#if repeatData.imgUrl}}\n                                <div class="repeat-common-matching-con left" style=""><img class="matching" src={{cutPic repeatData.imgUrl}} /></div>\n                            {{/if}}\n                        \n                            <div class="link-info-con left">\n                                <div class="link-detail">\n                                    {{#if repeatData.topicName}}\n                                        <span class="topic-con clearfix"><img class="topic-icon" src="/statics/images/mark/topic_icon-d15bdf1385.png" alt="">{{repeatData.topicName}}</span>\n                                    {{/if}}\n                                    <div class="repeat-link-title">{{repeatData.title}}</div>\n                                    <div class="repeat-link-content">{{repeatData.content}}</div>\n                                </div>\n                                <div class="operate-author-con clearfix">\n                                    <div class="author-con left">\n                                        <img class="author-avatar" src={{cutPic repeatData.submittedUser.imgUrl true}} alt="">\n                                        <span class="author-name">  {{repeatData.submittedUser.nick}}</span>\n                                        <span class="separate-line"></span>\n                                        <span class="time-enter"> {{getTime repeatData.createTime}}发布</span>\n                                        \n                                        <span class="separate-line"></span>\n                                        {{getAreaIcon repeatData.subjectId}}\n                                </div>\n                                <div class="operate-con right clearfix">\n                                    <a class="operate-item recommend-repeat left" href=\'javascript:;\'>\n                                        <span class="recommend-icon"></span>\n                                        <span class="recommend-num">{{repeatData.ups}}</span>\n                                    </a>\n                                    <a class="operate-item comment right" href="javascript:;">\n                                        <span class="comment-icon"></span>\n                                        <span class="comment-num">{{repeatData.commentsCount}}</span>\n                                    </a>\n                        \n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>'),
                                            i = {
                                                repeatData: e.data
                                            };
                                        $(".release-url-container").append(n(i)), $(".repeat-contents-items").show()
                                    }
                                    u(e.msg, t)
                                }
                            })
                        }), i.on("click", ".get-url-btn.reset", function (e) {
                            var n = $(e.target);
                            u(""), n.text("获取链接").attr("class", a).siblings("input").attr({
                                disabled: !1,
                                class: "release-input-url"
                            }).val("").focus(), $(".dialog-share-text").val("").attr("disabled", !0), t.addClass("disabled"), $(".repeat-contents-items").hide(), $(".relese-url-items").show()
                        }), i.on("click", ".publish-options-select a", function (e) {
                            $(e.target).addClass("active").siblings().removeClass("active")
                        }), i.on("click", ".dialog-publish-btn", function (e) {
                            var n = $(e.target);
                            if (n.hasClass("disabled")) return !1;
                            var i = r.state.type,
                                t = m.data("id"),
                                a = $(".publish-options-select a.active").data("id"),
                                s = c.val().trim(),
                                o = d.val().trim();
                            if (!t && 0 < m.val().trim().length) return u("该话题不可用", i), !1;
                            p.show(), n.hide();
                            var l = {
                                title: o,
                                url: s,
                                topicId: t,
                                subject: a
                            };
                            $.ajax({
                                url: "/link/create",
                                type: "post",
                                customize: !0,
                                data: l,
                                success: function (e) {
                                    window.location.href = "/link/".concat(e.id)
                                },
                                error: function (e) {
                                    p.hide(), n.show(), u(e.msg, i)
                                }
                            })
                        })
                    }
                }]), n
            }();
        window.CT.showReleaseUrl = function (e) {
            return new i(_.extend({}, n, e))
        }
    }(jQuery),
    function (l) {
        window.CT = window.hasOwnProperty("CT") ? window.CT : {};
        var e = '\n        <div class="dialog-report-content">\n            <div class="modal-content-title">{{contentTitle}}</div>\n            <form class="modal-report-form">\n                <div class="checkbox-list">\n                    {{#if reportUser}}\n                        <div class="row">\n                            <div class="list-item">\n                                <label class="checkbox-wrapper">\n                                     <span class="check-icon"></span>\n                                     <span class="label-text">广告</span>\n                                </label>\n                            </div>\n                            <div class="list-item">\n                                <label class="checkbox-wrapper">\n                                    <span class="check-icon"></span>\n                                    <span class="label-text">色情</span>\n                                </label>\n                            </div>\n                            <div class="list-item">\n                                <label class="checkbox-wrapper">\n                                    <span class="check-icon"></span>\n                                    <span class="label-text">违法信息</span>\n                                </label>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="list-item">\n                                <label class="checkbox-wrapper">\n                                    <span class="check-icon"></span>\n                                    <span class="label-text">人身攻击</span>\n                                </label>\n                            </div>\n                            <div class="list-item">\n                                <label class="checkbox-wrapper">\n                                    <span class="check-icon"></span>\n                                    <span class="label-text">其他</span>\n                                </label>\n                            </div>\n                        </div>\n                    {{/if}}\n                    {{#if reportCommentsOrlinks}}\n                        <div class="row">\n                            <div class="list-item width50">\n                                <label class="checkbox-wrapper">\n                                     <span class="check-icon"></span>\n                                     <span class="label-text">广告、垃圾信息</span>\n                                </label>\n                            </div>\n                            <div class="list-item width50">\n                                <label class="checkbox-wrapper">\n                                    <span class="check-icon"></span>\n                                    <span class="label-text">淫秽色情</span>\n                                </label>\n                            </div>                   \n                        </div>\n                        <div class="row">\n                            <div class="list-item width50">\n                                <label class="checkbox-wrapper">\n                                    <span class="check-icon"></span>\n                                    <span class="label-text">政治敏感话题</span>\n                                </label>\n                            </div>\n                            <div class="list-item width50">\n                                <label class="checkbox-wrapper">\n                                    <span class="check-icon"></span>\n                                    <span class="label-text">其他</span>\n                                </label>\n                            </div>\n                        </div>\n                    {{/if}}\n                </div>\n                <div class="report-input">\n                    <input maxlength="100" class="report-input-text" type="text" placeholder="详细描述举报原因有助于尽快获得处理（100字以内）"/>\n                    <textarea class="report-textarea"></textarea>\n                    <div class="report-input-tips">\n                        还可输入<span class="report-input-num">100</span>个字\n                    </div>\n              </div>\n            </form>\n        </div>',
            s = '\n        <div class="dialog-report-content">\n            <div class="modal-content-title">确定要将<span>{{nick}}</span>拉黑吗？拉黑后双方自动取消关注，且不可再互评、互聊及相互关注。</div>\n        </div>',
            o = '\n        <div class="dialog-report-content">\n            <div class="modal-content-title">确定要将<span>{{nick}}</span>移出黑名单吗？</div>\n        </div>',
            i = {
                2: {
                    reportUser: !0,
                    tmpl: Handlebars.compile(e),
                    title: "举报用户",
                    contentTitle: "你举报用户的原因：",
                    reason: ""
                },
                4: {
                    reportCommentsOrlinks: !0,
                    tmpl: Handlebars.compile(e),
                    title: "举报评论",
                    contentTitle: "你举报这条评论的原因：",
                    reason: ""
                },
                5: {
                    reportCommentsOrlinks: !0,
                    tmpl: Handlebars.compile(e),
                    title: "举报发布",
                    contentTitle: "你举报这条发布的原因：",
                    reason: ""
                }
            },
            n = function () {
                function n(e) {
                    _classCallCheck(this, n), this.options = _.extend({}, i[e.type], e), this._init()
                }

                return _createClass(n, [{
                    key: "_init",
                    value: function () {
                        this._render()
                    }
                }, {
                    key: "_render",
                    value: function () {
                        var e = this;
                        if (!window.jid) return window.CT.showLogin && _.isFunction(window.CT.showLogin) ? window.CT.showLogin() : window.CT.showTopTips("warning", "请先登录"), !1;
                        if (2 == e.options.type || 4 == e.options.type || 5 == e.options.type) {
                            if (2 == e.options.type) {
                                var n = "你举报<span>".concat(e.options.nick, "</span>的原因：");
                                e.options.contentTitle = new Handlebars.SafeString(n)
                            }
                            var i = e.options.tmpl;
                            window.CT.dialog({
                                title: e.options.title,
                                content: i(e.options),
                                okText: "确定",
                                cancelText: "取消",
                                okBtnClass: "disabled",
                                autoClose: !0,
                                onOk: function () {
                                    e._getSendReportData()
                                }
                            }), e._bindEvents()
                        } else if (1 == e.options.type) {
                            if (1 == window.loginedUser.complateReg) {
                                return window.CT.showRegisterNext && _.isFunction(window.CT.showRegisterNext) ? window.CT.showRegisterNext({
                                    modify: !0
                                }) : window.CT.showTopTips("warning", "请先完善信息"), !1
                            }
                            var t = Handlebars.compile(s);
                            window.CT.dialog({
                                title: "拉入黑名单",
                                content: t(e.options),
                                okText: "确定",
                                cancelText: "取消",
                                autoClose: !0,
                                onOk: function () {
                                    e._sendBlack({
                                        type: e.options.type,
                                        toJid: e.options.toJid
                                    }, e.options.callBack ? e.options.callBack : "")
                                },
                                onCancel: function () {}
                            })
                        } else {
                            var a = Handlebars.compile(o);
                            window.CT.dialog({
                                title: "移出黑名单",
                                content: a(e.options),
                                okText: "确定",
                                cancelText: "取消",
                                autoClose: !0,
                                onOk: function () {
                                    e._removeReport({
                                        toJid: e.options.toJid
                                    }, e.options.callBack ? e.options.callBack : "")
                                },
                                onCancel: function () {}
                            })
                        }
                    }
                }, {
                    key: "_bindEvents",
                    value: function () {
                        l(".dialog-report-content .checkbox-wrapper").off().on("click", function () {
                            var e = l(this).hasClass("active");
                            l(".checkbox-wrapper").removeClass("active"), e ? (l(this).removeClass("active"), l(".dialog .confirm-btn").addClass("disabled")) : (l(this).addClass("active"), l(".dialog .confirm-btn").removeClass("disabled"))
                        }), l(".dialog-report-content .report-input").off().on("click", function (e) {
                            e.stopPropagation();
                            var n = l(".dialog-report-content .report-textarea"),
                                i = l(this);
                            if (!i.hasClass("focus")) {
                                i.addClass("focus"), n.css("display", "block").focus();
                                var t = setTimeout(function () {
                                    n.css("display", "block").focus(), clearTimeout(t)
                                }, 200)
                            }
                        }), l(".dialog-report-content .report-textarea").off().on("input propertychange", function (e) {
                            var n = l(this),
                                i = n.val(),
                                t = 100 - window.CT.getInputLength(i),
                                a = l(".dialog-report-content .report-input-num");
                            if (a.text(t), t < 0) {
                                var s = window.CT.getInput(i, 100);
                                n.val(s);
                                var o = 100 - window.CT.getInputLength(s);
                                a.text(o)
                            }
                        })
                    }
                }, {
                    key: "_getSendReportData",
                    value: function () {
                        var e = this,
                            n = {
                                type: e.options.type
                            },
                            t = [];
                        l(".checkbox-wrapper.active").each(function (e, n) {
                            var i = l(n);
                            t.push(i.find(".label-text").text())
                        });
                        var i = l(".dialog-report-content .report-textarea").val();
                        i && t.push(i), n.reason = t.join(";"), 2 == e.options.type && (n.toJid = e.options.toJid), 4 == e.options.type && (n.commentsId = e.options.commentsId), 5 == e.options.type && (n.linksId = e.options.linksId), e._sendReport(n, e.options.callBack ? e.options.callBack : "")
                    }
                }, {
                    key: "_reportSuccess",
                    value: function (e) {
                        window.CT.dialog({
                            title: "举报成功",
                            content: "你已经成功提交举报，我们将尽快核实与处理，感谢你帮助维护抽屉的社区治安",
                            okText: "好的",
                            autoClose: !0,
                            onOk: function () {
                                e && "function" == typeof e && e()
                            }
                        })
                    }
                }, {
                    key: "_sendReport",
                    value: function (e, n) {
                        l.ajax({
                            url: "/users/report",
                            type: "POST",
                            data: e,
                            customize: !1,
                            success: function (e) {
                                window.CT.showTopTips("success", e), n && "function" == typeof n && n(e)
                            },
                            error: function (e) {}
                        })
                    }
                }, {
                    key: "_sendBlack",
                    value: function (e, n) {
                        l.ajax({
                            url: "/users/black",
                            type: "POST",
                            data: e,
                            customize: !1,
                            success: function (e) {
                                n && "function" == typeof n && n(e)
                            },
                            error: function (e) {}
                        })
                    }
                }, {
                    key: "_removeReport",
                    value: function (e, n) {
                        l.ajax({
                            url: "/users/black/remove",
                            type: "POST",
                            data: e,
                            customize: !1,
                            success: function (e) {
                                n && "function" == typeof n && n(e)
                            },
                            error: function (e) {}
                        })
                    }
                }]), n
            }();
        _.extend(window.CT, {
            report: function (e) {
                return new n(e)
            }
        })
    }(jQuery);