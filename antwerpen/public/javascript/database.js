const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://youssef:dbyoussef@apcluster-emjou.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true });
const DATABASE = 'ProjectK';
const USERS_COLLECTION = 'Users';

const GetUsers = async(client) => {
    try{
        await client.connect();
        //om uit te testen
        let user1 = {
            _id: 1,
            name: 'El Hindaz',
            password: 'youssefelhindaz',
            favorieten: 'Stadspark'
        }
        await client.db(DATABASE).collection(USERS_COLLECTION).deleteMany({});
        await client.db(DATABASE).collection(USERS_COLLECTION).insertOne(user1);
    }
    catch(exc){
        console.log(exc);
    }
    finally{
        await client.close();
    }
}

GetUsers(client);