var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

 // Create a baseMaps object to hold the lightmap layer
 var baseMaps = {
  "Light Map": lightmap
};

//initialize all of the layer groups we'll be using
var layers = {
 airQuality: new L.LayerGroup(),
  asbestos: new L.LayerGroup(),
  leadDust: new L.LayerGroup(),
  industrialWaste: new L.LayerGroup(),
  mold: new L. layerGroup(),
  waterQuality: new L.LayerGroup()
};

//create the map with our layers
var map = L.map("map", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    layers.airQuality,
    layers.asbestos,
    layers.leadDust,
    layers.mold,
    layers.industrialWaste,
    layers.waterQuality
  ]
 });
//add our 'lightmap' tile layer to the map
lightmap.addTo(map);

//create an overlays object to add to the layer control
var overlays = {
  "Air Quality": layers.airQuality,
  "Asbestos": layers.asbestos,
  "Lead Dust": layers.leadDust,
  "Industrial Waste": layers.industrialWaste,
  "Mold": layers.mold,
  "Water Quality": layers.waterQuality
};

var airQualityMarkers = [];
var asbestosMarkers = [];
var leadDustMarkers = [];
var industrialWasteMarkers = [];
var moldMarkers = [];
var waterQualityMarkers = [];

//create a control for our layers, add our overlay layers to it
L.control
.layers(null, overlays,{
  collapsed: true
}).addTo(map);


// // Create icons for each layer group
//  var icons = {
 var airQualityicon = L.ExtraMarkers.icon({
    icon: "fa-spinner",
    iconColor: "white",
    markerColor: "cyan",
    shape: "penta"
  });
  var asbestosicon = L.ExtraMarkers.icon({
    icon: "glyphicon-cog",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  });
  var leadicon = L.ExtraMarkers.icon({
    icon: "fa-igloo",
    iconColor: "white",
    markerColor: "black",
    shape: "penta"
  });
  var industrialWasteicon = L.ExtraMarkers.icon({
    icon: "sync",
    iconColor: "white",
    markerColor: "orange",
    shape: "square"
  });
  var moldicon = L.ExtraMarkers.icon({
    icon: "fa-spinner",
    iconColor: "white",
    markerColor: "green-light",
    shape: "star"
  });
  var waterQualityicon = L.ExtraMarkers.icon({
    icon: "fa-coffee",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "circle"
  });

//var legend = L.control({position: 'bottomright'});

//legend.onAdd = function (map) {

    //var div = L.DomUtil.create('div', 'info legend'),
       //complaints = ["Air Quality", "Asbestos", 'Lead', 'Industrial Waste', 'Mold', 'Water Quality'],
        //labels = [layers.airQuality, layers.asbestos, layers.lead, layers.industrialWaste, layers.mold, layers.waterQuality];

    // loop through our density intervals and generate a label with a colored square for each interval
    //for (var i = 0; i < complaints.length; i++) {
        //div.innerHTML +=
            //complaints[i] + (" <img src="+ labels[i] +" height='25' width='25'>") +'<br>';
    //}

    //return div;
//};

//legend.addTo(map);//

var airQualityURL = 'http://localhost:5000/api/v1/airQuality';
var asbestosURL = 'http://localhost:5000/api/v1/asbestos';
var leadDustURL = 'http://localhost:5000/api/v1/leadDust';
var industrialWasteURL = 'http://localhost:5000/api/v1/industrialWaste';
var moldURL = 'http://localhost:5000/api/v1/mold';
var waterQualityURL = 'http://localhost:5000/api/v1/waterQuality';
 
