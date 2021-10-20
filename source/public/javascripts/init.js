$(function () {
	// Move to top button appand in web layout
	$.icodetutsfrminput.init();

	$('body').prepend(
		"<div id='move-top' class='btn btn-theme hoverable move-top'><i class='fa fa-arrow-up'></i></div>"
	);
	var scrollTopBtn = 'html,body';
	/*Opera does a strange thing if we use 'html' and 'body' together*/
	if (navigator.userAgent.match(/opera/i)) {
		scrollTopBtn = 'html';
	}
	// show ,hide move top button button
	$('#move-top').hide();
	jQuery(window).on('scroll', function () {
		if ($(this).scrollTop() > 180) {
			$('#move-top').fadeIn();
		} else {
			$('#move-top').fadeOut();
		}
	});
	// scroll to top when click
	jQuery('#move-top').on('click', function (e) {
		jQuery(scrollTopBtn).animate({ scrollTop: 0 }, { duration: 600 });
		e.preventDefault();
	});

	var modalUniqueClass = '.modalLoop';
	$('.modalLoop').on('show.bs.modal', function (e) {
		var $element = $(this);
		var $uniques = $(modalUniqueClass + ':visible').not($(this));
		if ($uniques.length) {
			$uniques.modal('hide');
			$uniques.one('hidden.bs.modal', function (e) {
				$element.modal('show');
			});
			return false;
		}
	});
	$('.modalLoop').on('shown.bs.modal', function () {
		$(this).find('[autofocus]').focus();
		$.icodetutsfrminput.init();
	});

	// fileupload
	$.fn.fileUploader = function (filesToUpload) {
		this.closest('.files').on('change', function (evt) {
			for (var i = 0; i < evt.target.files.length; i++) {
				filesToUpload.push(evt.target.files[i]);
			}
			var output = [];

			for (var i = 0, f; (f = evt.target.files[i]); i++) {
				var removeLink =
					'<a class="removeFile" href="#" data-fileid="' + i + '"></a>';

				output.push(
					'<li><span>',
					escape(f.name),
					'-',
					f.size,
					' bytes.</span> ',
					removeLink,
					'</li> '
				);
			}

			$(this).children('.fileList').append(output.join(''));
		});
	};

	// -------------

	$('.pickDate').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: 'dd-mm-yy',
		// minDate: new Date(2021, 1 - 1, 1),
		// minDate: "-10y",
		// maxDate: "+1m",
		showAnim: 'fadeIn',
		changeMonth: true,
		changeYear: true,
		// todayBtn: true,
		autoclose: true,
		// showButtonPanel: true,
		prevText: '<i class="fa fa-chevron-left"></i>',
		nextText: '<i class="fa fa-chevron-right"></i>',
		afterShow: function () {
			$('.ui-datepicker-prev')
				.remove()
				.append('<i class="fa fa-chevron-left icons"></i>');
			$('.ui-datepicker-next')
				.remove()
				.append('<i class="fa fa-chevron-right icons"></i>');
		},
	});

	$('.pickDate').attr('autocomplete', 'off');
});

// JQuery UI Datepicker Config
$(function () {
	if ($('.dob').length) {
		$('.dob').datepicker({
			dateFormat: 'dd M yy',
			changeMonth: true,
			changeYear: true,
			yearRange: '-90:+00',
		});
	}
});

$(window).on('load resize', function () {
	// var windowsWidth = $(window).width();
	var windowsHeight = $(window).height();
	var navbarHeight = $('.siteNavbar').outerHeight();
	var footerHeight = $('.page-footer').outerHeight();

	console.log(windowsHeight, navbarHeight, footerHeight);

	$('.pages').css({
		minHeight: windowsHeight - (navbarHeight + footerHeight),
	});
});

// Replace all SVG images with inline SVG
function svgInline() {
	jQuery('img.svg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(
			imgURL,
			function (data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Replace image with new SVG
				$img.replaceWith($svg);
			},
			'xml'
		);
	});
}

// AOS starts
function aosAnimate() {
	AOS.init({
		offset: 0,
		duration: 800,
		easing: 'ease-in-out-cubic',
		once: true,
	});
}
// AOS ends

// window load functions
$(window).on('load', function () {
	aosAnimate();
	svgInline();
	//	signaturePad();

	// checkbox
	$('.btn-checkbox-box input').each(function () {
		$(this).prop('checked')
			? $(this).parents('.btn-checkbox-box').addClass('checked')
			: $(this).parents('.btn-checkbox-box').removeClass('checked');
	});

	$('.btn-radio-box input').each(function () {
		$(this).prop('checked')
			? $(this).parents('.btn-radio-box').addClass('checked')
			: $(this).parents('.btn-radio-box').removeClass('checked');
	});

	// data-aos-delay remove on mobile
	if ($(window).width() < 768) {
		$('div').each(function () {
			$(this).attr('data-aos-delay', '0');
		});
	}
});
