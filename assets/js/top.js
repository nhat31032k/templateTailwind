'use strict';
let hs = location.hash;
const skiped = hs === '#skip';
const $loadingWrap = $('.js-loadingWrap');
const $loading = $('.js-loading');
const $aniCont = $('.js-firstView, .js-visualWrap, .js-catchWrap, .js-bnrAni');
$(window).on('load', function() {
    if (skiped) {
        $aniCont.addClass('is-ani');
        $loadingWrap.remove();
        topScrollAnimtaion();
    } else if (!(skiped) && $(hs)[0]) {
        $('body,html').animate({ scrollTop: 0 }, 10);
        const contTarget = $(hs).offset().top;
        $loading.addClass('is-fadeIn');
        setTimeout(function() {
            $loading.removeClass('is-fadeIn');
            $loading.addClass('is-fadeOut');
            setTimeout(function() {
                $loadingWrap.fadeOut(500, function() {
                    $loadingWrap.remove();
                    $aniCont.addClass('is-ani');
                    familyChange();
                    topScrollAnimtaion();
                    $('body,html').animate({ scrollTop: contTarget }, 1000, 'easeOutQuart');
                });
            }, 600);
        }, 1500);
    } else {
        $loading.addClass('is-fadeIn');
        setTimeout(function() {
            $loading.removeClass('is-fadeIn');
            $loading.addClass('is-fadeOut');
            setTimeout(function() {
                $loadingWrap.fadeOut(500, function() {
                    $loadingWrap.remove();
                    $aniCont.addClass('is-ani');
                    if ($.cookie('movieBtn') != 'on') { setTimeout(function() { $('.js-firstMovie').click(); }, 1500); }
                    $('.js-firstMovie').on('click', function() { $.cookie('movieBtn', 'on', { expires: 1, }); });
                    familyChange();
                    topScrollAnimtaion();
                });
            }, 600);
        }, 1500);
    }
});

function familyChange() {
    setInterval(function() {
        $body.toggleClass('is-family');
        const $vsSpy = $('.js-visual__spy');
        const $vsFamily = $('.js-visual__family');
        if ($vsSpy.hasClass('is-active')) {
            setTimeout(function() {
                $vsSpy.removeClass('is-active');
                $vsFamily.addClass('is-active');
            }, 300);
        } else if ($vsFamily.hasClass('is-active')) {
            setTimeout(function() {
                $vsFamily.removeClass('is-active');
                $vsSpy.addClass('is-active');
            }, 300);
        }
    }, 30000);
}

function topScrollAnimtaion() {
    wh = window.innerHeight;
    sct = $(window).scrollTop();
    const $textItem = $('.charaFirst');
    const charaSectionOT = ($('.js-charaSection').offset().top) - 100;
    if (skiped) {
        $textItem.remove();
        $('.js-charaSection').addClass('is-active');
        $('.charaListsWrap').addClass('is-active');
    } else {
        if (sct >= charaSectionOT) {
            $textItem.addClass('is-fadeIn');
            $('.js-charaSection').addClass('is-active');
            setTimeout(function() {
                $textItem.removeClass('is-fadeIn');
                $textItem.addClass('is-fadeOut');
                $('.charaListsWrap').addClass('is-active');
            }, 1500);
        }
    }
    $('.js-sectionTitle').each(function() { const sectionTitleOT = $(this).offset().top; if (skiped) { $(this).addClass('is-ani'); } else { if (sct > sectionTitleOT - wh + wh / 5) { $(this).addClass('is-ani'); } else { $(this).removeClass('is-ani'); } } });
}
$(window).on('resize scroll', topScrollAnimtaion);

