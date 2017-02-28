/* ================================
Week 6 Assignment: Midterm Functions + Signatures

================================ */
/* =====================
Leaflet Configuration
===================== */

//Questions:
//How to attach the slide functions into the slide numbers?
//I have a function(slideView) which says when each slide number appears, call a specific function - but the function doesn't run on it's own
//I need the function to reference the parsed data - I can put in the ajax call, but then the layers overlap
//Should I add layers and then remove them? Is there a cleaner way to do it?
//Can I call the functions in a way that "resets" the map each time?


var map = L.map('map', {
  center: [40.733110, -73.980036],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


// AJAX Call to fetch data
var dataset = "https://raw.githubusercontent.com/clairedouglass/midterm/master/Subway%20Lines.geojson";
var featureGroup;

var parsedData;

// Parse GeoJSON file and add lines to map with styling
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    parsedData = JSON.parse(data);
    console.log(parsedData);
    featureGroup = L.geoJson(parsedData, {style: myStyle1}).addTo(map);
  });
});


//define the state
var state = {
  "slideNumber": 0,
  "slideData": [
    {
    "name": "Slide1",
    "title": "New York City Subway Lines"
    },
    {
    "name": "Slide2",
    "title": "Subway History"
    },
    {
    "name": "Slide3",
    "title": "Ongoing Superstorm Sandy Recovery Work"
    },
    {
    "name": "Slide4",
    "title": "New Hudson Yards Line"
    },
    {
    "name": "Slide5",
    "title": "Three New Second Avenue Subway Stops"
    },
  ]
};

//adds functions to slides
var slideView = function(state) {
  if (state.slideNumber === 1) {
    _.each(parsedData.features, function(feature){
      featureGroup.setStyle({style: myStyle1(feature)});
    });
  }
  else if (state.slideNumber === 2) {
    _.each(parsedData.features, function(feature){
      featureGroup.setStyle({style: myStyle2(feature)});
    });
  }
  else if (state.slideNumber === 3) {
    myStyle3();
  }
  else if (state.slideNumber === 4) {
    myStyle4();
  }
  else if (state.slideNumber === 5) {
    myStyle5();
  }
};


//Do I need these functions below??

//Set the slide style
var setStyle = function(state) {
  $().css('style', slideView(state.slideNumber));
};

//Clear map
var removeLines = function(data) {
  _.each(data, function(marker) {
    return map.removeLayer(marker);
  });
};
//resetMap();

//click next button function
var forward = function(event) {
  console.log('Inside the click next button function');
  var limit = state.slideData.length - 1;
  if (state.slideNumber + 1 > limit) {
    state.slideNumber = 0;
  } else {
    state.slideNumber = state.slideNumber + 1;
  }
  return state.slideNumber;
};

//pass function into button upon click
$("#nextButton").click(function(event) {
  console.log('Click Next Button');
  forward();
  slideView(state);
});

//click previous button
var backward = function(event) {
  console.log('Inside');
  if (state.slideNumber - 1 < 0) {
    state.slideNumber = state.slideNumber.length - 1;
  } else {
    state.slideNumber = state.slideNumber - 1;
  }
  return state.slideNumber;
    //return state.slideData[state.slideNumber];
};

//pass function into button upon click
$("#prevButton").click(function(event){
  console.log('Click Back Button');
  backward();
  slideView(state);
});


/* ================================

================================ */

// Function that color the lines for slide 1
//Logic: add colors by examining the "rt_symbol" field

var myStyle1 = function(feature) {
    //showResults();
    $(".main").replaceWith("<h2>New York City Subway Lines</h2>");
    $("#content").replaceWith("<p>Subway lines are represented by their MTA colors</p>");
    var mainColor = feature.properties.rt_symbol;
    switch(mainColor) {
      case "1":
        return {color: 'red'};
      case "4":
        return {color: 'green'};
      case "7":
        return {color: 'purple'};
      case "A":
        return {color: 'blue'};
      case "B":
        return {color: 'orange'};
      case "G":
        return {color: 'light green'};
      case "J":
        return {color: 'brown'};
      case "L":
        return {color: 'gray'};
      case "N":
        return {color: 'yellow'};
    }
};


// Function that colors the lines for slide 2
//Logic: categorize rt_symbol values into three groups

var myStyle2 = function(feature) {
  $(".main").replaceWith("<h2>History: A Tale of Three Companies</h2>");
  $("#content").replaceWith("<p>BMT, IRT</p>");
  var mainColor = feature.properties.rt_symbol;
  switch(mainColor) {
    case "1":
    case "4":
    case "7":
      return {color: 'red'};
    case "A":
    case "B":
    case "G":
      return {color: 'blue'};
    case "L":
    case "J":
    case "N":
      return {color: 'yellow'};
  }
  setStyle()
};

// Function that colors the lines for slide 3
//Logic: highlight routes using the "name" field
var myStyle3 = function(feature) {
  $(".main").replaceWith("<h2>Ongoing Superstorm Sandy Recovery Efforts</h2>");
  $("#content").replaceWith("<p>Lines that are under construction</p>");
  var mainColor = feature.properties.rt_symbol;
  switch(mainColor) {
    case "L":
    case "A":
    case "C":
    case "E":
    case "M":
      return {color: 'red'};
    default:
      return {color: 'gray'};
  }
};

//define zoom for slide 4
var slide4Center = [40.756778, -73.994099];
var myStyle4Zoom = function() {
  map.setView(slide4Center, 15);
};

// Function that colors the lines for slide 4
var myStyle4 = function(feature) {
  myStyle4Zoom();
  $(".main").replaceWith("<h2>New Infrastructure: Hudson Yards Subway Stop</h2>");
  $("#content").replaceWith("<p>Hudson Yards</p>");
  var mainColor = feature.properties.rt_symbol;
  switch(mainColor) {
    case "7":
      return {color: 'green'};
    default:
      return {color: 'gray'};
    }
};

//Define zoom for slide 5
var slide5Center = [40.772850, -73.955793];
var myStyle5Zoom = function() {
  map.setView(slide5Center, 15);
};

// Function that colors the lines for slide 5
var myStyle5 = function(feature) {
  myStyle5Zoom();
  $(".main").replaceWith("<h2>New Subway Infrastructure: Second Avenue Subway</h2>");
  $("#content").replaceWith("<p>Three new stops opened on January 1, 2017</p>");
  var mainColor = feature.properties.name;
  switch(mainColor) {
    case "Q":
      return {color: 'green'};
    default:
      return {color: 'gray'};
    }
};

/* ================================

===================== */
