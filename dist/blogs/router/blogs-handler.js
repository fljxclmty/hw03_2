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
exports.blogsHandler = void 0;
const blog_repostitories_1 = require("../repositories/blog-repostitories");
const statuses_1 = require("../../core/statuses");
const blogMapper = (blog) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
};
exports.blogsHandler = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blog_repostitories_1.blogsRepository.getAllBlogs();
            res.status(statuses_1.HttpStatus.OK).send(blogs.map(blogMapper));
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_repostitories_1.blogsRepository.getBlogById(req.params.id);
            if (!blog) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            res.status(statuses_1.HttpStatus.OK).send(blogMapper(blog));
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = yield blog_repostitories_1.blogsRepository.createBlog(req.body);
            res.status(statuses_1.HttpStatus.Created).send(blogMapper(newBlog));
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBlog = yield blog_repostitories_1.blogsRepository.updateBlog(req.params.id, req.body);
            if (!updatedBlog) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
            }
            else {
                res.sendStatus(statuses_1.HttpStatus.NoContent);
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield blog_repostitories_1.blogsRepository.deleteBlog(req.params.id);
            if (!deletedBlog) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
            }
            else {
                res.sendStatus(statuses_1.HttpStatus.NoContent);
            }
        });
    }
};
