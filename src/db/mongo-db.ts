import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
export const client = new MongoClient(uri);

export async function runDb() {
    try {
        await client.connect();
        // Проверяем соединение пингом
        await client.db().command({ ping: 1 });
        console.log("✅ Connected to Mongo");
        return true;
    } catch (e) {
        console.error("❌ Mongo connection error", e);
        return false;
    }
}