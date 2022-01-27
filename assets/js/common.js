'use strict';
let ww = window.innerWidth;
let wh = window.innerHeight;
let sct = $(window).scrollTop();
const $body = $('body');
const $header = $('.js-header');

function positionHandle() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    sct = $(window).scrollTop();
    const contOT = $('.js-contWrap').offset().top;
    const $hCont = $('.js-header__inner');
    const $hBg = $('.js-header__bgimg');
    const hContHeight = $hCont.outerHeight();
    const hd = hContHeight - wh;
    const bgH = wh - hContHeight;
    const fvH = $('.js-firstView').innerHeight();
    if ($body.hasClass('top')) {
        if (contOT < sct) {
            $header.removeClass('is-posabs');
            $header.css({ 'top': '0' });
            if (hd > 0) { if (sct < hd) { $hCont.css({ 'top': -(sct) + 'px' }); } else { $hCont.css({ 'top': -(hd) + 'px' }); } } else { if (sct > hd) { $hCont.css({ 'top': '0' }); } }
        } else {
            $header.addClass('is-posabs');
            $header.css({ 'top': fvH + 'px' });
            $hCont.css({ 'top': '0' });
        }
    } else {
        $header.removeClass('is-posabs');
        $header.css({ 'top': '0' });
        if (hd > 0) { if (sct < hd) { $hCont.css({ 'top': -(sct) + 'px' }); } else { $hCont.css({ 'top': -(hd) + 'px' }); } } else { if (sct > hd) { $hCont.css({ 'top': '0' }); } }
    }
    $hBg.css({ 'height': bgH + 'px' });
    const scl = $(window).scrollLeft();
    const $fixed = $('.js-fixed');
    if (ww < 1200) { $fixed.css({ 'left': -(scl) + 'px' }); } else { $fixed.css({ 'left': '0' }); }
}
$(window).on('load scroll resize', positionHandle);

function resizeHandle() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    var agent = window.navigator.userAgent.toLowerCase();
    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
        if (ww < wh) {
            $("meta[name=viewport]").remove();
            $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">');
        } else {
            $("meta[name=viewport]").remove();
            $("head").append('<meta name="viewport" content="width=767">');
        }
    } else if ((agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document)) {
        $("meta[name=viewport]").remove();
        $("head").append('<meta name="viewport" content="width=767">');
    }
}
$(window).on('load resize', resizeHandle);
const $swiperCont = $('.swiper-container');

function swiperPosHandle() {
    $swiperCont.each(function() {
        const swiperThumbHeight = $(this).find('.js-swiperHeight:first-child').innerHeight();
        const $swiperButton = $(this).find('.js-swiper__buttonWrap');
        $swiperButton.css({ 'height': swiperThumbHeight + 'px' });
    });
}
if ($swiperCont.length) { $(window).on('load resize', swiperPosHandle); }
$(function() {
    function headerBgRandom() {
        const randnum = 1 + Math.floor(Math.random() * 3);
        const numClass = 'is-img' + randnum;
        $('.js-header__bgimg, .js-header__bgimg--sp').addClass(numClass);
    }
    headerBgRandom();
    let menuTimer;
    let menuItemTimer;
    const $menuItem = $(".js-menuItem");
    $(".js-menuBtn").on('click', function() {
        $(this).toggleClass('is-active');
        if ($(this).hasClass('is-active')) {
            $header.addClass('is-active');
            menuTimer = setTimeout(function() { $menuItem.each(function(i) { menuItemTimer = setTimeout(function() { $menuItem.eq(i).addClass('is-ani'); }, 90 * i); }); }, 300);
        } else {
            $header.removeClass('is-active');
            $menuItem.removeClass('is-ani');
            clearTimeout(menuTimer, menuItemTimer);
        }
    });
    const modalIF = $(".js-youtubeIframe, .js-goodsIframe");
    $(".js-modalOpen").on('click', function() {
        const modalID = $(this).data("modal");
        $("#" + modalID).fadeIn(500);
        $(".modalBox").fadeIn(500);
        $("body").css({ 'overflow': 'hidden' });
    });
    $(".js-youtubePlay").on('click', function() {
        const ytID = $(this).data("ytid");
        const ytURL = 'https://www.youtube.com/embed/' + ytID + '?autoplay=1&rel=0';
        setTimeout(function() { $(".js-youtubeIframe").attr("src", ytURL); }, 100);
    });
    $('.js-commentModalOpen').on('click', function() {
        $('.js-commentModal').html('');
        const commentID = $(this).data('commentid');
        setTimeout(function() { $('.js-commentModal').load('./comment/' + commentID + '.php'); }, 1);
    });
    $(".js-goodsModalOpen").on('click', function(e) {
        e.preventDefault();
        const goodsURL = $(this).attr('href');
        $('.js-goodsIframe').attr('src', goodsURL);
    });
    $(".js-modalClose").on('click', function() {
        $(".modalBox, .oneModal").fadeOut(500);
        setTimeout(function() { modalIF.attr('src', ''); }, 500);
        $("body").css({ 'overflow': '' });
    });
    $(".js-oneModalIn").on('click touchend', function(e) {
        if (!$(e.target).closest('.js-oneModalIn__cont').length) {
            $(".modalBox, .oneModal").fadeOut(500);
            setTimeout(function() { modalIF.attr('src', ''); }, 500);
            $("body").css({ 'overflow': '' });
        }
    });
    $(".js-anchor").on('click', function() {
        const speed = 1000;
        const href = $(this).attr("href");
        const target = $(href == "#" || href == "" ? 'html' : href);
        const position = target.offset().top;
        $('body,html').animate({ scrollTop: position }, speed, 'easeOutQuart');
        return false;
    });
});