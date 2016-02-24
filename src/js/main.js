$( document ).ready(function() {

  var menuItems = [
  'interactive-design',
  'illustration',
  'photography',
  'profile',
  'contact',
  'blog'
  ];

  //LOAD MENU AND FOOTER
  $('header').load('menu.html');
  $('footer').load('footer.html');

  //************** EVENT LISTENERS ***************//

  $('#content-prev').click(function(){
    moveSection(999, -1); //999 means not a direct project link
  });

  $('#content-next').click(function(){
    moveSection(999, 1); //999 means not a direct project link
  });

  $('#content-nav').click(function(){
    var projectId = event.target.id.slice(-1);
    moveSection(projectId, 0);

  });


  // ********** IE test ******** //

  function isIE () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  if (isIE () < 9) {
   // is IE version less than 9
  } else {
   // is IE 9 and later or not IE
  }



  // ********** HOMEPAGE DRAWING FUNCTION ******** //

  function drawingPaths(){
    var current_frame = 0;
    var total_frames = 90;
    var path = [];
    var length = [];



    path = document.querySelectorAll('path');

    for(var i=0; i<path.length;i++){

      l = path[i].getTotalLength();
      length[i] = l;
      path[i].style.strokeDasharray = l + ' ' + l; 
      path[i].style.strokeDashoffset = l;
    }
    var handle = 0;

    var draw = function() {
       var progress = current_frame/total_frames;
       if (progress > 1) {
         window.cancelAnimationFrame(handle);
       } else {
         current_frame++;
         for(var j=0; j<path.length;j++){
           path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
         }
         handle = window.requestAnimationFrame(draw);
       }
    };
    draw();
  }


// ************ LOAD SVGS INTO HOME PAGE ********** //
function loadHomeImages (){
  var count = 1;
  for (i=0; i<menuItems.length; i++) {
    $( "#home-ill-" + menuItems[i] ).load("img/home-svgs/" + menuItems[i] + ".svg", function(){
      //run drawing function after final image is done loading
      count++;
      if (count == menuItems.length) {
        drawingPaths();
      }
    });
  }
}

loadHomeImages();



//***************** ILLUSTRATION SHOW ***************//
//***************************************************//

var illustration = $('.ill-thumb');

//clicking an image shows large image
illustration.click(function(){
  
  //get clicked image and load full version
  var thumbUrl = $(this).attr('src');
  var fullUrl = thumbUrl.replace("thumbs", "full");



  $('#ill-full').fadeOut(200, function(){
        $(this).attr('src', fullUrl).bind('onreadystatechange load', function(){
              if (this.complete) $(this).fadeIn(500);
        });
  });   


  //show page
  var imageBack = $('#full-image-back');
  imageBack.toggleClass('js-on-page');
});


//clicking x button hides large image

$('#full-image-close').click(function(){
  var imageBack = $('#full-image-back');
  imageBack.toggleClass('js-on-page');
});


//FILTER

$('[id*=filter]').click( function() {
  var filter = this.id.split('-')[1];
  var allPics = $('.ill-thumb');
  //if off then remove class and show images
  if ($(this).hasClass('filter-on')) {
      $(this).removeClass('filter-on');
      for (i=0; i<allPics.length; i++) {
          if ($(allPics[i]).attr('data').indexOf(filter) == 0) {
            $(allPics[i]).removeClass('hide-illustration');
          };
      }

  } else {
      // else add class and hide images
      $(this).addClass('filter-on');

      // $('[data=' + filter + ']').addClass('hide-illustration')

      for (i=0; i<allPics.length; i++) {
          if ($(allPics[i]).attr('data').indexOf(filter) == 0) {
            $(allPics[i]).addClass('hide-illustration');
          };
      }

  }
});



//**************** PHOTOGRAHY SHOW ******************//
//***************************************************//



// define max num of images
var imgTotal = 21;




// if you hit button then get direction and call function
$('[id*=photo-swap-]').click( function(event) {
  if ($(this).attr('id').indexOf('left') > -1 ) {
    movePhoto(-1);  
  }
  else if ($(this).attr('id').indexOf('right') > -1 ) {
    movePhoto(1);  
  }
});

// if arrows clicked get direction and call function
document.onkeydown = function(e) {
    switch (e.keyCode) {

        case 37: //left
          if ($('body').attr('id') == 'photog-body') {
            movePhoto(-1);
          };  
          break;

        case 39: //right
          if ($('body').attr('id') == 'photog-body') {
            movePhoto(1);
          };  
          break;
    }
};



// move to next image based on direction
var movePhoto = function(direction) {

  //get existing image number
  var currentNum = parseInt($('#main-photo').attr('src')
  .replace('img/rome-web/rome-', '')
  .replace('.jpg', '')
  );

  //get next image number
  var nextNum = currentNum + direction;

  //loop at start and end of number of images
  if (nextNum < 1) {
    nextNum = imgTotal;
  } else if (nextNum > imgTotal) {
    nextNum = 1;
  }

  // select image and swap out for next one
  $('#main-photo').fadeOut(500, function(){
      $(this).attr('src', 'img/rome-web/rome-' + nextNum + '.jpg' ).bind('onreadystatechange load', function(){
         if (this.complete) $(this).fadeIn(500);
      });
  });   
};








});   //close document.ready