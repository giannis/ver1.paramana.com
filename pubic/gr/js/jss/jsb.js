//Activate FancyBox
var gallery = {
	makeGallery: function() {
        var winHeight = $('#fancy_overlay').height();
		$("a.detailView").livequery(function(){
            $(this).click(function(){
                //if (typeof(pageTracker) == "object")
                  //  pageTracker._trackPageview('#' + $(this).attr('title'));
                  alert($(this).attr('title'))
            });
            $(this).fancybox({
                'overlayShow' : true,
                'padding' : 10,
                'frameWidth' : 660,
                'frameHeight': 505,
                'hideOnContentClick' : false,
                callbackOnStart : function(){
                    $('#fancy_overlay').height(winHeight);
                }
            });
            
		});
        
	},
	init: function(){
		this.makeGallery();
	}
};
var ContentEffe = {
	contentFader: function(){
            $(".buttonContent a").click(function(){
                var urlToLoad = $(this).attr('href');
                urlToLoad = urlToLoad.split('?');
				if(window.location.hash.substr(1) != urlToLoad[1].split('page=')[1]){
                    $('#hook').fadeOut('normal', function(){
                       window.location.hash = urlToLoad[1].split('page=')[1];
                       $('#hook').load(urlToLoad[0],urlToLoad[1].replace('off','on'), function (){
                            $('#hook').fadeIn('normal');
                        });
                    });
                    //$('#load').remove();
                    //$('#warper').append('<span id="load">LOADING...</span>');
                    //$('#load').fadeIn('normal');
                    /*function hideLoader() {
                        $('#load').fadeOut('normal');
                    }*/
                    return false;
                }
                else
                    return false;
                return false;
			});
	},
    customCarousel: function(){
        var carouselSize = 10;
        var carouselItemSize = 186;
        var carouselMaxSize = carouselItemSize * carouselSize;
        var step = 4;
        var carouselPos = 0;
        
        $('#carouselPrev, #carouselNext').livequery(function() {
            var $carouselList = $('ul.jcarousel-list');
            $carouselList.css('width', carouselMaxSize);
            $(this).click(function() {
                var thisID = $(this).attr('id');

                if(thisID == 'carouselNext' && carouselPos < carouselSize) {
                    $carouselList.stop().animate({
                        'left': -(parseInt((carouselPos + (carouselSize - (carouselPos + step) < step ? carouselSize - (carouselPos + step) : step)) * carouselItemSize))
                    });
                    carouselPos = carouselPos + (carouselSize - (carouselPos + step) < step ? carouselSize - (carouselPos + step) : step);
                }
                if(thisID == 'carouselPrev' && carouselPos > 0) {
                    $carouselList.stop().animate({
                        'left': -(parseInt((carouselPos - (carouselPos - step > 0 ? step : carouselPos)) * carouselItemSize))
                    });
                    carouselPos = carouselPos - (carouselPos - step > 0 ? step : carouselPos);
                }

                if(carouselPos >= carouselSize - step)
                    $('#carouselNext').hide();
                else
                    $('#carouselNext').show();
                
                if(carouselPos <= 0){
                    $('#carouselPrev').hide();
                }
                else
                    $('#carouselPrev').show();
                return false;
            });
        });
    },
	redirectUrl: function(){
		var hash = window.location.hash.substr(1);
		var openedNav;
		var wrongUrl = 0;
		$("#hook").hide();
		var href = $('#navigation a').each(function(){
			var href = $(this).attr('href');
			if(hash == href.split('page=')[1]){
				openedNav = $(this).attr('rel');
				var toLoad = href.split('?');
				$('#hook').load(toLoad[0], toLoad[1].replace('off','on'), function () {
					$(this).fadeIn(1000);
				});
			}
			else if (hash == "") {
				openedNav = "portfolio";
			}
			else {
				wrongUrl++;	
			}
		});
		if (wrongUrl == 8) {
			ContentEffe.navigation("#portfolio");
		}
		else {
			ContentEffe.navigation("#"+openedNav);
		}
	},
	navigation: function(defaultOp){
		var self = this;
		this.root = $("#navigation");
		this.duration = 500;
		this.waiting = true;
		this.defaultOpened = $(defaultOp);
		
		this.open = function(item) {
			if(item != this.defaultOpened && this.waiting == true) {
				this.close(this.defaultOpened);
				this.waiting = false;
			}
			item.addClass("opened");
			var label = $(".buttonLabel", item);
			var button = $(".buttonOpen", item);
			button.stop();
			button.animate({
				marginTop: 0
			}, self.duration);
			item.stop();
			item.animate({
				marginTop: -(label.height() + button.height() - 100) / 2 + "px"  // o arithmos kathorizei to upsos
			}, self.duration);	
		}
		this.close = function(item) {
			var button = $(".buttonOpen", item);
			button.stop();
			button.animate({
				marginTop: -button.height() + "px"
			}, self.duration, function() {
				$(this).parents(".navButton").removeClass("opened");
			});	
			item.stop();
			item.animate({
				marginTop: 0
			}, self.duration);	
		}
		$(".navButton", this.root).each(function() {
			var button = $(".buttonOpen", $(this));
			button.css({ marginTop: -button.height() + "px" })
				$(this).hover(
					function() { self.open($(this)); },	
					function() { self.close($(this)); }
				);
		});
		window.setTimeout(function() { self.open(self.defaultOpened); }, 500);
	},		
	init: function(){
		this.contentFader();
		this.redirectUrl();
        this.customCarousel();
	}
};
var galleryOfDetails = {
	makeGallery: function() {
        $('#detailsNav-sliding a').livequery(function(){
			$(this).click(function(){
				//var self = $('.sliding-element').index($(this).parent());
				var hrefer = $(this).attr('href');
				$('.sliding-element').each(function () {
					$(this).removeClass('Active');
					$(this).children().css("margin-top", 10);
				});
				$(this).parent().addClass('Active');
				$(this).css("margin-top", 0);
				$.ajax({
					type: "GET",
					url: "details/detailData.php",
					data: hrefer,
					dataType: 'html',
                    beforeSend: function(){
                        $('#hookDetailsText').hide();
                        $("#loadDetail").fadeIn('normal');
                        $('#hookDetailsImg').fadeOut('fast');
                    },
					error: function(){
						//alert('Error loading XML document');
					},
					success: function(data) {
						var response = data.split("_");
						$('#hookDetailsText').html(response[1]);
						$('#hookDetailsImg').html('<img src=\"images/details/'+response[0]+'.jpg\" width=\"327\" height=\"460\" alt=\"\" />');
                        $('#hookDetailsText').show();
                        $('#hookDetailsImg').fadeIn("slow");
                        $("#loadDetail").stop().fadeOut("fast");
					}
				});
				return false;
            });
        });
	}, 
	init: function(){
		this.makeGallery();
        $("#detailsNav-sliding").livequery(function(){
            slide("#detailsNav-sliding", 0, 10, 150, .8, "ver", "-35", "15");
        });
	}
};
//a function for the sliding menu effect
function slide (navigation_id, pad_out, pad_in, time, multiplier, orientation, totalPad, pad) {
	
	// creates the target paths
	var list_elements = navigation_id + " .sliding-element";
	var link_elements = list_elements + " a";
	// initiates the timer used for the sliding animation
	var timer = 0;
	$("#language-sliding").show("fast");
	//changes the orientation of the slide
	if (orientation === "ori") {
		// creates the slide animation for all list elements 
		$(list_elements).each(function(i)
		{
			// margin left = - ([width of element] + [total vertical padding of element])
			$(this).css("margin-left", totalPad);
			// updates timer
			timer = (timer*multiplier + time);
			$(this).animate({ marginLeft: "-15px" }, timer);
			$(this).animate({ marginLeft: pad }, timer);
			$(this).animate({ marginLeft: "0" }, timer);
		});
		// creates the hover-slide effect for all link elements 		
		$(link_elements).each(function(i)
		{
			$(this).hover(
			function()
			{
				$(this).stop().animate({ paddingLeft: pad_out }, 150);
			},		
			function()
			{
				$(this).stop().animate({ paddingLeft: pad_in }, 150);
			});
		});
	}
	else if (orientation === "ver") {
		// creates the slide animation for all list elements 
		$(list_elements).each(function(i)
		{
			// margin left = - ([width of element] + [total vertical padding of element])
			$(this).css("margin-top", totalPad);
			// updates timer
			timer = (timer*multiplier + time);
			$(this).animate({ marginTop: "0" }, timer);
			$(this).animate({ marginTop: pad }, timer);
			$(this).animate({ marginTop: "0" }, timer);
		});
		// creates the hover-slide effect for all link elements 		
		$(link_elements).each(function(i)
		{
			$(this).hover(
			function()
			{
				if ($(this).parent().hasClass('Active') === false){
					$(this).stop().animate({ marginTop: pad_out }, 150);
				}
			},		
			function()
			{	
				if ($(this).parent().hasClass('Active') === false){
					$(this).stop().animate({ marginTop: pad_in }, 150);
				}
			});
		});	
	}
};
$(function extrnalLinks () {
	$("a.externalLink").attr("target","_blank");
});

