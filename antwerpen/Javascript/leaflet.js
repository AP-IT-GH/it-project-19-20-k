// Map toevoegen
let myMap = L.map('stationMap', {
  center: [51.2301, 4.41774],
  zoom: 16
});


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(myMap);
//

//Locatie opvragen
myMap.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
var radius = e.accuracy;

L.marker(e.latlng).addTo(myMap)
    .bindPopup("Je bent " + radius + " meter in de buurt").openPopup();

L.circle(e.latlng, radius).addTo(myMap);
}
//

//Foutmelding locatie aanvraag
myMap.on('locationfound', onLocationFound);

function onLocationError(e) {
alert(e.message);
}

map.on('locationerror', onLocationError);
//

// Layers (werkt momenteel niet)
/*

let cities = L.layerGroup([littleton]);

let littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
  denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
  aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
  golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');


let grayscale = L.tileLayer(mapboxUrl, {id: 'stationMap', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
  streets   = L.tileLayer(mapboxUrl, {id: 'stationMap', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

let map = L.map('stationMap', {
  center: [39.73, -104.99],
  zoom: 10,
  layers: [grayscale, cities]
});

let baseMaps = {
"Grayscale": grayscale,
"Streets": streets
};

let overlayMaps = {
"Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(myMap);


//Polygon
// Creating markers
var hydMarker = new L.Marker([4.484609695431069,
51.21894916871362]);
var vskpMarker = new L.Marker([17.686816, 83.218482]);
var vjwdMarker = new L.Marker([16.506174, 80.648015]);

// Creating latlng object
var latlngs = [
 [4.484609695431069,
  51.21894916871362],
 [16.506174, 80.648015],
 [17.686816, 83.218482]
];
// Creating a polygon
var polygon = L.polygon(latlngs, {color: 'red'});
var layerGroup = L.layerGroup([hydMarker, vskpMarker, vjwdMarker, polygon]);
layerGroup.addTo(myMap);
*/