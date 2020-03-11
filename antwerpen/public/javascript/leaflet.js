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

//API stadsdeel
fetch('/stadsdeel')
.then((response) => {
  return response.json();
})
.then((data) => {
  //Nakijken of dat alle objecten worden getoond in console.
  console.log(data.features);
  //arrays aanmaken om sneller properties op te roepen.
  let arrayStadsdeel = [];
  for(let i = 0;i < data.features.length; i++){
    arrayStadsdeel[i] =  data.features[i].properties;
  }

  L.geoJSON(data, {
    onEachFeature: (feature, layer) => {
      let naam = feature.properties.NAAM;
      let postcode = feature.properties.POSTCODE;
      let district = feature.properties.DISTRICT;
      layer.bindPopup(`${naam}, ${postcode}, ${district}`);
    }
  }).addTo(myMap);

});