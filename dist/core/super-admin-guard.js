"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminGuardMiddleware = void 0;
const statuses_1 = require("./statuses");
const superAdminGuardMiddleware = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.sendStatus(statuses_1.HttpStatus.Unauthorized);
    }
    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic' || !token) {
        return res.sendStatus(statuses_1.HttpStatus.Unauthorized);
    }
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    // Берем значения из ENV или используем дефолты
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'qwerty'; // Исправил на заглавную P
    if (username !== expectedUsername || password !== expectedPassword) {
        return res.sendStatus(statuses_1.HttpStatus.Unauthorized);
    }
    next();
};
exports.superAdminGuardMiddleware = superAdminGuardMiddleware;
