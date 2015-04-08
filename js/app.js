(function() {
	'use strict';

	// init variables and values
	var box = $('.box'),
		boxClients = $('.box-clients');
	$('.solutions-wrap').css('opacity',0);
	$('.news-wrap').css('opacity',0);
	$('.success-wrap > h1').css('opacity',0);
	box.css('visibility','hidden');

	// Gallery
	var $gallery = $('.main-gallery').flickity({
		// options
		initialIndex: 0,
		wrapAround: true,
		autoPlay: 6000,
		prevNextButtons: false,
		cellAlign: 'center',
		pageDots: false,
		contain: true
	});

	  // Flickity instance
  var flkty = $gallery.data('flickity');
  // elements
  var $carousel = $('.carousel-buttons > ol');
  var $carouselButtons = $carousel.find('li.carousel-button');
  //$carouselButtons.eq(0).addClass('is-selected');
  
  // update selected carousel buttons
  $gallery.on( 'select.flickity', function() {
    console.log($carouselButtons.eq( flkty.selectedIndex ).textContent);
    $carouselButtons.filter('.is-selected')
      .removeClass('is-selected');
    $carouselButtons.eq( flkty.selectedIndex )
      .addClass('is-selected');
  });

  // select cell on button click
  $carousel.on( 'click', 'li.carousel-button', function() {
    var index = $(this).index();
    $gallery.flickity( 'select', index );
  });

	// scroll animations
	
	// scroll into view helper function
	// http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling/488073#488073
	var isScrolledIntoView = function(elem){
	    var $elem = $(elem);
	    var $window = $(window);
	    var docViewTop = $window.scrollTop();
	    var docViewBottom = docViewTop + $window.height();
	    var elemTop = $elem.offset().top;
	    var elemBottom = elemTop + $elem.height();
	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	};
	
	$(window).scroll(function(e) {
		//console.log($(this).scrollTop());
		if ($(this).scrollTop() >= 90) {
			$('.main-gallery').css('position', 'fixed');
			$('.hero-absolute').css('position', 'fixed');
			$('.hero-wrap').removeClass('fadeInUp').addClass('fadeOutDown');
			$('.hero-absolute').removeClass('fadeInUp').addClass('fadeOutDown');
		}

		if ($(this).scrollTop() <= 90) {
			//console.log('hero section');
			$('.main-gallery').css('position', 'relative');
			$('.hero-absolute').css('position', 'absolute');
			$('.we-do-wrap > h1').css('opacity', 0);
			$('.we-do-wrap > ul > li').css('opacity', 0);
		}

		if ($(this).scrollTop() === 0) {
			$('.hero-wrap').removeClass('fadeOutDown').addClass('fadeInUp');
	        $('.hero-absolute').removeClass('fadeOutDown').addClass('fadeInUp');
		}

		if(isScrolledIntoView($('.we-do-wrap'))){
			//console.log($(this).scrollTop());
			$('.hero').css('opacity', '1');
			$('.we-do-wrap > h1').addClass('fadeInUp');
			$.each($('.we-do-wrap > ul > li'), function(inx) {
				$(this).delay((inx) * 150).fadeTo(400, 1);
			});
		}
		if(isScrolledIntoView($('.solutions'))){
			//console.log($(this).scrollTop());
			$('.hero').css('opacity', '0');
			$('.solutions-wrap').addClass('fadeInUp');
		}

		if(isScrolledIntoView($('.news'))){
			//console.log($(this).scrollTop());
			$('.news-wrap').addClass('fadeInUp');
		}
		if(isScrolledIntoView(boxClients)){
			//console.log($(this).scrollTop());
			$('.success-wrap > h1').addClass('fadeInUp');
		}
		if(isScrolledIntoView(boxClients)){
			$.each(boxClients, function(i){
                	(boxClients.eq(i)).css({
                		'visibility': 'visible'                		
                }).delay((i * 1) * 100).fadeIn('slow').addClass('slideInUp').css({
                    		'-webkit-animation-duration': 0.5+i/2+'s',
    						'animation-duration': 0.5+i/2+'s'
                    	});
                	$.each(box, function(inx) {
                    	(box.eq(inx)).css({'visibility':'visible'}).delay((inx * 1) * 1000).addClass('slideInUp').css({
                    		'-webkit-animation-duration': 1+inx/10+'s',
    						'animation-duration': 1+inx/10+'s'
                    	});
                	});
                });
		}		

		// Back to top button
		$('.back-to-top').on('click', function(e){
    		$('html, body').stop().animate({scrollTop:$('.head-wrap').position().top}, 'slow');
    		return false;
		});

    });
})();

