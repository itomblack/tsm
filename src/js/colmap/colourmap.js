(function(window, document, undefined){

//INITIAL VARIABLES*********************************************//
var m_width = $(".wrapper").width();
var m_height = $(window).height();

var width = m_width,
    height = m_height
    set_scale = 1;



var svg = d3.select("#map").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g");
          

var projection = d3.geo.mercator()
          .center([0, 0])
          .scale((width) / 2 / Math.PI)
          .rotate([0,0])
          .translate([width / 2, height / 1.5]);

var path = d3.geo.path()
    .projection(projection);

var colouris = d3.selectAll('#cselect').style("background-color");

var tooltip = d3.select("#tooltip")
  
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .text("test");


var buttona = d3.select('#buttona');
var buttonselect =  d3.select('#buttonselect');



//COLOUR KEY SELECTION*********************************************//

var selectbox = d3.selectAll('#colbox > div'); //when color boxes are click
selectbox.on("click", function(){
    var selected = d3.select(this).style("background-color") //remember which one was clicked
    d3.select('#cselect').style("background-color", selected);
    colouris = selected;
    });

//RESET MAP*********************************************//
d3.selectAll('#reset').on("click", function(){
  var countselect = d3.selectAll('#countries > path, #states > path');
  countselect.attr("fill", "black");

});


//SLIDEOUT MENU*********************************************//

var menuopen = d3.select('#menubutton');
var menuopencol = d3.select('#menu');

menuopen.on("click", function(){

if (menuopen.style("left") == "-2px"){
  
 menuopen.transition()
  .duration(500)
  .style("left", "163px");
  menuopencol.transition()
  .duration(500)
  .style("left", "0px")

  }
  else{
  menuopen.transition()
  .duration(500)
  .style("left", "-2px");
  menuopencol.transition()
  .duration(500)
  .style("left", "-165px")

  }
});

//ROTATE ARROW
$('#menubutton').click(function() {
  $('#menubutton > div').toggleClass('rotated');
});





//MAKE MAP FUNCTION*********************************************//

var make_map = (function(error, data){
      
    
      //rectangle for sea
      svg.append("rect")
        .attr("id", "sea")
        .attr("x", -150)
        .attr("y", -200)
        .attr("width", width*1.3)
        .attr("height", height*1.3)
        .attr("fill", 'white')
        .on("mouseover",function(){ return tooltip.style("visibility", "hidden")});

      //create a svg path using the geo data
      svg.attr("id", "country") //gives them their colour first
      .selectAll("path")
          .data(topojson.feature(data, data.objects.countries).features)
           .enter()
          .append("path")
           .attr("d", path)
           .attr("id", function(d) { return d.id; })
           .on("mouseover", function(d){
            tooltip
              .attr("class", "country")
              .text("Country: " )
              .append("div")
              .text(d.properties.name ).style("font-weight", "bold")
            })
           .on("click", function(d){
              var buttontext = buttonselect.text()
              if (buttontext == "COLOUR"){
                  d3.select(this).attr("fill", colouris);
                  return tooltip.style("visibility", "hidden");
                  }
                  else{  
                  svg.call(boxhide);
                  }
            });
       USA(); //LOAD USA STATES   
 
        //create a pan and zoom function on the map
        var zoom = d3.behavior.zoom()
        .scaleExtent([0.5, 4]) //Min and max zoom values
        .on("zoom",function() {
          set_scale = d3.event.scale; 
          svg.attr("transform","translate("+ 
          d3.event.translate.join(",")+")scale("+set_scale+")");
          //capture the current scale value
          set_scale = d3.event.scale;
          //pan and scale the map
          svg.selectAll("path")  
          .attr("d", path.projection(projection)); 
          });

       //call the zoom function
        svg.call(zoom)
        .on("dblclick.zoom", null) //dont zoom on doubleclick


//ADD USA FUNCTION*********************************************//
function USA(){
d3.json("data/states_usa.topo.json", function(error, us) {
        svg.attr("id", "states") //gives them their colour first
          .selectAll("g")  
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.properties.name; })
          .attr("d", path)
          .on("mouseover", function(d){
            tooltip
              .attr("class", "state")
              .text("US State: " )
              .append("div")
              .text(d.properties.name ).style("font-weight", "bold")
            })
          .on("click", function(d){
              var buttontext = buttonselect.text()
              if (buttontext == "COLOUR"){
                  d3.select(this).attr("fill", colouris);
                  return tooltip.style("visibility", "hidden");
                  }
                  else{  
                  svg.call(boxhide);
                  }
            });

      });//function error us close

}; //USA close


//MOVE BOX ON MOUSEMOVE*********************************************//
function boxmove(e) {
  var cursorX = e.clientX;
  var cursorY = e.clientY;
  if (cursorX < (width - 50)){
    return tooltip.style("top", (cursorY-10)+"px").style("left",(cursorX+10)+"px");
    }
    else{
    return tooltip.style("top", (cursorY-10)+"px").style("left",(cursorX-100)+"px");  
    }
};


document.addEventListener("mousemove", boxmove);





//SHOW HIDE BOX TOGLE*********************************************//
function boxhide(){
var hiddenbox = tooltip.style("visibility");
if (hiddenbox == "hidden"){
  return tooltip.style("visibility", "visible");
  }
  else {
  return tooltip.style("visibility", "hidden");
  }
};//close boxhide




//INTRODUCTION*********************************************//

var intro = d3.select('#intro')

//animate in
intro
  .transition()
  .duration(500)
  .style("left", "0px");   

 menuopen.transition()
  .duration(500)
  .style("left", "163px")
  .transition()
  .duration(500)
  
  .style("left", "-2px");
  menuopencol.transition()
  .duration(500)
  .style("left", "0px")
  .transition()
  .duration(500)
  .style("left", "-165px"); 





//on click actiom
buttona
  .on("click", function(){
  var buttontext = buttonselect.text()
     if (buttontext == "COLOUR"){
        buttonselect.text("INFO.");
        buttona
        .transition()
        .duration(130)
        .style("left", "10px")
        }
        else{
        buttonselect.text("COLOUR");
        buttona
        .transition()
        .duration(130)
        .style("left", "80px")
        } 
    $('#buttonselect').toggleClass('sliderb');
   }); 
/*
var intro = d3.select('#intro')
var introbrief = d3.select('#introbrief')

introbrief
  .transition()
  .duration(800)
  .style("opacity", 1);

intro
  .transition()
  .duration(500)
  .style("left", "0px");  
 //show menu 
menuopen.transition()
  .duration(500)
  .style("left", "163px");
  menuopencol.transition()
  .duration(500)
  .style("left", "0px");
 
intro  
  .on("click", function(){
    //fade out image
    introbrief
      .transition()
      .duration(500)
      .style("opacity", 0);
    //move box off screen
    intro
      .transition()
      .duration(500)
      .style("top", "-200px");

//hide menu
menuopen.transition()
  .duration(500)
  .style("left", "-2px");
  menuopencol.transition()
  .duration(500)
  .style("left", "-165px"); 
  //ROTATE ARROW
  if (menuopen.style("left") != "-2px"){
  $('#menubutton > div').toggleClass('rotated');
  }

//set intro display to none
setTimeout(function(){
 d3.select('#intro').style("display", "none");
  }, 700);  

}); //close intro onclick


*/



 }); //CLOSE MAKEMAP




    





//DONT LOAD UNTIL DATA LOADED?
  queue()
    .defer(d3.json, "data/countries.topo.json")
    .defer(d3.json, "data/states_usa.topo.json")
    .await(make_map);






})(this, document);

