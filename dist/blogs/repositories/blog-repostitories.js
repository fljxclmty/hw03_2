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
exports.blogsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo-db");
exports.blogsRepository = {
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield mongo_db_1.blogCollection.find().toArray();
            return blogs;
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return blog;
        });
    },
    createBlog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                _id: new mongodb_1.ObjectId(),
                name: data.name,
                description: data.description,
                websiteUrl: data.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            yield mongo_db_1.blogCollection.insertOne(newBlog);
            return newBlog;
        });
    },
    updateBlog(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.blogCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: data.name, description: data.description, websiteUrl: data.websiteUrl } });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    }
};
