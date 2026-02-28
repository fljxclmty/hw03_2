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
exports.postsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo-db"); // Импортируем клиент
const blog_repostitories_1 = require("../../blogs/repositories/blog-repostitories");
// Функция для безопасного получения коллекции
const getCollection = () => mongo_db_1.client.db().collection('posts');
exports.postsRepository = {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield getCollection().find().toArray();
            return posts;
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id))
                return null;
            // Исправил Object на ObjectId
            const post = yield getCollection().findOne({ _id: new mongodb_1.ObjectId(id) });
            return post;
        });
    },
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_repostitories_1.blogsRepository.getBlogById(data.blogId);
            // Важно: если блог не найден, пост создавать нельзя
            if (!blog)
                return null;
            const newPost = {
                _id: new mongodb_1.ObjectId(),
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            yield getCollection().insertOne(newPost);
            return newPost;
        });
    },
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id))
                return false;
            const result = yield getCollection().updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: data.blogId
                }
            });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id))
                return false;
            const result = yield getCollection().deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    }
};
