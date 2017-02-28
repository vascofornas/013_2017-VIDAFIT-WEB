/**
* TinyLimiter - scriptiny.com/tinylimiter
* License: GNU GPL v3.0 - scriptiny.com/license
*/

(function($) {
	$.fn.extend( {
		
		limiter: function(limit, elem) {
		
			$(this).on("keyup focus", function() {
		
				setCount(this, elem);
		
			});
		
			function setCount(src, elem) {
				
				var chars = src.value.length;
				
				elem.removeClass('limit_error');
				
				if (chars >= limit) {
				
					src.value = src.value.substr(0, limit);
					chars = limit;
					elem.addClass('limit_error');
				
				}
				
				elem.html( limit - chars );
			
			}
			
			setCount($(this)[0], elem);
		
		}
		
	});
})(jQuery);