function visualSize() {
    const firstviewHeight = $('.js-firstView').innerHeight();
    $('.js-visualWrap').css({ 'width': firstviewHeight + 'px', 'height': firstviewHeight + 'px' });
}
$(window).on('load resize', visualSize);
const $charaItem = $('.js-charaItem');
const $charathumbItem = $('.js-charathumbLink');
let swiperTouchStartX;
const charaSwiper = new Swiper('.js-charaListsSwiper', {
    loop: false,
    direction: 'horizontal',
    autoHeight: false,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 0,
    pagination: { el: '.charaSwiper__pager', renderBullet: function(index, className) { return '<span class="' + className + '">' + '<img src="./assets/img/top/chara_thumb' + (index + 1) + '.png" alt="">' + '</span>'; }, clickable: true, },
    effect: "fade",
    on: {
        init(swiper) {
            const totalSlidesLen = swiper.slides.length;
            swiper.el.querySelector('.js-charaSw-prev').addEventListener('click', () => { if (swiper.isBeginning) { swiper.slideTo(totalSlidesLen - 1); } else { swiper.slideTo(swiper.realIndex - 1); } });
            swiper.el.querySelector('.js-charaSw-next').addEventListener('click', () => { if (swiper.isEnd) { swiper.slideTo(0); } else { swiper.slideTo(swiper.realIndex + 1); } });
        },
        touchStart(swiper, e) { if (e.type === 'touchstart') { swiperTouchStartX = e.touches[0].clientX; } else { swiperTouchStartX = e.clientX; } },
        touchEnd(swiper, e) { const tolerance = 150; const totalSlidesLen = swiper.slides.length; const diff = (() => { if (e.type === 'touchend') { return e.changedTouches[0].clientX - swiperTouchStartX; } else { return e.clientX - swiperTouchStartX; } })(); if (swiper.isBeginning && diff >= tolerance) { swiper.slideTo(totalSlidesLen - 1); } else if (swiper.isEnd && diff <= -tolerance) { setTimeout(() => { swiper.slideTo(0); }, 1); } },
    },
});
$(function() {
    $charaItem.each(function() {
        const $changeBtn = $(this).find('.js-visualChange');
        const charaImgLen = $(this).find('.charaImgLists__item').length;
        const $charaImgItem_1 = $(this).find('.charaImgLists__item:nth-child(1)');
        let $charaImgItem_2;
        if (charaImgLen > 1 && charaImgLen >= 2) { $charaImgItem_2 = $(this).find('.charaImgLists__item:nth-child(2)'); }
        $changeBtn.on('click', function() {
            if ($charaImgItem_1.hasClass('is-active')) {
                $charaImgItem_1.removeClass('is-active');
                $charaImgItem_2.addClass('is-active');
            } else {
                $charaImgItem_1.addClass('is-active');
                $charaImgItem_2.removeClass('is-active');
            }
        });
        const $textChangeBtn = $(this).find('.js-textChange');
        const charaTextLen = $(this).find('.charaLists__detail').length;
        const $charaTextItem_1 = $(this).find('.charaLists__detail:nth-child(1)');
        let $charaTextItem_2;
        if (charaTextLen > 1 && charaTextLen >= 2) { $charaTextItem_2 = $(this).find('.charaLists__detail:nth-child(2)'); }
        $textChangeBtn.on('click', function() {
            if ($charaTextItem_1.hasClass('is-active')) {
                $charaTextItem_1.removeClass('is-active');
                $charaTextItem_2.addClass('is-active');
            } else {
                $charaTextItem_1.addClass('is-active');
                $charaTextItem_2.removeClass('is-active');
            }
        });
    });
});
$(function() {
    const $movieItem = $('.js-movieItem');
    $movieItem.each(function() {
        const movieLink = $(this).find('a');
        const youtubeID = movieLink.data('ytid');
        movieLink.css({ 'background-image': 'url(https://i.ytimg.com/vi/' + youtubeID + '/maxresdefault.jpg)' });
    });
});
const movieSwiper = new Swiper('.js-movieListsSwiper', { loop: false, direction: 'horizontal', autoHeight: false, slidesPerView: 'auto', centeredSlides: true, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', }, pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true, }, });
const gallerySwiper = new Swiper('.js-galleryListsSwiper', { loop: false, direction: 'horizontal', slidesPerView: 'auto', centeredSlides: true, breakpoints: { 1200: { slidesPerView: 2, spaceBetween: 30, centeredSlides: false, } }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', }, pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true, }, });
$(function() {
    $(".js-nanchor").on('click', function() {
        $(".js-menuBtn").removeClass('is-active');
        $header.removeClass('is-active');
        const speed = 1000;
        const href = $(this).attr("href");
        const target = $(href == "#" || href == "" ? 'html' : href);
        const position = target.offset().top;
        $('body,html').animate({ scrollTop: position }, speed, 'easeOutQuart');
        return false;
    });
});
const $navLink = $('.js-navLink');
let contentsArr = [];

function targetContents() {
    const startH = 100;
    for (let i = 0; i < $navLink.length; i++) {
        const targetContents = $navLink.eq(i).attr('href');
        const targetContentsTop = $(targetContents).offset().top - startH;
        const targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
        contentsArr[i] = [targetContentsTop, targetContentsBottom]
    }
}
$(window).on('load resize', targetContents);

function currentCheck() {
    sct = $(window).scrollTop();
    ww = window.innerWidth;
    wh = window.innerHeight;
    const $footer = $('.js-footer');
    const footerH = $footer.innerHeight();
    let endH = footerH / 2;
    if (ww < 768) { endH = wh - footerH; }
    const footerOT = $footer.offset().top - endH;
    for (let i = 0; i < contentsArr.length; i++) {
        if (contentsArr[i][0] <= sct && contentsArr[i][1] >= sct) {
            $navLink.removeClass('is-active');
            if (footerOT <= sct) { $navLink.removeClass('is-active'); } else { $navLink.eq(i).addClass('is-active'); }
            i == contentsArr.length;
        }
    }
}
$(window).on('load resize scroll', currentCheck);
let titleTextBox = document.querySelectorAll('.js-sectionTitle');
for (let i = 0; i < titleTextBox.length; i++) {
    let titleText = titleTextBox[i].textContent;
    titleTextBox[i].innerHTML = '';
    titleText.split('').forEach(function(c) { titleTextBox[i].innerHTML += '<span>' + c + '</span>'; });
}