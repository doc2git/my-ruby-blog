// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .

//设置根节点的fontSize
var designWidth = 1024;
(function () {
    var setFontSize = function () {
        designWidth = designWidth || 320;
        var domContainer = document.documentElement || document.body;
        var screenWidth = domContainer.clientWidth;
        domContainer.style.fontSize = screenWidth / designWidth * 100 + "px";
    };
    setFontSize();
    window.addEventListener('resize', setFontSize, false)
})(designWidth);

//给ie浏览器的事件对象添加通用调用接口
function ieEventCompatible(e) {
    e = window.event;
    e.target = e.srcElement;
    e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)
    e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
    e.preventDefault = function () {
        e.returnValue = false;
    };
    e.stopPropagation = function () {
        e.cancelBubble = true;
    }
}

//将html关键字符进行转义
function encodeHTML(text) {
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

//对输入框获得焦点病失去焦点后内容为空的处理，和执行html转义。
function hendleCommentContent(arguments) {
//获取最后一个“comment-area-box-display"中的innerText. 并且获得对应提交按钮。
    var commentBox = document.getElementsByClassName("comment-box")[0];
    // var inputingErea = areaBoxList[0];
    var commentContentInput = commentBox.getElementsByTagName('textarea')[0];
    var commentAreaBoxList = document.getElementsByClassName("comment-area-box-display");
    var commentAreaBox = commentAreaBoxList[0];
    // var value = encodeHTML(commentAreaBox.innerText);
    var value = commentAreaBox.innerText;
    var alreadyFocused = false;
    var genValue = function (val, callback) {
        var promise = new Promise(function (resolve, reject) {
            val = callback(val);
            resolve(val)
        });
        return promise;
    };
    var gotEmptyString = false;


    var inputingErea = commentAreaBoxList;
    for (var i = 0; i < commentAreaBoxList.length; i++) {
        var item = commentAreaBoxList[i];
        item.onfocus = function (ev) {
            ieEventCompatible(ev);
            alreadyFocused = true;
        };
        item.onblur = function (ev) {
            ieEventCompatible(ev);
            inputingErea = ev.target;
            value = encodeHTML(inputingErea.innerText);

            function formatVal(v) {
                v = v.replace(/(\s)/g, function () {
                    console.log(arguments[1], arguments[2], '69jjs');
                    return '';
                });
                return v;
            }

            function askIfGiveupComment(alreadyFocused) {
                if (!alreadyFocused || !gotEmptyString) return void 0;
                var giveup = confirm("你在上一个输入框没有输入字符，你是要放弃发言吗？");
                if (!giveup && gotEmptyString) inputingErea.focus();
                return void 0;
            }

            genValue(value, formatVal)
                .then(function (formatedValue) {
                    console.log(formatedValue.length, 'ok', 78);
                    if (formatedValue.length === 0) {
                        gotEmptyString = true;
                        return void 0;
                    }
                    return gotEmptyString;
                })
                .then(function (gotEmptyString) {
                    console.log(gotEmptyString, '109--++++109');
                    askIfGiveupComment(alreadyFocused, gotEmptyString);
                }).then(function () {
                alreadyFocused = false;
                gotEmptyString = false;
            });


            console.log(commentBox, commentBox.getElementsByClassName("article-comment-submit")[0], '77----s');
            var submitBtn = commentBox.getElementsByClassName("article-comment-submit")[0];
            var commentForm = commentBox.getElementsByTagName('form')[0];
            console.log(submitBtn, '78---');
            submitBtn.onclick = function () {
                value = commentAreaBox.innerText;
                commentContentInput.value = value;
                if (confirm(value + '---------' + commentContentInput.value)) commentForm.submit();
                console.log('clicked, 72----');
            }
        };
    }
}

function upCaseFirstLetterOfArticleTitle(titleEleSelector) {
    var dataTitle = document.getElementsByClassName(titleEleSelector);
    for (var i = 0; i < dataTitle.length; i++) {
        var item = dataTitle[i];
        item.innerText = item.innerText.replace(/^[a-z]/, function () {
            return arguments[0].toUpperCase()
        });
    }
    ;
}

function addEllipsisFollowCuttedArticleReview() {
    var dataContent = document.getElementsByClassName("data-content");
    for (var i = 0; i < dataContent.length; i++) {
        var item = dataContent[i],
            maxLen = 100,
            ellipsis = document.createElement('i');
        ellipsis.innerText = '...';
        if (item.innerText.length > maxLen) {
            item.innerText = item.innerText.substr(0, maxLen - 1).replace(/[.,;!?。，；！？]+$/, '');
            item.appendChild(ellipsis)
        }
    }
}

//如果当前uri中的pathname属性以“/articles”开头，就对详情页的评论框绑定相关事件
if (/^\/articles$/.test(window.location.pathname)) {
    //为document节点的DOMContentLoaded事件以二级事件绑定方式添加回调函数
    document.addEventListener("DOMContentLoaded", function (event) {
    });

    //为window.onload属性赋一个函数，这是dom0级事件，只在所有资源加载完成时，该函数才会被调用。
    window.onload = function () {
        upCaseFirstLetterOfArticleTitle("data-title");
        addEllipsisFollowCuttedArticleReview();
    };
}


//如果当前uri中的pathname属性以“/articles”开头，就对详情页的评论框绑定相关事件
if (/^\/articles\/.+/.test(window.location.pathname)) {
    //为document节点的DOMContentLoaded事件以二级事件绑定方式添加回调函数
    document.addEventListener("DOMContentLoaded", function (event) {
    });

    //为window.onload属性赋一个函数，这是dom0级事件，只在所有资源加载完成时，该函数才会被调用。
    window.onload = function () {
        hendleCommentContent();
        upCaseFirstLetterOfArticleTitle("article-title");
        addEllipsisFollowCuttedArticleReview();
    };
}
