var sp = {}; // App namespace
	sp.cache = {},
	sp.opts = {
		maxSpeed : 200
	};
	sp.utils = {}; 

	// cache the localstorage so speed
	sp.localStorage = localStorage;

// init
sp.init = function() {
	sp.cache.speed = $('.speed');  

	// prepare localstorage
	if (!sp.localStorage.measure) {
		localStorage.measure = 'k';
		sp.localStorage = localStorage; // sync up localstorage again
	}



	sp.writeSpeed = function(d) {
		var currSpeed = d.coords.speed; // Meters per second
			currSpeed = currSpeed * 60 * 60; // meters per hour
			currSpeed = currSpeed / 1000; // k/hr
			// Check if we are converting to MPH
			if (sp.localStorage.measure === 'm') {
				currSpeed = currSpeed * 0.621371192;	
			}
			currSpeed = Math.round(currSpeed);			
			sp.cache.speed.text(currSpeed + 1);	
			
			// needle
			var speedPercentage = currSpeed / sp.opts.maxSpeed,
				degrees = speedPercentage * 180;
			$('.meter .needle').css({'-webkit-transform' : 'rotate('+degrees+'deg)  translateZ(0) translate3d(0,0,0)'});
	}


	/* setInterval(function() {
		var d = {};
		d.coords = {};
		d.coords.speed = Math.floor(Math.random() * 70 );	
		//sp.writeSpeed(d);
	},2000);*/


	navigator.geolocation.watchPosition(function(d){
		sp.writeSpeed(d);
	});


	sp.cache.ticks = $('ul.ticks li');
	sp.cache.len = sp.cache.ticks.length 
	sp.cache.rotate = 0;

	for(i=0; i < sp.cache.len; i++) {
		$(sp.cache.ticks[i]).css({'-webkit-transform' : 'translateX(50%) rotate('+sp.cache.rotate+'deg) translateX(-50%)'});
		sp.cache.rotate +=10;
	}

}
	
$(function() {
	sp.init();
});