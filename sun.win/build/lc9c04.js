"use strict";

var ipv4 = true, ipv6 = true;
var LC_API = LC_API || {};

LC_API.on_after_load = function() {
  if (isMobile) {
    LC_API.hide_chat_window();
    $('a.icon-livechat').show();
  }

  setInterval(function(){
    if (isMobile) {
      if (LC_API.chat_window_maximized())
        $('a.icon-livechat').hide();
      else if (LC_API.chat_window_hidden())
        $('a.icon-livechat').show();
      else {
        LC_API.hide_chat_window();
        $('a.icon-livechat').show();
      }
    }
  },450);
};

window.__lc = window.__lc || {};
window.__lc.license = 14834214;
window.__lc.chat_between_groups = false;

var t = setInterval(function(){
  if (ipv4 !== true && ipv6 !== true) {
    clearInterval(t);

    window.__lc.visitor = {
      name: 'Khách'
    };
    window.__lc.params = [
      { name: 'Login', value: 'Khách' },
      { name: 'Domain', value: window.location.hostname },
      { name: 'IPV4', value: ipv4 },
      { name: 'IPV6', value: ipv6 }
    ];
    (function() {
      var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
      lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
    })();
  }
}, 10);

$(document).ready(function(){
  getIP();

  $('a.icon-livechat, a#forgotpwd').on('click', function(){
    LC_API.open_chat_window();
  });
});

var getIP = function() {
  // get ipv4
  $.ajax({
    type: "GET",
    url: "https://api4."+ conf.logip +"/ca/res?command=getIP",
    dataType: 'json',
    success: function(result){
      ipv4 = result.data.ip;
    },
    error: function(){ipv4 = false;}
  });

  // get ipv6
  $.ajax({
    type: "GET",
    url: "https://api6."+ conf.logip +"/ca/res?command=getIP",
    dataType: 'json',
    success: function(result){
      ipv6 = result.data.ip;
    },
    error: function(){ipv6 = false;}
  });
};