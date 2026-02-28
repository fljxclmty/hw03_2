"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminGuardMiddleware = void 0;
const statuses_1 = require("./statuses");
const superAdminGuardMiddleware = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic') {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_password) {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    next();
};
exports.superAdminGuardMiddleware = superAdminGuardMiddleware;
