jQuery(function() {
  
  // Replace Select

  jQuery("select").uniform(); jQuery('div.selector').prepend('<i class="icon-chevron-down"></i>');
  
  // Sticky Nav

  if( jQuery(window).width() > 660 ) {
    
    jQuery("nav.nav").sticky({
      topSpacing: 0,
      getWidthFrom: jQuery('body'),
      responsiveWidth: true
    });
    
  }
  
  // EU cookie popup
  
  if ( 'set' !== $.cookie('cookie-check') ) {
  
    var html = '<div class="cookies">';
    html += 'We use cookies to help make this website better. You can find out more about how this website uses cookies <a href="/cookies/">here</a>.';
    html += '<button id="accept-cookie">OK</button>';
    html += '</div>';

    jQuery( 'body' ).prepend(html);
  
    jQuery( '#accept-cookie' ).click(function () {
      $.cookie('cookie-check','set');
      jQuery('.cookies').remove();
    });
  
  }
  
  // Check if Newsletter was closed
  if ( 'set' !== $.cookie('newsletter-closed') ) {
  
    // Hide slidebox on page load
    
    jQuery('#slidebox').css('bottom', '-' + jQuery('#slidebox').outerHeight() + 'px');
    
    // Show slidebox when sidebar finished
  
    jQuery(window).scroll(function(){
  
  		var distanceTop = jQuery('#newsletter-check').offset().top - jQuery(window).height();
  
  		if (jQuery(window).scrollTop() > distanceTop) {
  
  			jQuery('#slidebox').transit({'bottom':'0px'},300);
  
  		}
  
  	});
  
    // Close slidebox when close button clicked
  
  	jQuery('#slidebox .close').bind('click',function(){
  
  		jQuery(this).parent().remove();
  		
  		$.cookie('newsletter-closed','set');
  
  	});
  	
  }
  
});