//exporteert mongoclient om een verbinding te maken met mongodatabase
const {MongoClient} = require('mongodb');
//een constante van de verbindings url
const CONNECTION_URI = 'mongodb+srv://BenitoNwuje:P@ssw0rd@firstcluster0-e3dfb.mongodb.net/test?retryWrites=true&w=majority';
//constante van de database en collections 
const DATABASE = 'WebOntwikkeling';
const POKEMON_COLLECTION = 'Test';

//connection_uri is een link naar mongo-database
let client = new MongoClient(CONNECTION_URI, { useUnifiedTopology: true }); //maakt een nieuwe client aan
const loadIntoDatabase = async( user) => {
    try {
        let userDatabase = {name: user}
        await client.connect();
      const result =  await client
            .db(DATABASE)
            .collection(POKEMON_COLLECTION)
            .insertOne(userDatabase);

        console.log(`New listing created with the following id: ${result.insertedId}`);
    
    } catch (error) {
        console.log('error');
        console.log(error)
    }
    finally{
        await client.close();
    }
}

