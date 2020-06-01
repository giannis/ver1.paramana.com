/*!
 * paramana.com
 * Version: 2.0
 * Updated: 09-06-2010
 * http://paramana.com
 *
 * Copyright (c) 2009 paramana.com
 *
 */
var gallery = {
	makeGallery: function() {
        var winHeight = $(window).height();
        var footitle;
		$("a.detailView").livequery(function(){
            var self = this;
            $(this).fancybox({
                'overlayShow' : true,
                'padding' : 10,
                'frameWidth' : 660,
                'frameHeight': 505,
                'hideOnContentClick' : false,
                callbackOnStart : function(){
                    $('#fancy_overlay').height(winHeight);
                    var title = $(self).attr('title');
                    footitle = document.title;
                    document.title = 'paramana.com | ' + title;
                    if (typeof(pageTracker) == "object")
                        pageTracker._trackPageview('/' + title);
                },
                callbackOnClose: function(){
                    document.title = footitle;
                }
            });
		});

	},
	init: function(){
		this.makeGallery();
	}
};
var pageInter = {
	contentFader: function(){
        //giveMe.php?js=off&page=who
        $("#navigation .buttonContent a, a.navBtn").livequery(function(){
            $(this).click(function(){
                var urlToLoad = $(this).attr('href').replace('.html','');
                pageInter.renderPage(urlToLoad);
                return false;
            })
        });
	},
	redirectUrl: function(){
		var hash = window.location.hash.substr(1);
		var openedNav = 'portfolio';
        if(!hash){
            hash = location.pathname;
            if(hash.indexOf('.html') != -1)
                hash = hash.replace('.html','').replace('/','');
            else {
                hash = 'home';
            }
        }
        
        hash = hash.toLowerCase();
        
        var $navBtn = $('#navigation .buttonContent a[href="' + hash + '.html"]');
        if($navBtn.length > 0) {
            openedNav = $navBtn.attr('rel');
        }
        else
            hash = 'home';

        pageInter.renderPage(hash, openedNav);
	},
    renderPage: function(page, openNav){
        //console.log(page + '  site '+siteData.page + '    le '+$('#' + page + 'Window', '#actualBody').length)
        var $actualBody = $('#actualBody');
        var title = 'paramana.com';
        
        if(page != siteData.page && $('#' + page + 'Window', '#actualBody').length <= 0 && page != 'home') {
            $.ajax({
                url: "giveMe.php",
                data: 'js=on&page=' + page,
                beforeSend: function(){
                    $actualBody.children().css('display', 'none');
                },
                success: function(data) {
                    if (typeof(pageTracker) == "object")
                        pageTracker._trackPageview('/' + page);
                    $actualBody.append(data);
                    $('#' + page + 'Window', '#actualBody').fadeIn();
                    if($actualBody.parent().is(':hidden'))
                        $actualBody.parent().fadeIn();
                }
            });
        }
        else {
            $('#' + page + 'Window', '#actualBody').siblings(':visible').fadeOut(function(){
                $('#' + page + 'Window', '#actualBody').fadeIn();
            });
        }
        
        if(openNav)
            pageInter.navigation('#' + openNav);

        siteData.page  = page;
        window.location.hash = page;
        document.title = title + (page != 'home' ? ' | ' + urlLut[page] : '');
    },
    customCarousel: function(){
        var step = 4;
        var carouselPos = 0;
        $('#carouselPrev, #carouselNext').livequery(function() {
            var $carouselList = $('ul.jcarousel-list');
            var carouselSize = $carouselList.children().length;
            var carouselItemSize = 186;
            var carouselMaxSize = carouselItemSize * carouselSize;
            if(carouselPos >= carouselSize - step)
                $('#carouselNext').hide();
            else
                $('#carouselNext').show();

            if(carouselPos <= 0){
                $('#carouselPrev').hide();
            }
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
			var label = $(".buttonLabel", item[0]);
			var button = $(".buttonOpen", item[0]);
            item.addClass("opened");
			button.stop().animate({
				marginTop: 0
			}, self.duration);
			item.stop().animate({
				marginTop: -(label.outerHeight() + button.outerHeight() - 100) / 2 + "px"  // o arithmos kathorizei to upsos
			}, self.duration);
		}
		this.close = function(item) {
			var button = $(".buttonOpen", item[0]);
			button.stop().animate({
				marginTop: -button.outerHeight() + "px"
			}, self.duration, function() {
				item.removeClass("opened");
			});
			item.stop().animate({
				marginTop: 0
			}, self.duration);
		}

        window.setTimeout(function(){
            var button = $(".buttonOpen");
            for(var i = 0; i < button.length; i++) {
                var $this = $(button[i]);
                $this.css({ marginTop: -$this.outerHeight() + "px" })
            }
        }, 1000);
        
        $(".navButton", this.root).hover(
            function() { 
                self.open($(this));
            },
            function() { 
                self.close($(this));
            }
        );
		window.setTimeout(function() { self.open(self.defaultOpened); }, 1000);
	},
	init: function(){
		this.contentFader();
		this.redirectUrl();
        this.customCarousel();
	}
};
var urlLut = {
    "who"       : 'who',
    "what"      : 'what',
    "where"     : 'where',
    "webdesign" : 'web design',
    "mediaart"  : 'media art',
    "print"     : 'print',
    "talk"      : 'talk',
    "hire"      : 'hire'
};
var galleryOfDetails = {
	makeGallery: function() {
        $('#detailsNav-sliding a').livequery(function(){
			$(this).click(function(){
				//var self = $('.sliding-element').index($(this).parent());
				var hrefer = $(this).attr('href');
                if(hrefer.match(window.location.hostname))
                    hrefer = hrefer.split(window.location.hostname)[1].replace('/','');
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
                        $('#frameRight').append('<span id="loadDetail">LOADING...</span>');
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
                        $("#loadDetail").stop().fadeOut("fast").remove();
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
    siteLoad: function() {
		$(window).load(function () {
			//$("#siteLoading,#siteLoadOverlay_Frame").fadeOut("fast").remove();
			$("#siteLoading").fadeOut('normal', function (){
                document.getElementById('warper').style.display = 'block';
				$(this).remove();
			});
		});
        setTimeout(function(){
            $("#siteLoading").fadeOut('normal', function (){
                document.getElementById('warper').style.display = 'block';
                $(this).remove();
            });
        }, 2000);
        $('.comment').remove();
	},
    exte: function() {
        $("a.externalLink").livequery(function() {
            $(this).attr('target', '_blank');
        });
    },
    init: function(){
        this.siteLoad();
        this.exte();
    }
};
var contactForm = {
    contactForma: function() {
        $("#name").livequery(function(){
            $("#name").clearFields("activeField");
        });
        $("#email").livequery(function(){
            $("#email").clearFields("activeField");
        });
        $("#message").livequery(function(){
            $("#message").clearFields("activeField");
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
                if (typeof(pageTracker) == "object")
                    pageTracker._trackPageview('/someoneConactUs');
                $('.rightColumn').livequery(function(){
                    $(this).html("<div id='feedback'></div>");
                    $('#feedback').html("<h3>Contact Form Submitted!</h3>")
                    .append("<p>We will be in <br/> touch soon.</p>")
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
    }
};
var siteData = {
    page : ''
}

$(document).ready( function(){
    webStart.init();
	pageInter.init();
    gallery.init();
    galleryOfDetails.init();
    contactForm.contactForma();
	window.setTimeout(function() { slide("#language-sliding", 25, 15, 150, .8, "ori", "-85", "0"); }, 1500);
	window.setTimeout(function() { preloadImages(); }, 3000);
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