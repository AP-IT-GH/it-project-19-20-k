let fetch = require('node-fetch');
const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser= require('body-parser');

//Hashing van het wachtwoord
const CryptoJS = require('crypto-js');

//DATABASE
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://youssef:dbyoussef@apcluster-emjou.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE = 'ProjectK';
const USERS_COLLECTION = 'Users';

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Zorgt voor data te ontvangen van de <form> element
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/buurt', (req,res) =>{
    //API buurt-gebruiksgroen
    fetch('https://opendata.arcgis.com/datasets/c96c56b2c36f48cc86fbe77ea872b555_850.geojson')
    .then(res => res.json())
    .then(buurtData => {
    res.json(buurtData);
  });
});

//Data van de register form ontvangen en verwerken in mongoDB
app.post('/register', async(req, res) => {
  try{
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.psw;
    let user = {
      username: username,
      password: CryptoJS.MD5(password).toString()
    }
    
    await client.db(DATABASE).collection(USERS_COLLECTION).insertOne(user);
    console.log(client);
  }
  catch(exc){
    console.log(exc);
  }
  finally{
    //res.redirect('/');
    await client.close();
  }
})

app.listen(app.get('port'), () => {
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
});