//a function to preload some images
function preloadImages () {
	if (document.images) {
	   	img1 = new Image();
	   	img2 = new Image();
		img3 = new Image();
		img4 = new Image();
		img5 = new Image();
		img6 = new Image();
		img7 = new Image();
		img8 = new Image();
		img9 = new Image();
		img10 = new Image();
		img11 = new Image();
	   	img1.src = "images/contenImageBody.png";
		img2.src = "images/contentImageHeader.png";
		img3.src = "images/contentImageFooter.png";
		img4.src = "images/bubble.png";
		img5.src = "images/whoTitle.png";
		img6.src = "images/whatTitle.png";
		img7.src = "images/whereTitle.png";
		img7.src = "images/messageFieldBg.jpg";
		img8.src = "images/nameFieldBg.jpg";
		img9.src = "images/emailFieldBg.jpg";
		img10.src = "images/submitButtonBg.jpg";
		img11.src = "images/contactTitle.png";
	}
};
var webStart = {
    siteLoader: function() {
		$(window).load(function () {
			//$("#siteLoading,#siteLoadOverlay_Frame").fadeOut("fast").remove();
			$("#siteLoading").fadeOut('normal', function (){
				$(this).remove();
			});
		});
	},
    init: function(){
        this.siteLoader();
    }
};
$(function contactForma () {
  	$('.error').livequery(function(){
		$(this).hide();
 	});
  	$(".button").livequery(function(){
	  $(this).click(function() {
		// validate and process form
		// first hide any error messages
		$('.error').hide();

		var name = $("input#name").val();
			if (name == "" || name == "your name..") {
				$("#nameError").fadeIn('fast');
				$("input#name").focus();
				return false;
			}
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var email = $("input#email").val();
			if (email == "" || email == "your e-mail goes here..") {
				$("#emailError").fadeIn('fast');
				$("input#email").focus();
				return false;
			}
			else if (!emailReg.test(email)) {
				$("#emailWrong").fadeIn('fast');
				$("input#email").focus();
				return false;
			}
		var message = $("textarea#message").val();
			if (message == "") {
				$("#messageError").fadeIn('fast');
				$("textarea#message").focus();
				return false;
			}

		var dataString = 'name='+ name + '&email=' + email + '&message=' + message;

		$.ajax({
		  type: "POST",
		  url: "bin/process.php",
		  data: dataString,
		  success: function() {
			$('.rightColumn').livequery(function(){
				$(this).html("<div id='feedback'></div>");
				$('#feedback').html("<h3>Contact Form Submitted!</h3>")
				.append("<p>We will be in touch soon.</p>")
				.hide()
				.fadeIn(500, function() {
				  $('#feedback').append("<img id='checkmark' src='images/mailbox.png' alt='' />");
				});
			});
		  }
		 });
		return false;
		});
	});
});

