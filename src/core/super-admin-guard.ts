import {Request, Response, NextFunction} from "express";
import {HttpStatus} from "./statuses";





export const superAdminGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const auth = req.headers['authorization'] as string;
    if (!auth) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }

    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic') {
        res.sendStatus(HttpStatus.Unauthorized)
        return;
    }

    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');


    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_password) {
        res.sendStatus(HttpStatus.Unauthorized)
        return;
    }

    next()
}