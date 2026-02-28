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
const mongo_db_1 = require("../../db/mongo-db");
const mongodb_1 = require("mongodb");
const blog_repostitories_1 = require("../../blogs/repositories/blog-repostitories");
exports.postsRepository = {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield mongo_db_1.postCollection.find().toArray();
            return posts;
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongo_db_1.postCollection.findOne({ _id: new Object(id) });
            return post;
        });
    },
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_repostitories_1.blogsRepository.getBlogById(data.blogId);
            const newPost = {
                _id: new mongodb_1.ObjectId(),
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            yield mongo_db_1.postCollection.insertOne(newPost);
            return newPost;
        });
    },
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = yield mongo_db_1.postCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { title: data.title, shortDescription: data.shortDescription, content: data.content, blogId: data.blogId } });
            return updatedPost.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    }
};
