let myMap = L.map('stationMap', {
    center: [51.2301, 4.41774],
    zoom: 12
  });
  
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.i/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(myMap);


//Kleur voor polygons
let myStyleStadsdeel = {
  fillColor: 'darkgreen',
  color: 'green'
};

let myStyleBuurt ={
  fillColor: 'darkpurple',
  color: 'purple'
}

// Layers
let stadsdeel = L.layerGroup();
let buurt = L.layerGroup();
let antwerpen2000 = L.layerGroup();
let antwerpen2060 = L.layerGroup();
let hoboken2660 = L.layerGroup();
let berchem2600 = L.layerGroup();
let deurne2100 = L.layerGroup();
let merksem2170= L.layerGroup();
let linkeroever2050 = L.layerGroup();
let wilrijk2610 = L.layerGroup();
let ekeren2180 = L.layerGroup();


//API stadsdeel-gebruiksgroen
let stadArray = [];
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
      for (let i = 0; i < data.features.length; i++) {
        stadArray[i] = data.features[i];
      }
      layer.setStyle(myStyleStadsdeel);
      layer.bindPopup(`<div class = 'popup'>${naam}</div> <br> <div class = 'popup'>${postcode}</div> 
      <div class = 'popup'>${district}</div> <br> <div class = 'popup'>${omschrijving}</div>`);
    }
  }).addTo(stadsdeel);
})

//API buurt-gebruiksgroen 
let buurtArray = [];
fetch('/buurt')
.then((response) => {
  return response.json();
})
.then(data => {
  L.geoJSON(data, {
  onEachFeature: (features, layer) => {
      let naam = features.properties.NAAM;
      let postcode = features.properties.POSTCODE;
      let district = features.properties.DISTRICT;
      let omschrijving = features.properties.OMSCHRIJVING;
      for (let i = 0; i < data.features.length; i++) {
        buurtArray[i] = data.features[i];
      }
      layer.setStyle(myStyleBuurt);
      layer.bindPopup(`<div class = 'popup'>${naam}</div> <br> <div class = 'popup'>${postcode}</div> 
      <div class = 'popup'>${district}</div> <br> <div class = 'popup'>${omschrijving}</div>`);
     

    }
  }).addTo(buurt);
})












let mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

let grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

let map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [grayscale, stadsdeel,buurt,antwerpen2000,antwerpen2060,berchem2600,hoboken2660,deurne2100,merksem2170,linkeroever2050,ekeren2180,wilrijk2610]
});

let overlays = {
    "Buurt gebruiksgroen": buurt,
    "Stadsdeel gebruiksgroen": stadsdeel,
    "Antwerpen-2000":antwerpen2000,
    "Antwerpen-2060":antwerpen2060,
    "Berchem-2600":berchem2600,
    "Hoboken-2660":hoboken2660,
    "Deurne-2100":deurne2100,
    "Merksem-2170":merksem2170,
    "Linkeroever-2050":linkeroever2050,
    "Ekeren-2180":ekeren2180,
    "Wilrijk-2610":wilrijk2610
};

L.control.layers( overlays).addTo(myMap);
//

//Locatie opvragen
let latitude,longitude;
myMap.locate({setView: true, maxZoom: 13});
navigator.geolocation.getCurrentPosition(function(location){
  latitude = location.coords.latitude;
  longitude = location.coords.longitude;

  //routing
  let control = L.Routing.control({
    waypoints: [
      L.latLng(latitude,longitude),
    ],
    routeWhileDragging: true,
    collapsible: true,
    router: L.Routing.mapbox('pk.eyJ1IjoiYWJkdXJyYWhtYW5kdW5kYXIiLCJhIjoiY2s5N3U3eHV0MDBveTNucWl1OTNtZDc3cyJ9.ZvvJHZHkuqIst2eBTRPzfA')
  }).addTo(myMap);

  //Voor routing click route
  function createButton(label, container) {
    let btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  myMap.on('click', function(e) {
    let container = L.DomUtil.create('div'),
        startBtn = createButton('Start van deze locatie', container),
        destBtn = createButton('Ga naar deze locatie', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(myMap);
        
    L.DomEvent.on(startBtn, 'click', function() {
      control.spliceWaypoints(0, 1, e.latlng);
      myMap.closePopup();
    });
    
    L.DomEvent.on(destBtn, 'click', function() {
      control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
      myMap.closePopup();
    });
  });
});