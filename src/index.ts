import express, { Application } from "express"; // Используем Application
import { setupApp } from "./setup-app";
import { runDb } from "./db/mongo-db";
import dotenv from 'dotenv';

dotenv.config();

// Создаем app ВНЕ асинхронной функции, чтобы его можно было экспортировать
const app: Application = express();
setupApp(app);

const startApp = async () => {
    await runDb();

    // Vercel сам решит, на каком порту слушать, но для локальной разработки оставляем
    if (process.env.NODE_ENV !== 'test') {
        app.listen(process.env.PORT || 3003, () => {
            console.log(`Server is running on port ${process.env.PORT || 3003}`);
        });
    }
}

startApp().catch(console.dir);

// ОБЯЗАТЕЛЬНО для Vercel
export default app;