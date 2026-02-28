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
exports.postsHandler = void 0;
const post_repositories_1 = require("../repositories/post-repositories");
const statuses_1 = require("../../core/statuses");
const postMapper = (post) => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    };
};
exports.postsHandler = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_repositories_1.postsRepository.getAllPosts();
            res.status(statuses_1.HttpStatus.OK).send(posts.map(postMapper));
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_repositories_1.postsRepository.getPostById(req.params.id);
            if (!post) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            res.status(statuses_1.HttpStatus.OK).send(postMapper(post));
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield post_repositories_1.postsRepository.createPost(req.body);
            // 1. Сначала проверяем на null
            if (!newPost) {
                // Если пост не создался (например, указан неверный blogId), возвращаем 404
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            // 2. Теперь TypeScript знает, что newPost — это точно PostDbModel (не null)
            // и позволит прогнать его через маппер
            res.status(statuses_1.HttpStatus.Created).send(postMapper(newPost));
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = yield post_repositories_1.postsRepository.updatePost(req.params.id, req.body);
            if (!updatedPost) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            res.sendStatus(statuses_1.HttpStatus.NoContent);
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield post_repositories_1.postsRepository.deletePost(req.params.id);
            if (!isDeleted) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            res.status(statuses_1.HttpStatus.NoContent);
        });
    }
};
