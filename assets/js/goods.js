'use strict';
window.addEventListener('message', function(e) { $(".js-goodsIframe").css({ "height": e.data + 'px' }); }, false);