let myMap = L.map('stationMap', {
    center: [51.2301, 4.41774],
    zoom: 12
  });
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
  }).addTo(myMap);
  
  let marker = L.marker([51.2301, 4.41774]).addTo(myMap);
  let marker1 = L.marker([51.2301, 4.42774]).addTo(myMap);
  