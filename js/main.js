/* ========================================================================= */
/*  Preloader Script
/* =========================================================================

window.onload = function () {
    document.getElementById('loading-mask').style.display = 'none';
} */

$(function(){
    /* ========================================================================= */
    /*  Menu item highlighting
    /* ========================================================================= */

    //jQuery(window).scroll(function () {
      
        jQuery("#navigation").addClass("animated-nav");
        //if (jQuery(window).scrollTop() > 400) {
        //    jQuery("#navigation").css("background-color","#00C7FC");
        //    jQuery("#navigation").addClass("animated-nav");
        //} else {
        //    jQuery("#navigation").css("background-color","red");
        //    jQuery("#navigation").removeClass("animated-nav");
        //}
    //});

    $('#nav').onePageNav({
        filter: ':not(.external)',
        scrollSpeed: 950,
        scrollThreshold: 1
    });

    // Slider Height
    var slideHeight = $(window).height();
    $('#home-carousel .carousel-inner .item, #home-carousel .video-container').css('height',slideHeight);

    $(window).resize(function(){'use strict',
        $('#home-carousel .carousel-inner .item, #home-carousel .video-container').css('height',slideHeight);
    });

    // portfolio filtering

    $("#projects").mixItUp();

    //fancybox

    $(".fancybox").fancybox({
        padding: 0,

        openEffect : 'elastic',
        openSpeed  : 650,

        closeEffect : 'elastic',
        closeSpeed  : 550,
    });


    /* ========================================================================= */
    /*  Facts count
    /* ========================================================================= */

    "use strict";
    $(".fact-item").appear(function () {
        $(".fact-item [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 50,
                to: e,
                speed: 3e3,
                refreshInterval: 50
            })
        })
    });

/* ========================================================================= */
/*  On scroll fade/bounce fffect
/* ========================================================================= */

    $("#testimonial").owlCarousel({
        pagination : true, // Show bullet pagination
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
    });

});

/* ========================================================================= */
/*  On scroll fade/bounce fffect
/* ========================================================================= */

    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        mobile: false
    });
    wow.init();

/* ---------------------------------------------------------------------- */
/*      Progress Bars
/* ---------------------------------------------------------------------- */

initProgress('.progress');

function initProgress(el){
    jQuery(el).each(function(){
        var pData = jQuery(this).data('progress');
        progress(pData,jQuery(this));
    });
}


            
function progress(percent, $element) {
    var progressBarWidth = 0;
    
    (function myLoop (i,max) {
        progressBarWidth = i * $element.width() / 100;
        setTimeout(function () {   
        $element.find('div').find('small').html(i+'%');
        $element.find('div').width(progressBarWidth);
        if (++i<=max) myLoop(i,max);     
        }, 10)
    })(0,percent);  
}   

searchQuestionsResults = {
    searchResults: function () {
        $('#divPostAnswer,#btnPostAnswer').addClass('clshidden');
        $('#alertPostAnswer').removeClass('clshidden').addClass('clsshow');
        $('#showSearchResults').removeClass('clshidden').addClass('clsshow');
    },
    submitAnswer: function () {
        $('#divPostAnswer,#btnPostAnswer').addClass('clshidden');
        $('#alertPostAnswer').removeClass('clshidden').addClass('clsshow');
    }
}

//Scroll to top Js
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
//Scroll to top Js

//Contact Sticky form
$(document).ready(function () {
    var _scroll = true, _timer = false, _floatbox = $("#contact_form"), _floatbox_opener = $(".contact-opener");
    _floatbox.css("right", "-320px"); //initial contact form position

    //Contact form Opener button
    _floatbox_opener.click(function () {
        if (_floatbox.hasClass('visiable')) {
            _floatbox.animate({ "right": "-320px" }, { duration: 300 }).removeClass('visiable');
        } else {
            _floatbox.animate({ "right": "0px" }, { duration: 300 }).addClass('visiable');
        }
    });

    //Effect on Scroll
    //$(window).scroll(function () {
    if (_scroll) {
        _floatbox.animate({ "top": "30px" }, { duration: 300 });
        _scroll = false;
    }
    if (_timer !== false) { clearTimeout(_timer); }
    _timer = setTimeout(function () {
        _scroll = true;
        _floatbox.animate({ "top": "60px" }, { easing: "linear" }, { duration: 500 });
    }, 400);
    //});


    //Ajax form submit
    $("#submit_btn").click(function () {
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function () {
            $(this).css('border-color', '');
            if (!$.trim($(this).val())) { //if this field is empty
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
        });

        if (proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            post_data = {
                'user_name': $('input[name=name]').val(),
                'user_email': $('input[name=email]').val(),
                'country_code': $('input[name=phone1]').val(),
                'phone_number': $('input[name=phone2]').val(),
                'subject': $('select[name=subject]').val(),
                'msg': $('textarea[name=message]').val()
            };

            //Ajax post data to server
            $.post('contact_me.php', post_data, function (response) {
                if (response.type == 'error') { //load json data from server and output message
                    output = '<div class="error">' + response.text + '</div>';
                } else {
                    output = '<div class="success">' + response.text + '</div>';
                    //reset values in all input fields
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val('');
                }
                $("#contact_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function () {
        $(this).css('border-color', '');
        $("#result").slideUp();
    });
    $("#Register").click(function () {
        $('#SignupSigninModel,#ForgotPasswordModel').modal('hide');
        $('#SignupModel').modal('show');
    });

    $("#fpwd").click(function () {
        $('#SignupSigninModel,#SignupModel').modal('hide');
        $('#ForgotPasswordModel').modal('show');
    });

    $("#login,#loginfpwd").click(function () {
        $('#ForgotPasswordModel,#SignupModel').modal('hide');
        $('#SignupSigninModel').modal('show');
    });

});
//Contact Sticky form
