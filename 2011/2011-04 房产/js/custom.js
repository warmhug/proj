jQuery.noConflict();

jQuery(document).ready(function () {
    // Slider navigation hover effect
    sliderHover();

    // PRETTYPHOTO
    jQuery("a[rel^='prettyPhoto']").prettyPhoto();

    // CUFON
    Cufon.replace('h1,h2,h3,h4,#newsslider_list li a, .button-dark span, #featured-menu a', { hover: true });

    // HOVER EFFECT ON PORTFOLIO/GALLERY THUMBNAILS
    portfolioHover();

    // TOGGLE FUNCTION
    toggleMenu();


    // TAB PANEL
    tabPanel();

    // NEWS SLIDER PANEL
    newsPanel();

    // PRIMARY MENU HOVER EFFECT
    primaryHover();




    // LOGO HOVER FUNCTION
    if (!jQuery.browser.msie) {
        jQuery("#logo").hover(function () {
            jQuery("#logo img").stop().fadeTo("slow", 0.5);
        }, function () {
            jQuery("#logo img").stop().fadeTo("slow", 1);

        });
    }

    // CYCLE GALLERY
    jQuery('#gallerycycle').cycle({
        fx: 'fade',
        speed: 300,
        easing: 'easeInOutQuad',
        cleartype: 1,
        pause: 0,
        timeout: 0,
        next: '#next-gallery',
        prev: '#prev-gallery'
    });

    jQuery('#galleryslider').cycle({
        fx: 'fade',
        speed: 300,
        easing: 'easeInOutQuad',
        cleartype: 1,
        pause: 0,
        timeout: 0,
        next: '#next-gallery',
        prev: '#prev-gallery'

    });


    // CYCLE SLIDERS

    var $home_slider_effect = "fade";// jQuery("meta[name=home_slider_effect]").attr('content');
    var $home_slider_timeout = 6000; // jQuery("meta[name=home_slider_timeout]").attr('content');

    jQuery('#slide-frame div:first').fadeIn(1000, function () {
        jQuery('#cycle').cycle({
            //fx: $home_slider_effect,
            fx: $home_slider_effect,
            speed: 1000,
            easing: 'easeInOutQuad',
            cleartype: 1,
            pause: 1,
            timeout: $home_slider_timeout,
            next: '.n-slide',
            prev: '.p-slide'
        });
    });


});


function primaryHover() {

    jQuery("#primary-menu ul ul").hover(function () {
        jQuery(this).parent(this, "li").addClass("primary-active");
    }, function () {
        jQuery(this).parent(this, "li").removeClass("primary-active");

    });

}

function sliderHover() {


    jQuery("#feature-wrap").hover(function () {
        jQuery(this).find(".p-slide, .n-slide").stop().fadeTo('fast', 1);
    }, function () {
        jQuery(this).find(".p-slide, .n-slide").stop().fadeTo('fast', 0);
    });

}

// TAB PANEL
function tabPanel() {

    //Default Action
    jQuery(".tabcontent").hide(); //Hide all content
    jQuery(".tabcontentwide").hide(); //Hide all content
    jQuery("#tabnav li:first").addClass("active").fadeIn('fast'); //Activate first tab
    jQuery(".tabcontent:first").show(); //Show first tab content
    jQuery(".tabcontentwide:first").show(); //Show first tab content

    //On Click Event
    jQuery("ul#tabnav li").click(function () {
        jQuery("ul#tabnav li").removeClass("active"); //Remove any "active" class
        jQuery(this).addClass("active"); //Add "active" class to selected tab
        jQuery(".tabcontent").hide(); //Hide all content
        jQuery(".tabcontentwide").hide() //Hide all content
        var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        jQuery(activeTab).stop().fadeIn('fast'); //Fade in the active content
        return false;
    });

}

// TAB PANEL
function newsPanel() {

    //Default Action
    jQuery(".newsslider-content").hide(); //Hide all content

    jQuery("#newsslider_list li:first").addClass("active").show(); //Activate first tab
    jQuery(".newsslider-content:first").show(); //Show first tab content


    //On Click Event
    jQuery("ul#newsslider_list li").hover(function () {
        jQuery("ul#newsslider_list li").removeClass("active"); //Remove any "active" class
        jQuery(this).addClass("active"); //Add "active" class to selected tab
        jQuery(".newsslider-content").hide(); //Hide all content
        var activeTab = jQuery(this).find("a").attr("rel"); //Find the rel attribute value to identify the active tab + content
        jQuery(activeTab).show(); //Fade in the active content
        return false;
    });

}
// HOVER EFFECT ON PORTFOLIO/GALLERY IMAGES
function portfolioHover() {
    // PORTFOLIO AND GALLERY ZOOM
    jQuery(".portfolio .zoom").css({ 'opacity': '0' });
    jQuery(".portfolio").hover(function () {
        jQuery(".zoom", this).stop().fadeTo("slow", 1);
    }, function () {
        jQuery(".zoom", this).stop().fadeTo("slow", 0);

    });


    jQuery(".portfolio").hover(function () {
        jQuery(this).stop().fadeTo("medium", 0.8);
    }, function () {
        jQuery(this).stop().fadeTo("slow", 1);

    });
}

// TOGGLE
function toggleMenu() {

    jQuery(".toggle_container").hide();

    //Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
    jQuery("h2.trigger").click(function () {
        jQuery(this).toggleClass("active").next().slideToggle("slow");
        return false; //Prevent the browser jump to the link anchor
    });

}

// OPEN LINKS IN NEW WINDOW
jQuery(function () {
    jQuery('a[rel*=external]').click(function () {
        window.open(this.href);
        return false;
    });
});

// JavaScript Document

/* 
* Cross-browser event handling, by Scott Andrew
*/
function addEvent(element, eventType, lamdaFunction, useCapture) {
    if (element.addEventListener) {
        element.addEventListener(eventType, lamdaFunction, useCapture);
        return true;
    } else if (element.attachEvent) {
        var r = element.attachEvent('on' + eventType, lamdaFunction);
        return r;
    } else {
        return false;
    }
}

/*
* Clear Default Text: functions for clearing and replacing default text in
* <input> elements.
*
* by Ross Shannon, http://www.yourhtmlsource.com/
*/

addEvent(window, 'load', init, false);

function init() {
    var formInputs = document.getElementsByTagName('input');
    for (var i = 0; i < formInputs.length; i++) {
        var theInput = formInputs[i];

        if (theInput.type == 'text' && theInput.className.match(/\bcleardefault\b/)) {
            /* Add event handlers */
            addEvent(theInput, 'focus', clearDefaultText, false);
            addEvent(theInput, 'blur', replaceDefaultText, false);

            /* Save the current value */
            if (theInput.value != '') {
                theInput.defaultText = theInput.value;
            }
        }
    }
}

function clearDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;

    if (target.value == target.defaultText) {
        target.value = '';
    }
}

function replaceDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;

    if (target.value == '' && target.defaultText) {
        target.value = target.defaultText;
    }
}

// Reverses the z-indexing for correcting ie7 z-index issues
jQuery(function () {
    var zIndexNumber = 1000;
    jQuery('div').each(function () {
        jQuery(this).css('zIndex', zIndexNumber);
        zIndexNumber -= 10;
    });
});