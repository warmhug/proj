

jQuery(window).load(function($){

  "use strict"; // jshint ;_;
    var realScreenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

  	/*===========================================================*/
	/*	Revolution Slider
	/*===========================================================*/	
	var tpj=jQuery;
	tpj.noConflict();

});



$(document).ready(function($) {

    //  ==========
    //  = Scroll event function =
    //  ==========
    var goScrolling = function(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = elem.offset().top;
        var elemBottom = elemTop + elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };
    //  ==========
    //  = Progress bars =
    //  ==========
    $('.progress .bar').data('width', $(this).width()).css({
        width : 0
    });
    $(window).scroll(function() {
        $('.progress .bar').each(function() {
            if (goScrolling($(this))) {
                $(this).css({
                    width : $(this).attr('data-value') + '%'
                });
            }
        });
    })


	 /*----------------------------------------------------------*/
	 /*FLEX SLIDER*/
	 /*----------------------------------------------------------*/
	$('.testi').flexslider({
				animation:"slide",
				easing:"swing",
				controlNav: true, 
				reverse:true,
				smoothHeight:false,
				directionNav: false, 
				controlsContainer: '.testi-container',
				slideshowSpeed: 9000
	});


    /*==================================================
	/*	Tooltip
	/*================================================== */
	$( 'body' ).tooltip({
		selector: "a[data-toggle=tooltip]"
	});


	/*===========================================================*/
	/*	FancyBox & toTop
	/*===========================================================*/	
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});




	/*===========================================================*/
	/*	Sticky Nav
	/*===========================================================*/	
	
	function scrollTo(target){
		$.scrollTo( $(target), 800 );
	}

	$('.navMenu').onePageNav({
		currentClass: 'current',
	    changeHash: false,
	    scrollSpeed: 750,
	    scrollOffset: 30,
	    scrollThreshold: 0.5,
	    filter: '',
	    easing: 'swing',
	    begin: function() {
	        //I get fired when the animation is starting
	    },
	    end: function() {
	        //I get fired when the animation is ending
	    },
	    scrollChange: function($currentListItem) {
	        //I get fired when you enter a section and I pass the list item of the section
	    }
	});
	



	/*$(".menu").sticky({topSpacing:0});*/
	$(".headContent").sticky({topSpacing:0});
	
      // Create the dropdown base
      $("<select />").appendTo("nav");
      
		// Create default option "Go to..."
		$("<option />", {
			"selected": "selected",
			"value"   : "",
			"text"    : "Go to..."
		}).appendTo("nav select");
      
      // Populate dropdown with menu items
      $("nav a").each(function() {
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo("nav select");
      });
      
	   // To make dropdown actually work
      $("nav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });





	/*===========================================================*/
	/*	Jquery Lavalamp Menus
	/*===========================================================*/	
	$('nav').lavaLamp({
		fx: 'easeOutQuad',
		autoResize:true,
		speed: 500,
		startItem:0
	});
	
	document.getElementById('nav').scrollIntoView()

    // Placeholders for input/textarea
    $("input, textarea").placeholder();
         // Focus state for append/prepend inputs
    $('.input-prepend, .input-append').on('focus', 'input', function () {
      $(this).closest('.control-group, form').addClass('focus');
    }).on('blur', 'input', function () {
      $(this).closest('.control-group, form').removeClass('focus');
    });



    // Tabs
    $(".nav-tabs a").on('click', function (e) {
      e.preventDefault();
      $(this).tab("show");
    })

    jQuery(".accordion").on("show",function (e) {
        jQuery(e.target).prev(".accordion-heading").find(".accordion-toggle").addClass("active");
    }).on("hide",function (e) {
                jQuery(this).find(".accordion-toggle").not(jQuery(e.target)).removeClass("active");
            }).each(function () {
                var $a = jQuery(this);
                $a.find("a.accordion-toggle").attr("data-parent", "#" + $a.attr("id"));
            });




		var hash = window.location.hash,
			hashParts = hash.split("&");
		if (hash.length > 1){
			$("a[href='" + hashParts[0] + "']").trigger("click");
			setTimeout(function(){
				$("a[href='#" + hashParts[1] + "']").trigger("click");
			},100);
		}

/*********remove active class top menu**********/
		$(".navbar").each(function(){
			var self = $(this);
			self.find("a[href^='#']").on("click", function(){
				if (self.find("button[data-toggle='collapse']").is(":visible")) {
					self.find("button[data-toggle='collapse']").trigger("click");
				}
			});
		});
  function scrollTo(target){
		$.scrollTo( $(target), 2000 );
	}

    $('[data-spy="scroll"]').each(function () {
    	var $spy = $(this).scrollspy('refresh')
    });




});



