"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../core/statuses");
const mongo_db_1 = require("../db/mongo-db"); // Импортируем клиент
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Получаем доступ к базе и коллекциям напрямую через клиент
        const db = mongo_db_1.client.db();
        yield db.collection('blogs').deleteMany({});
        yield db.collection('posts').deleteMany({});
        res.sendStatus(statuses_1.HttpStatus.NoContent);
    }
    catch (e) {
        console.error("❌ Error during data deletion:", e);
        res.sendStatus(500); // На всякий случай, если база не ответит
    }
}));
