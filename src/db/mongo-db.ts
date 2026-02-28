import {MongoClient, Db, Collection} from "mongodb";

const uri = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';


const client = new MongoClient(uri);

export let blogCollection: Collection;
export let postCollection: Collection;



export async function runDb() {

    try {
        await client.connect();

        const db: Db = client.db();
         blogCollection = db.collection('blogs');
         postCollection= db.collection('posts');

        console.log("✅ Connected to Mongo");
        return true;
    }
    
    catch (e) {
        console.error("❌ Mongo connection error", e);
        await client.close();
        return false;
    }

}