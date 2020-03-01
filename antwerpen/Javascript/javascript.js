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


let marker = L.marker([51.2301, 4.41774]).addTo(myMap);
marker.bindPopup("AP Ellermanstraat");
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

let cities = L.layerGroup([marker]);

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
*/
