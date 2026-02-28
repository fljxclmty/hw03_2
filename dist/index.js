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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Используем Application
const setup_app_1 = require("./setup-app");
const mongo_db_1 = require("./db/mongo-db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Создаем app ВНЕ асинхронной функции, чтобы его можно было экспортировать
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongo_db_1.runDb)();
    // Vercel сам решит, на каком порту слушать, но для локальной разработки оставляем
    if (process.env.NODE_ENV !== 'test') {
        app.listen(process.env.PORT || 3003, () => {
            console.log(`Server is running on port ${process.env.PORT || 3003}`);
        });
    }
});
startApp().catch(console.dir);
// ОБЯЗАТЕЛЬНО для Vercel
exports.default = app;
