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
  

  fetch('/stadsdeel')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.features);
    L.geoJSON(data).addTo(myMap);
    let arrayStadsdeel = [];
    for(let i = 0;i < data.features.length; i++){
      arrayStadsdeel[i] =  data.features[i];
    }
    
    console.log(arrayStadsdeel.attributes.NAAM)


    console.log(arrayStadsdeel[0].attributes.NAAM);
  });

