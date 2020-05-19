let myMap = L.map('stationMap', {
  center: [51.2301, 4.41774],
  zoom: 12
});

let tileLayerMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.i/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(myMap);

//COntrol
let control;

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
let antwerpen = L.layerGroup();
let hoboken = L.layerGroup();
let berchem = L.layerGroup();
let deurne = L.layerGroup();
let merksem = L.layerGroup();
let linkeroever = L.layerGroup();
let wilrijk = L.layerGroup();
let ekeren = L.layerGroup();
let wijnegem = L.layerGroup();
let schoten = L.layerGroup();
let beveren = L.layerGroup();
let brasschaat = L.layerGroup();
let borgerhout = L.layerGroup();
let wommelgem = L.layerGroup();
let mortsel = L.layerGroup();
let kapellen = L.layerGroup();
let edegem = L.layerGroup();
let borsbeek = L.layerGroup();
let zwijndrecht = L.layerGroup();
let stabroek = L.layerGroup();
let berendrecht = L.layerGroup();
let hemiksem = L.layerGroup();
let aartselaar = L.layerGroup();

let arrayDistrict = [aartselaar,antwerpen,berchem,berendrecht,borgerhout,borsbeek,brasschaat,deurne,edegem,ekeren,hemiksem,hoboken,kapellen,merksem,mortsel,schoten,stabroek,wijnegem,wilrijk,wommelgem,zwijndrecht]
let arrayDistrictName = ['Aartselaar','Antwerpen','Berchem','Berendrecht-Zandvliet-Lillo','Borgerhout','Borsbeek','Brasschaat','Deurne','Edegem','Ekeren','Hemiksem','Hoboken','Kapellen','Merksem','Mortsel','Schoten','Stabroek','Wijnegem','Wilrijk','Wommelgem','Zwijndrecht']

//Locatie opvragen
let latitude,longitude;
myMap.locate({setView: true, maxZoom: 13});
navigator.geolocation.getCurrentPosition(function(location){
latitude = location.coords.latitude;
longitude = location.coords.longitude;

//routing
control = L.Routing.control({
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


//API stadsdeel-gebruiksgroen
let getStadsdeel = document.getElementById("radio1");
let getBuurt = document.getElementById("radio2");

// Elke keer als da verandert doen we dit
getStadsdeel.addEventListener('click', () => {
  if (getStadsdeel.checked) {

    arrayDistrict.forEach(layer => layer.clearLayers());
  
    fetch('/stadsdeel')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < arrayDistrict.length; i++) {
          stadsdeelData = L.geoJSON(data, {
          onEachFeature: (features, layer) => {
          let naam = features.properties.NAAM;
          let postcode = features.properties.POSTCODE;
          let district = features.properties.DISTRICT;
          let omschrijving = features.properties.OMSCHRIJVING;
          layer.setStyle(myStyleStadsdeel);
          layer.bindPopup(`<div class = 'popup'>${naam} <br> ${postcode} 
          ${district} <br> ${omschrijving}</div><hr>
          <button id= "idRoute"> Klik voor route </button><br><br>
          <div class="pretty p-switch p-fill">
            <input type="checkbox" />
            <div class="state">
              <label>Kies als favoriet</label>
            </div>
          </div>`,
          layer.bindPopup,
          layer.on('popupopen', function (e) {
            let destBtn = document.getElementById("idRoute")
            L.DomEvent.on(destBtn, 'click', function() {
              control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.popup.getLatLng())
              myMap.closePopup();
          })
        }))
        },
        filter: (features, layer) => {
          let district = features.properties.DISTRICT;
            if(district === arrayDistrictName[i]){
              return features.properties.DISTRICT;
            }
          }
        }).addTo(arrayDistrict[i]);
      }
    })
  }
})

getBuurt.addEventListener('click', () => {
  if (getBuurt.checked) {
    arrayDistrict.forEach(layer => layer.clearLayers());
  
    //API buurt-gebruiksgroen
    fetch('/buurt')
      .then((response) => {
        return response.json();
      })
      .then(data => {
        for (let i = 0; i < arrayDistrict.length; i++) {
          buurtData = L.geoJSON(data, {
          onEachFeature: (features, layer) => {
            let naam = features.properties.NAAM;
            let postcode = features.properties.POSTCODE;
            let district = features.properties.DISTRICT;
            let omschrijving = features.properties.OMSCHRIJVING;
            layer.setStyle(myStyleBuurt);
            layer.bindPopup(`<div class = 'popup'>${naam} <br> ${postcode} 
            ${district} <br> ${omschrijving}</div><hr>
            <button id= "idRoute"> Klik voor route </button><br><br>
            <div class="pretty p-switch p-fill">
              <input type="checkbox" />
              <div class="state">
                <label>Kies als favoriet</label>
              </div>
            </div>`,
              layer.bindPopup,
              layer.on('popupopen', function (e) {
                let destBtn = document.getElementById("idRoute")
                L.DomEvent.on(destBtn, 'click', function() {
                  control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.popup.getLatLng())
                  myMap.closePopup();
              })
            }))        
            },

            filter: (features, layer) => {
              let district = features.properties.DISTRICT;
              if(district === arrayDistrictName[i]){
                return features.properties.DISTRICT;
              }
            } 
          }).addTo(arrayDistrict[i]);
        }
      })
    }
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
  layers: [aartselaar, antwerpen, berchem, berendrecht, borgerhout, borsbeek, brasschaat, deurne, edegem, ekeren, hemiksem, hoboken, kapellen, merksem, mortsel, schoten, stabroek, wijnegem, wilrijk, wommelgem, zwijndrecht]
});

let overlays = {
  "Aartselaar": aartselaar,
  "Antwerpen":antwerpen,
  "Berchem":berchem,
  "Berendrecht-Zandvliet-Lillo": berendrecht,
  "Borgerhout": borgerhout,
  "Borsbeek": borsbeek,
  "Brasschaat": brasschaat,
  "Deurne":deurne,
  "Edegem": edegem,
  "Ekeren":ekeren,
  "Hemiksem": hemiksem,
  "Hoboken":hoboken,
  "Kapellen": kapellen,
  "Merksem":merksem,
  "Mortsel": mortsel,
  "Schoten": schoten,
  "Stabroek": stabroek,
  "Wijnegem": wijnegem,
  "Wilrijk":wilrijk,
  "Wommelgem": wommelgem,
  "Zwijndrecht": zwijndrecht
};

L.control.layers( overlays).addTo(myMap);
