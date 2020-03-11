let fetch = require('node-fetch');
const express = require('express');
const ejs = require('ejs');


//API buurt-gebruiksgroen
/*fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek8/MapServer/850/query?where=1%3D1&outFields=OBJECTID,NAAM,TYPE,NIVEAU,OMSCHRIJVING,POSTCODE,DISTRICT,STAD&outSR=4326&f=json')
.then(res => res.json())
.then(buurtData => {
    console.log(buurtData);
});*/

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
  res.render('index');
});

app.get('/stadsdeel', (req,res) =>{
  //API stadsdeel-gebruiksgroen
fetch('https://opendata.arcgis.com/datasets/593e9680b43e4332952d3ef249e1912a_854.geojson')
.then(res => res.json())
.then(stadsdeelData => {
    res.json(stadsdeelData);
});
});

app.listen(app.get('port'), () => {
  console.log(`Express started on http://localhost:${
    app.get('port')}; press Ctrl-C to terminate.`);
});