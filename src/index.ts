import express, {Express} from "express";
import {setupApp} from "./setup-app";
import {runDb} from "./db/mongo-db";
import dotenv from 'dotenv';

dotenv.config();





const startApp = async () => {

    const app: Express = express();
    setupApp(app);

    await runDb();

    app.listen(process.env.PORT || 3003, () => {
        console.log(`Example app listening on port ${process.env.PORT || 3003}`);
    });
    return app;
}


startApp().catch(console.dir);

