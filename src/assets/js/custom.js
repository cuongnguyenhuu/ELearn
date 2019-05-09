$(document).ready(function(){
	$(window).scroll(function(){
		// if($(window).scrollTop()>50){
		// 	$('.header').css({"height":"65px","transition":"0.5s ease-in-out"});
		// 	$('.menu').css({"top":"65px","transition":"0.5s ease-in-out"});
		// }
		// else{
		// 	$('.header').css({"height":"100px","transition":"0.5s ease-in-out"});
		// 	$('.menu').css({"top":"100px","transition":"0.5s ease-in-out"});
		// }

		if($(window).scrollTop()>1000){
			$('.move_top').css("display","flex");
		}
		else{
			$('.move_top').css("display","none");
		}
	});

	$("#btn_about_us").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#about-us").offset().top -80
	    }, 1000);
	});
})
function onTop(){
	window.scrollTo({ top: 0, behavior: 'smooth' });
}
