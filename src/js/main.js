(function () { 'use strict';

	//hide cheapest tooltip
	$('#cheapest-tooltip').attr('class', 'js-hide-opacity');
	//aniamte slider
	$('#tooltip-load').attr('class', 'animated-slide');


	document.getElementById('card-loading').onclick = function(){

		//hide spinners
		document.getElementById('tooltip-load').classList.add("js-hide");
		document.getElementById('card-loading').classList.add("js-hide");

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
		  containment: "parent"
		});
		

	}; //ENDS CARD LOADING CLICK



	$('#graph-7').hover( function() {
		// console.log($('#graph-7 g'));

		// $('#graph-7 g').each(function() {	
		// 	$(this).attr('fill', 'red');
		// 	$(this).style('fill', 'red');

		// })

		// $('#graph-7 g rect').each(function() {	
		// 	$(this).attr('fill', 'red');
		// 	$(this).style('fill', 'red');
		// })

		// $('#graph-bar_6_').attr('fill', 'red').style('fill', 'red');

	})




}()); // end 'use strict'