$(document).ready(function($) {
    var windowEl = $(window);
    var windowW = windowEl.width();
    var beforeWidth = $(this).width();

    // обновление страницы при масштабировании
    $(window).resize(function() {
        var afterWidth = $(this).width();
        if (afterWidth != beforeWidth) {
            location.reload()
        }
    })

    $('.composition-trigger').on('click', function() {
        $('.composition').slideToggle(500);
        $(this).toggleClass('composition-trigger-activ');
    });

    // services-item
    $('.benefits-slider-button').on('click', function(event) {
        $(this).addClass('benefits-activ').siblings().removeClass('benefits-activ');
    });

    //services-item fix
    $('.benefits-button-one').on('click', function(event) {
        $('.benefits-slide-one').fadeIn(1000).css('display', 'flex').siblings().hide().stop(true, true);
    });
    $('.benefits-button-two').on('click', function(event) {
        $('.benefits-slide-two').fadeIn(1000).css('display', 'flex').siblings().hide().stop(true, true);
    });
    $('.benefits-button-three').on('click', function(event) {
        $('.benefits-slide-three').fadeIn(1000).css('display', 'flex').siblings().hide().stop(true, true);
    });
    $('.benefits-button-four').on('click', function(event) {
        $('.benefits-slide-four').fadeIn(1000).css('display', 'flex').siblings().hide().stop(true, true);
    });

    $('#slider').slick({
        arrows: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [{
                breakpoint: 767,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    adaptiveHeight: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    adaptiveHeight: true,
                }
            },
        ]
    });



    if (windowW < 991) {
        $('.benefits-slider-buttons').children('li').removeClass('ben-hov');
        $('.benefits-slider-button').unbind('mouseenter mouseleave');
        $('.composition-info-items, .review-items').slick({
            arrows: false,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        });

        $(".btn, .footer-menu a").not('.home-submit-btn').on("click", function(event) {
            $('.popup-wrapp').addClass('popup-wrapp-open');
            $('.popup-form-wrapp').fadeIn('500');
            return false;
        });

    } else {
        // плавный переход по якорям
        $(".btn, .footer-menu a").not('.home-submit-btn').on("click", function(event) {
            event.preventDefault();
            var top = $("#home").offset().top;
            $('body,html').animate({ scrollTop: top }, 500);
            return false;
        });
    };

    $(".popup-form-wrapp-cross").not('.home-submit-btn').on("click", function(event) {
        $('.popup-wrapp').removeClass('popup-wrapp-open');
        $('.popup-form-wrapp').fadeOut('500');
        $('.popup-success').fadeOut('500');

        return false;
    });

    //form

    $('form').submit(function(e) {
        var thisForm = $(this);
        var form = $('form');
        var submitBtn = thisForm.find('input[type="submit"]');
        var data = new FormData(thisForm[0]);
        submitBtn.prop("disabled", true);
        $.ajax({
            url: '/mail.php',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            type: 'POST',
            success: function(data) {
                thisForm[0].reset();
                form[0].reset();
                submitBtn.prop("disabled", false);
                $('.popup-wrapp').addClass('popup-wrapp-open');
                $('.popup-form-wrapp').hide();
                $('.popup-success').fadeIn('500').css('display', 'flex');
                $('.popup-form-wrapp-cross-white').hide();
                // $(dataLayer.push({ 'event': 'event_lendos' }));
            },
            error: function() {
                alert('Something went wrong!');
                submitBtn.prop("disabled", false);
            }
        });
        e.preventDefault();
    });


    $('select').on('change', function() {
        $(this).find('option').removeClass('selected');
        $(this).find('option:selected').addClass('selected');
    });

});