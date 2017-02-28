jQuery(function() {
  
  // Replace Select

  jQuery("select").uniform(); jQuery('div.selector').prepend('<i class="icon-chevron-down"></i>');

  // Carousel
  
  jQuery('.slides').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: 'progressive',
    adaptiveHeight: true
  });
  
  // Sticky Nav

  if( jQuery(window).width() > 660 ) {
    
    jQuery("nav.nav").sticky({
      topSpacing: 0,
      getWidthFrom: jQuery('body'),
      responsiveWidth: true
    });
    
  }

  // scroll down button

  jQuery(".home header .scroll-down").on('click', function(e){
    $('html, body').animate({
        scrollTop: $("main").offset().top - 100 
    }, 500);
  });
  
  // Form Limiters
  
  jQuery('input[maxlength],textarea[maxlength]').each(function( index ) {
    
    jQuery(this).limiter(
      jQuery(this).attr('maxlength'),
      jQuery(this).prev().find('span.limit')
    );
    
  });
  
  // Form Suggestions

  if( jQuery("input[data-suggest]").length > 0 ) {
    
    var suggest = new Awesomplete( jQuery("input[data-suggest]")[0] );
    suggest.list = [
      "Abu Dhabi","Amman","Amsterdam","Athens","Baku","Barcelona","Basel","Beirut","Berlin","Birmingham","Bordeaux","Bristol","Brussels","Bucharest","Budapest","Cairo","Cape Town","Copenhagen","Doha","Dubai","Dublin","Durban","Dusseldorf","Frankfurt","Geneva","Genoa","Gothenburg","Hamburg","Helsinki","Istanbul","Jeddah","Johannesburg","Krakow","Lagos","Lausanne","Leeds","Lille","Lisbon","London","Lyon","Madrid","Manama","Manchester","Marseille","Milan","Moscow","Munich","Nairobi","Nantes","Newcastle","Nice","Oslo","Padua","Paris","Porto","Prague","Riyadh","Rome","Rotterdam","Saint Petersburg","Sheffield","Sofia","Stockholm","Strasbourg","Tallinn","Tel Aviv","Toulouse","Turin","Valencia","Vienna","Warsaw","Zurich"
    ];
    
  }
  
  // Form Add/Remove
  
  jQuery('form').on('click', function(e){

    var t = e.target; var $t = jQuery(e.target);
    
    if( t.nodeName == 'A' ) {
    
      e.preventDefault();
    
      // get last input
		  var $last = $t.prev();

		  // get id of last input
		  var id = $last.data('count') + 1;

      // append new input
		  $last.clone().insertBefore( $t );

		  // get new input
		  var $new = $last.next();
		  var $new_input = $new.find('input');

		  // update data count
		  $new.attr('data-count', id);
		  
		  // update input id and name
      $new_input.attr('name', $new_input.attr('name').replace(/([0-9]+)/, id) );
      $new_input.attr('id', $new_input.attr('id').replace(/([0-9]+)/, id) );
      $new_input.val('');
    
      return false;
    
    } else if( t.nodeName == 'I' && $t.hasClass('icon-highlight-remove') ) {
    
      e.preventDefault();
    
      // remove input
      $t.parent().remove();
      
      // update data count
    
    } else if( t.nodeName == 'I' || t.nodeName == 'SPAN' ) {
      
      e.preventDefault();
      
      $t.parent().trigger('click');
    
    } else {

  		return true;

		}
    
  });

  // Form Validation

  jQuery('button').not(".stripe-btn").on('click', function(e){

    var t = e.target; var $t = jQuery(e.target);

    e.preventDefault();

    var $form = $t.parents('form');
    var errors = false;

    $form.find('ul[data-required]').each(function(index, value) {
      
      var selected = jQuery(this).find('input:checked').length;
      
      if ( selected >= jQuery(this).data('required') ) {
        
        jQuery(this).prev().removeClass('error');
        
      } else {
        
        errors = true;
        jQuery(this).prev().addClass('error');
        
      }
      
    });
    
    $form.find('input[type=checkbox][required]').each(function(index, value) {
      
      if( jQuery(this).is(':checked') ) {
        
        jQuery(this).next().removeClass('error');
        
      } else {
        
        errors = true;
        jQuery(this).next().addClass('error');
        
      }
      
    });

    $form.find('input[type=text][required],input[type=number][required],textarea[required],input[type=file][required]').each(function(index, value) {

      if( jQuery(this).val().length == 0 || jQuery(this).val() == $(this).attr('placeholder') ) {

        errors = true;
        jQuery(this).add( jQuery(this).closest('li').find('label') ).addClass('error');

      } else {

        jQuery(this).add( jQuery(this).closest('li').find('label') ).removeClass('error');

      }

    });

    $form.find('input[type=password][required]').each(function(index, value) {
      
      if( jQuery(this).val().length >= 5 || jQuery(this).val() == $(this).attr('placeholder') ) {
        
        jQuery(this).add( jQuery(this).closest('li').find('label') ).removeClass('error');
        
      } else {
        
        errors = true;
        jQuery(this).add( jQuery(this).closest('li').find('label') ).addClass('error');
        
      }
      
    });

    $form.find('select[required]').each(function(index, value) {

      if( jQuery(this)[0].selectedIndex == 0 ) {

        errors = true;
        jQuery(this).parent().add( jQuery(this).closest('li').find('label') ).addClass('error');

      } else {

        jQuery(this).parent().add( jQuery(this).closest('li').find('label') ).removeClass('error');

      }

    });
    
    $form.find('input[type=tel][required]').each(function(index, value) {
      
      if( validateNumber( jQuery(this).val() ) ) {
        
        jQuery(this).add( jQuery(this).closest('li').find('label') ).removeClass('error');
        
      } else {
        
        errors = true;
        jQuery(this).add( jQuery(this).closest('li').find('label') ).addClass('error');
        
      }
      
    });

    $form.find('input[type=email][required]').each(function(index, value) {
      
      if( validateEmail( jQuery(this).val() ) ) {
        
        jQuery(this).add( jQuery(this).closest('li').find('label') ).removeClass('error');
        
      } else {
        
        errors = true;
        jQuery(this).add( jQuery(this).closest('li').find('label') ).addClass('error');
        
      }
      
    });
    
    jQuery('span.message').html('Please fix errors and try again.');
    
    if(errors == false) {

     function calculateEpochTimeMillis(baseIdentifier){
        var day = $form.find('#'+baseIdentifier+'Day').val();
        var month = $form.find('#'+baseIdentifier+'Month').val() -1;
        var year = $form.find('#'+baseIdentifier+'Year').val();
        var utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
        return utcDate.getTime();
      }

      function appendHiddenField(name, value){
        $('<input>').attr({
          type: 'hidden',
          id: name,
          name: name,
          value: value
        }).appendTo($form);
      }

      appendHiddenField("dateOfBirth", calculateEpochTimeMillis("dob"));
      appendHiddenField("experienceStart", calculateEpochTimeMillis("exp") );  

      jQuery('span.message').html();

      $form.submit();
    }

  });
  
  // Trainer Filters
  
  jQuery('section.filter').on('click', function(e){

    var t = e.target; var $t = jQuery(e.target);

    e.preventDefault();
    
    if( e.target.nodeName == 'IMG' || e.target.nodeName == 'SPAN' ) {

      $t.parent().trigger('click');

    } else if( e.target.nodeName == 'A' ) {

      var $item = jQuery('section.filter');
      var filters = $item.data('filters');
      var index = filters.indexOf( $t.data('filter') );
      
      // filter in array, remove it
      if( index > -1 ) {

        $t.fadeTo('fast', 0.25);
        filters.splice(index, 1);
      
      // filter not in array, add it
      } else {

        $t.fadeTo('fast', 1);
        filters.push($t.data('filter'));

      }

      // update filters
      $item.data('filters', filters);
      
      // get JSON for new filters
      $.getJSON('http://api.trubeapp.com/v1/partners?sort=partnerRatingRecap.average,desc', function(data) {
        
        // results
        if ( data.content.length > 0 ) {
        
          // show the trainer section
          jQuery('section.trainer').show();
          
          // show the more section
          jQuery('section.more').show();
          
          // hide empty section
          jQuery('section.empty').hide();
        
          var html = '<section class="group">';
          
          // build list of trainers
          for (i = 0; i < data.content.length; i++) {
            
            if( !data.content[i].pictureUrl || !data.content[i].description ) {
              continue;
            }
             
            html += '<section class="row">';
            html += '<aside class="col col-2"></aside>';
            html += '<aside class="text col col-3">';
            html += '<img src="' + data.content[i].pictureUrl + '">';
            html += '</aside>';
            html += '<aside class="col col-2"></aside>';
            html += '<aside class="details col col-7">';
            html += '<h2>' + data.content[i].firstName + ' ' + data.content[i].familyName.charAt(0) + '.</h2>';
            html += '<p>' + data.content[i].description + '</p>';
            html += '</aside>';
            html += '<aside class="col col-2"></aside>';
            html += '</section>';
  
          }
          
          html += '</section>';
          
          // replace existing trainers with new trainers
          $('section.trainer').html( html );
          
          // no more trainers available to show
          if( data.remaining_trainers == 0 ) {
            
            // hide the more section
            jQuery('section.more').hide();
          
          // more trainers available to show
          } else {
            
            // reset more button count
            jQuery('#more').data('count', 10);
            
          }
          
        // no results
        } else {
          
          // hide the trainer section
          jQuery('section.trainer').hide();
          
          // hide the more section
          jQuery('section.more').hide();
          
          // show empty section
          jQuery('section.empty').show();
          
        }
        
      });

    }
    
  });
  
  // More Trainers
  
  jQuery('#more').on('click', function(e){

    var t = e.target; var $t = jQuery(e.target);
    var pageSize = 20;

    e.preventDefault();
    
    if( e.target.nodeName == 'I' ) {

      $t.parent().trigger('click');

    } if( e.target.nodeName == 'A' ) {

      var filters = jQuery('section.filter').data('filters');
      var count = $t.data('count');
      
      // add loading class to button
      $t.addClass('loading');
      
      // get JSON for new filters
      $.getJSON('http://api.trubeapp.com/v1/partners?sort=partnerRatingRecap.average,desc&size='+pageSize+'&page=' + count, function(data) {
        
        // results
        if ( data.content.length > 0 ) {
          
          var html = '<section class="group">';
        
          // build list of trainers
          for (i = 0; i < data.content.length; i++) {
            
            if( !data.content[i].pictureUrl || !data.content[i].description ) {
              continue;
            }
  
            html += '<section class="row">';
            html += '<aside class="col col-2"></aside>';
            html += '<aside class="text col col-3">';
            html += '<img src="' + data.content[i].pictureUrl + '">';
            html += '</aside>';
            html += '<aside class="col col-2"></aside>';
            html += '<aside class="details col col-7">';
            html += '<h2>' + data.content[i].firstName + ' ' + data.content[i].familyName.charAt(0) + '.</h2>';
            html += '<p>' + data.content[i].description + '</p>';
            html += '</aside>';
            html += '<aside class="col col-2"></aside>';
            html += '</section>';
  
          }
          
          html += '</section>';
          
          // append new trainers to existing list
          $('section.trainer').append( html );
          
          // no more trainers available to show
          if( data.numberOfElements != pageSize ) {
            
            // hide the more section
            jQuery('section.more').hide();
          
          // more trainers available to show
          } else {
            
            // add another 1 to the count
            $t.data('count', count + 1);
            
            // remove loading class on button
            $t.removeClass('loading');
            
          }
        
        // no results
        } else {
          
          // remove loading class on button
          $t.removeClass('loading');
          
        }
        
      });

    }

  });
  
  // Anchor Scroll
  
  jQuery('a[data-scroll]').on('click',function (e) {

    e.preventDefault();
    
    var target = this.hash;
    var $target = $(target);
    
    jQuery('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      $target.find('input[type=text]')[0].focus();
    });

	});
  
  // EU cookie popup
  
  if ( 'set' !== $.cookie('cookie-check') ) {
  
    var html = '<div class="cookies">';
    html += 'We use cookies to help make this website better. You can find out more about how this website uses cookies <a href="/privacy/">here</a>.';
    html += '<button id="accept-cookie">OK</button>';
    html += '</div>';

    $( 'body' ).prepend(html);
  
    $( '#accept-cookie' ).click(function () {
      $.cookie('cookie-check','set');
      $('.cookies').remove();
    });
  
  }

});

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateNumber(number) {
  var re = /^\d{11}$/;
  return re.test(number);
}

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  if( evt.target.value.length >= evt.target.maxLength ) {
    return false;
  }
  return true;
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}