import {Router, Request, Response} from "express";
import {blogCollection, postCollection} from "../db/mongo-db";
import {HttpStatus} from "../core/statuses";


export const testingRouter = Router();



testingRouter.delete('/all-data', async (req: any, res: any)=> {

    await blogCollection.deleteMany();
    await postCollection.deleteMany()

    res.sendStatus(HttpStatus.NoContent)


})