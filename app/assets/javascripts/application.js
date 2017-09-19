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

var designWidth = 1024;
(function () {
    var setFontSize = function () {
        designWidth = designWidth || 1024;
        var domContainer = document.documentElement || document.body;
        var screenWidth = domContainer.clientWidth;
        domContainer.style.fontSize = screenWidth / designWidth * 100 + "px";
    };
    setFontSize();
    window.addEventListener('resize', setFontSize, false)
})(designWidth);

window.onload = function () {
    var dataTitle = document.getElementsByClassName("data-title");
    for (var i = 0; i < dataTitle.length; i++) {
        var item = dataTitle[i];
        item.innerText = item.innerText.replace(/^[a-z]/, function () {
            return arguments[0].toUpperCase()
        });
    };
    var dataContent = document.getElementsByClassName("data-content");
    for (var i = 0; i < dataContent.length; i++) {
        var item = dataContent[i],
            maxLen = 100,
            ellipsis = document.createElement('i');
        ellipsis.innerText = '...';
        if(item.innerText.length > maxLen) {
            item.innerText = item.innerText.substr(0, maxLen - 1 ).replace(/[.,;!?。，；！？]+$/, '');
            item.appendChild(ellipsis)
        }
    }
};
