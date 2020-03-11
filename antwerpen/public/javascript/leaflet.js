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

  L.geoJSON(data, {
    onEachFeature: (features, layer) => {
      let naam = features.properties.NAAM;
      let postcode = features.properties.POSTCODE;
      let district = features.properties.DISTRICT;
      let omschrijving = features.properties.OMSCHRIJVING;
      layer.bindPopup(`<div class = 'popup'>${naam}</div> <br> <div class = 'popup'>${postcode}</div> 
      <div class = 'popup'>${district}</div> <br> <div class = 'popup'>${omschrijving}</div>`);
    }
  }).addTo(myMap);

});