"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const statuses_1 = require("./core/statuses");
const paths_1 = require("./core/paths");
const blogs_router_1 = require("./blogs/router/blogs-router");
const posts_router_1 = require("./posts/router/posts-router");
const testing_router_1 = require("./testing/testing router");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.status(statuses_1.HttpStatus.OK).send('Hello World!!!');
    });
    app.use(paths_1.BLOG_PATHS, blogs_router_1.blogsRouter);
    app.use(paths_1.POST_PATHS, posts_router_1.postsRouter);
    app.use(paths_1.TESTING_PATHS, testing_router_1.testingRouter);
    return app;
};
exports.setupApp = setupApp;
