let fetch = require('node-fetch');
fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek8/MapServer/854/query?where=1%3D1&outFields=OBJECTID,NAAM,TYPE,NIVEAU,OMSCHRIJVING,POSTCODE,DISTRICT,STAD&outSR=4326&f=json')
.then(res => res.json())
.then(stadsdeelData => {
    console.log(stadsdeelData);
})