d3.json(airQualityURL, function(response) {
	console.log(response);
	for (var i = 0; i < response.length; i++) {
		var location = response[i].location;
		var description = response[i].descriptor; 
		if (location) { 
			var newMarker = L.marker([location.coordinates[1], location.coordinates[0]],{icon: airQualityicon});
			airQualityMarkers.push(newMarker);
			if (description) {
				newMarker.bindPopup(description + "<br/>" + response[i].incident_address);
			}
			newMarker.addTo(layers["airQuality"]);
		}
	}
//  /*
d3.json(asbestosURL, function(response) { 
	console.log(response); 
	for (var i = 0; i < response.length; i++) {
		var location = response[i].location;
		var description = response[i].descriptor; 
		if (location) {
			var newMarker = L.marker([location.coordinates[1], location.coordinates[0]],{icon: asbestosicon});
			asbestosMarkers.push(newMarker);
			if (description) {
				newMarker.bindPopup(description + "<br/>" + response[i].incident_address);
			}
			newMarker.addTo(layers["asbestos"]);		  
		}
	}

d3.json(leadDustURL, function(response) { 
    console.log(response); 
    for (var i = 0; i < response.length; i++) {
		var location = response[i].location;
		var description = response[i].descriptor; 
		if (location) {
			var newMarker = L.marker([location.coordinates[1], location.coordinates[0]],{icon: leadicon});
			leadDustMarkers.push(newMarker);
			if (description) {
				newMarker.bindPopup(description + "<br/>" + response[i].incident_address);
			}
			newMarker.addTo(layers["leadDust"]);
		} 
	}
	
d3.json(industrialWasteURL, function(response) { 
    console.log(response); 
	for (var i = 0; i < response.length; i++) {
		var location = response[i].location;
		var description = response[i].descriptor; 
		if (location) {
			var newMarker = L.marker([location.coordinates[1], location.coordinates[0]],{icon: industrialWasteicon});
			industrialWasteMarkers.push(newMarker);
			if (description) {
				newMarker.bindPopup(description + "<br/>" + response[i].incident_address);
			}
			newMarker.addTo(layers["industrialWaste"]);
		} 
	}
d3.json(moldURL, function(response) { 
    console.log(response); 
	for (var i = 0; i < response.length; i++) {
		var location = response[i].location;
		var description = response[i].descriptor; 
		if (location) {
			var newMarker = L.marker([location.coordinates[1], location.coordinates[0]],{icon: moldicon});
			moldMarkers.push(newMarker);
			if (description) {
				newMarker.bindPopup(description + "<br/>" + response[i].incident_address);
			}
			newMarker.addTo(layers["mold"]);
		}      
	}
d3.json(waterQualityURL, function(response) { 
    console.log(response); 
    for (var i = 0; i < response.length; i++) {
		var location = response[i].location; 
		var description = response[i].descriptor; 
		if (location) {
			var newMarker = L.marker([location.coordinates[1], location.coordinates[0]],{icon: waterQualityicon});
			waterQualityMarkers.push(newMarker);
			if (description) {
				newMarker.bindPopup(description + "<br/>" + response[i].incident_address);
			}
			newMarker.addTo(layers["waterQuality"]);
		}      
	}
})})})}) }) //*/
});



function removeLayers(){
	$("#waterQuality, #mold, #industrialWaste, #leadDust, #asbestos, #airQuality").removeClass('selected')
	
	map.removeLayer(layers.airQuality);
	map.removeLayer(layers.asbestos);
	map.removeLayer(layers.leadDust);
	map.removeLayer(layers.industrialWaste);
	map.removeLayer(layers.mold);
	map.removeLayer(layers.waterQuality);	 
}

$("#airQuality").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(layers.airQuality)) {
        $(this).removeClass('selected');
        map.removeLayer(layers.airQuality);
    } else {
        map.addLayer(layers.airQuality);        
        $(this).addClass('selected');
   }
});

$("#asbestos").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(layers.asbestos)) {
        $(this).removeClass('selected');
        map.removeLayer(layers.asbestos);
    } else {
        map.addLayer(layers.asbestos);        
        $(this).addClass('selected');
   }
});

$("#leadDust").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(layers.leadDust)) {
        $(this).removeClass('selected');
        map.removeLayer(layers.leadDust);
    } else {
        map.addLayer(layers.leadDust);        
        $(this).addClass('selected');
   }
});

$("#industrialWaste").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(layers.industrialWaste)) {
        $(this).removeClass('selected');
        map.removeLayer(layers.industrialWaste);
    } else {
        map.addLayer(layers.industrialWaste);        
        $(this).addClass('selected');
   }
});

$("#mold").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(layers.mold)) {
        $(this).removeClass('selected');
        map.removeLayer(layers.mold);
    } else {
        map.addLayer(layers.mold);        
        $(this).addClass('selected');
   }
});

$("#waterQuality").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(layers.waterQuality)) {
        $(this).removeClass('selected');
        map.removeLayer(layers.waterQuality);
    } else {
        map.addLayer(layers.waterQuality);        
        $(this).addClass('selected');
   }
});

$("#clearFilters").click(function(event) {
    removeLayers();
}); 
   


removeLayers();
 