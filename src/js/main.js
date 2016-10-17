(function () { 'use strict';

	var number = 4;
	var numbPrev = 4;

	//hide cheapest tooltip
	$('#cheapest-tooltip').attr('class', 'js-hide-opacity');
	//aniamte slider
	$('#tooltip-load').attr('class', 'animated-slide');
	//hightlight current day
	$('#graph-4').attr('class', 'js-highlighted');


	document.getElementById('card-loading').onclick = function(){

		//hide spinners
		$('#tooltip-load').attr("class", "js-hide");
		$('#card-loading').attr("class", "js-hide-opacity");

		// animate graph
		$('[id^="graph-bar"]').each(function() {			
			$(this).attr('class', 'bar-grow ');
		})

		//animate graph bar
		$('#graph-line').attr('class', 'js-bar-move-start');

		//show main tooltip
		// $('#bar-tooltip_3_').attr('class', 'js-show');
		$('#tooltip-drag').removeClass('js-hide');

		//show cheapest tooltip
		$('#cheapest-tooltip').attr('class', 'js-show-opacity');

		//hide unloaded bars;
		$('#bars-unloaded').attr('class', 'js-hide');

		//apply dragable
		$( "#tooltip-drag" ).draggable({
		  axis: "x",
		  containment: "parent",
		  drag: function( event, ui ) {
		  var position = $( "#tooltip-drag" ).position();

		  	if (position.left >= 0 && position.left <= 20) {
		  		number = 1
		  		highlight(number);
		  	}
		  	if (position.left >= 25 && position.left <= 60) {
		  		number = 2
		  		highlight(number);
		  	}
		  	if (position.left >= 70 && position.left <= 100) {
		  		number = 3
		  		highlight(number);
		  	}
		  	if (position.left >= 115 && position.left <= 150) {
		  		number = 4
		  		highlight(number);
		  	}
		  	if (position.left >= 165 && position.left <= 190) {
		  		number = 5
		  		highlight(number);
		  	}
		  	if (position.left >= 200 && position.left <= 235) {
		  		number = 6
		  		highlight(number);
		  	}
		  	if (position.left >= 240) {
		  		number = 7
		  		highlight(number);
		  	}
		  }
		});
		

	}; //ENDS CARD LOADING CLICK

	

	var highlight = function(number) {
		if (number != numbPrev) {

			//get numbers of charts
			var graphId = '#graph-' + number;
			var graphPrevId = '#graph-' + numbPrev;

			//highlight the right one
			$(graphId).attr('class', 'js-highlighted');
			$(graphPrevId).attr('class', '');
			//reset previous chart
			numbPrev = number;	
			//show card loader briefly
			$('#card-loading').attr('class', '');
			setTimeout(function (){
				$('#card-loading').attr('class', 'js-hide-opacity');
			}, 300);


		}
	}




}()); // end 'use strict'