let fetchStadsdeel = 'https://opendata.arcgis.com/datasets/593e968ib43e4332952d3ef249e1912a_854.geojson';

let myMap = L.map('stationMap', {
    center: [51.2301, 4.41774],
    zoom: 12
  });
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.i/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
  }).addTo(myMap);
  



//Locatie opvragen
myMap.locate({setView: true, maxZoom: 13});

function onLocationFound(e) {
let radius = e.accuracy;

L.marker(e.latlng).addTo(myMap)
    .bindPopup("Je bent " + radius + " meter in de buurt").openPopup();

L.circle(e.latlng, radius).addTo(myMap);
}

myMap.on('locationfound', onLocationFound);

//Kleur voor polygons
let myStyleStadsdeel = {
  fillColor: 'darkgreen',
  color: 'green'
};

// Layers
let stadsdeel = L.layerGroup();
let buurt = L.layerGroup();

//API stadsdeel-gebruiksgroen
fetch('/stadsdeel')
.then((response) => {
  return response.json();
})
.then((data) => {
  L.geoJSON(data, {
    onEachFeature: (features, layer) => {
      let naam = features.properties.NAAM;
      let postcode = features.properties.POSTCODE;
      let district = features.properties.DISTRICT;
      let omschrijving = features.properties.OMSCHRIJVING;
      layer.setStyle(myStyleStadsdeel);
      layer.bindPopup(`<div class = 'popup'>${naam}</div> <br> <div class = 'popup'>${postcode}</div> 
      <div class = 'popup'>${district}</div> <br> <div class = 'popup'>${omschrijving}</div>`);
    }
  }).addTo(stadsdeel);
})

//API buurt-gebruiksgroen 
/*fetch('/buurt')
.then((response) => {
  return response.json();
})
.then(data => {
});*/

let buurt = L.layerGroup();

L.marker([51.2211, -4.4021]).bindPopup('This is Littleton, CO.').addTo(buurt);

let mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

let grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

let map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [grayscale, stadsdeel,buurt]
});

let baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

let overlays = {
    "Buurt gebruiksgroen": buurt,
    "Stadsdeel gebruiksgroen": stadsdeel
};

L.control.layers(baseLayers, overlays).addTo(myMap);
//