jQuery.fn.clearFields = function(focusClass) {
	this.each(function() {
		$(this).focus(function() {
			// clear value if current value is the default
			if($(this).val() == this.defaultValue) { $(this).val(""); }

			// if focusClass is set, add the class
			if(focusClass) { $(this).addClass(focusClass); }
		}).blur(function() {
			// restore to the default value if current value is empty
			if($(this).val() == "") { $(this).val(this.defaultValue); }

			// if focusClass is set, remove class
			if(focusClass) { $(this).removeClass(focusClass); }
		});
	});
}
$(document).ready( function(){
    $("#name, #email, #message").livequery(function(){
		$("#name, #email, #message").clearFields("activeField");
	});
	$("input#name").livequery(function(){
		$(this).keypress(function (e){
			$("#nameError").fadeOut('slow');
		});
	});
	$("input#email").livequery(function(){
		$(this).keypress(function (e){
			$("#emailError").fadeOut('slow');
			$("#emailWrong").fadeOut('slow');
		});
	});
	$("textarea#message").livequery(function(){
		$(this).keypress(function (e){
			$("#messageError").fadeOut('slow');
		});
	});
    webStart.init();
	ContentEffe.init();
    gallery.init();
    galleryOfDetails.init();
	window.setTimeout(function() { slide("#language-sliding", 25, 15, 150, .8, "ori", "-85", "0"); }, 1500);
	window.setTimeout(function() { preloadImages(); }, 3000);
});