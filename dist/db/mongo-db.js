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
exports.runDb = exports.client = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
exports.client = new mongodb_1.MongoClient(uri);
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            // Проверяем соединение пингом
            yield exports.client.db().command({ ping: 1 });
            console.log("✅ Connected to Mongo");
            return true;
        }
        catch (e) {
            console.error("❌ Mongo connection error", e);
            return false;
        }
    });
}
exports.runDb = runDb;
