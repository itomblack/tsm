$( document ).ready(function() {

   
  // define max num of images
  var imgTotal = 21;



  var currentNum = $('#main-photo').attr('src');
    console.log( currentNum );


  // if you hit button then get direction and call function


  // if arrows clicked get direction and call function




  // move to next image based on direction
  var movePhoto = function(direction) {
    //get existing image number
    var currentNum = $('#main-photo').attr('src');
    console.log( currentNum );

    $('#main-photo').fadeOut(500, function(){
      $(this).attr('src', 'img/rome-web/rome-' + romeImages[0] + '.jpg' ).bind('onreadystatechange load', function(){
         if (this.complete) $(this).fadeIn(500);
         // $('#photo-info-tweet').text(allImagesTweet[0]);
        });
    });   
  };



});   //close document.ready