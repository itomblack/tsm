$( document ).ready(function() {


//===============================================================================
// Days each side
//===============================================================================

	if ($('.des-all-wrap').length > 0) {


		var desData = [{  
		    'id': '0',
		    'date': '27',
		    'day': 'Th',
		    'price': '230'
		},
		{
		    'id': '1',
		    'date': '28',
		    'day': 'Fr',
		    'price': '330'
		},
		{
		    'id': '2',
		    'date': '29',
		    'day': 'Sa',
		    'price': '430'
		},
		{
		    'id': '3',
		    'date': '30',
		    'day': 'Su',
		    'price': '370'
		},
		{
		    'id': '4',
		    'date': '31',
		    'day': 'Mo',
		    'price': '500'
		},
		{
		    'id': '5',
		    'date': '1',
		    'day': 'Tu',
		    'price': '300'
		},
		{   
		    'id': '6',
		    'date': '2',
		    'day': 'We',
		    'price': '210'
		}]

		//get all the bar chunks and give them IDs 
		var desDayItem = $('.day-item-wrap');
		var desBack = $('.day-item-background');
		var desBar =  $('.day-item-bar');
		var desPrice =  $('.day-price');
		var desDate =  $('.day-axis-date');
		var desDay =  $('.day-axis-day');
		var desAxis =  $('.day-item-axis');
		var allPrices = [];
		var allBars = [];
		var allItemIDs = [];

		var minBarHeight = 24;
		var axisHeight = "";
		var maxHeight = "";
		var finalSelectedHeight = [];
		var currentDay = 3;

		for (var i = 0; i < desDayItem.length; i++) {
			desDayItem[i].id = 'dayItem-' + desData[i].id;
			desBack[i].id = 'back-' + desData[i].id;
			desBar[i].id = 'bar-' + desData[i].id;
			desPrice[i].id = 'price-' + desData[i].id;
			desDate[i].id = 'date-' + desData[i].id;
			desDay[i].id = 'day-' + desData[i].id;
			desAxis[i].id = 'axis-' + desData[i].id;

			//get all prices in an array;
			allPrices.push(desData[i].price);
			allBars.push('day-' + desData[i].id);
			allItemIDs.push(desDayItem[i]);

			// //set click handlers for days
			// $('.day-item-wrap').click( function(){
			// 	swapDay(this);
			// });
		}

		setClicks();


		//get max height from size of objects
		axisHeight = $('#axis-1').outerHeight();
		maxBarHeight = $('#dayItem-1').outerHeight() - axisHeight;

		//set selected as middle day
		$( '#dayItem-' + currentDay ).toggleClass('js-selected-day');

		//set the values
		setValues();

		//set bar heights according to values
		barHeights();

		//move bar
		moveBar();




		


		//function for setting the values from the data
		function setValues(){
			for (var i = 0; i < desDayItem.length; i++) {
				//set values
				desPrice[i].innerHTML = '£' + desData[i].price;
				desDate[i].innerHTML = desData[i].date;
				desDay[i].innerHTML = desData[i].day;
			}
		}

		//funciton for setting the bar heights
		function barHeights(){
			//get max and min heights
			var arr = Object.keys( allPrices ).map(function ( key ) { return allPrices[key]; });
			var minPrice = Math.min.apply( null, arr );
			var maxPrice = Math.max.apply( null, arr );

			//for each one set height
			for (var i = 0; i < desDayItem.length; i++) {
				//get ranges for price and height
				var priceRange = maxPrice - minPrice;
				var heightRange = maxBarHeight - minBarHeight;
				//work out height as a proportion of range, plus min height
				var thisHeight = (((desData[i].price - minPrice) / priceRange) * heightRange + minBarHeight);
				//set bar to height
				$(desBar[i]).animate({ height: thisHeight },500);
				//set background of item to height
				finalSelectedHeight.push(thisHeight + axisHeight);
				$(desBack[i]).animate({	height: (thisHeight + axisHeight) },500);
				//move bar up to height of selected
			}
		}


		function moveBar() {
			//get which height to go to based on selected one
			var whichIdSelected = $('.js-selected-day').attr('id').slice(-1);

			//animate bar to that height
			$('#des-comp-line').animate({ bottom: (finalSelectedHeight[whichIdSelected] - 1) },500);
		}


		function swapDay(event) {
			var moveToNum = event.target.id.slice(-1);
			$( '#dayItem-' + currentDay ).toggleClass('js-selected-day');
			$( '#dayItem-' + moveToNum ).toggleClass('js-selected-day');
			currentDay = moveToNum;
			moveBar();
		}

		function setClicks() {
			//set click handlers
			for (var i = 0; i < desDayItem.length; i++) {
				$(desDayItem[i]).click( function(event){
					swapDay(event);
				});
			}
		}

	}



//===============================================================================
// Filters
//===============================================================================
if ($('#filter-demo').length > 0) {

	var filterSet = [
		"selected",
		"",
		"",
		"",
		"", 	
	]

	//set filters based on array
	setFilters()


	//click event
	$('.filter-wrap').click( function(event) {

		var idClicked = this.id;

		if( idClicked == 0 ) {
			//if its empty, set to all
			if (filterSet[0] == "empty") {
				setAll();
			} else {
				//just select all the others
				setAllButAll();
			}
			
		} else {


			if ( (filterSet[idClicked] == "" || filterSet[idClicked] == "empty") == true) {
				//clear all filter
				filterSet[0] = "empty";
				//deselect all other non-selected filters
				for (var i=1; i < filterSet.length; i++) {
					if (filterSet[i] == "") {
						filterSet[i] = "empty"
					}
				}
				//select this filter
				filterSet[idClicked] = "selected";

			} else { //if the filter is already selected
				filterSet[idClicked] = "empty";
			}
		}

		//if all emprty, put back all filter
		if (filterSet[0] == "empty" && filterSet[1] == "empty" && filterSet[2] == "empty" && filterSet[3] == "empty" && filterSet[4] == "empty") {
			console.log('all');
			setAll();
		}
		//reset filters based on newarray
		setFilters()

	})
	



	function setFilters() {
		for (var i=0; i < filterSet.length; i++) {
			$('#' + i).attr('class', "filter-wrap " + filterSet[i]);
		}
	}

	function setAll() {
		filterSet = [
				"selected",
				"",
				"",
				"",
				"", 	
			]
	}

	function setAllButAll() {
		filterSet = [
				"empty",
				"selected",
				"selected",
				"selected",
				"selected", 	
			]
	}










}







}); // end 'use strict'