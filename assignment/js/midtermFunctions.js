/* ================================
Week 6 Assignment: Midterm Functions + Signatures

================================ */
/* =====================
Leaflet Configuration
===================== */

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

// Parse GeoJSON file and add lines to map with styling
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
    style: slideView
  }).addTo(map);
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
  if (state.slideNumber === "1") {
    myStyle1();
  }
  else if (state.slideNumber === "2") {
    myStyle2();
  }
  else if (state.slideNumber === "3") {
    myStyle3();
  }
  else if (state.slideNumber === "4") {
    myStyle4();
    //zoom level
  }
  else if (state.slideNumber === "5") {
    myStyle5();
    //zoom level
  }
};

//click next button function
var clickNextButton = function(event) {
  var limit = state.slideData.length - 1;
  if (state.slideNumber + 1 > limit) {
    state.slideNumber = 0;
  } else {
    state.slideNumber = state.slideNumber + 1;
  }
  //return state.slideData[state.slideNumber];
  return state.slideNumber;
};

//pass function into button upon click
$("#nextButton").click(function(event) {
  clickNextButton();
});

//click previous button
var clickPreviousButton = function(event) {
  if (state.slideNumber - 1 < 0) {
    state.slideNumber = state.slideNumber.length - 1;
  } else {
    state.slideNumber = state.slideNumber - 1;
    }
    //return state.slideData[state.slideNumber];
    return state.slideNumber;
};

//pass function into button upon click
$("#prevButton").click(function(event) {
  clickPreviousButton();
});

//map.setZoom
//maybe earch of your slide have a zoom level

/* ================================

================================ */

// Function that color the lines for slide 1
//Logic: add colors by examining the "rt_symbol" field

var myStyle1 = function(feature) {
    //showResults();
    var mainColor = feature.properties.rt_symbol;
    console.log(feature.properties.rt_symbol);
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
};

// Function that colors the lines for slide 3
//Logic: highlight routes using the "name" field
var myStyle3 = function(feature) {
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
