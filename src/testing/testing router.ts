import {Router} from "express";
import {HttpStatus} from "../core/statuses";
import {client} from "../db/mongo-db"; // Импортируем клиент

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: any, res: any) => {
    try {
        // Получаем доступ к базе и коллекциям напрямую через клиент
        const db = client.db();

        await db.collection('blogs').deleteMany({});
        await db.collection('posts').deleteMany({});

        res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
        console.error("❌ Error during data deletion:", e);
        res.sendStatus(500); // На всякий случай, если база не ответит
    }
});