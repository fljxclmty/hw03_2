import express, {Express, Request, Response} from "express";
import {BlogDbModel, BlogViewModel} from "../models/blog-models";
import {blogsRepository} from "../repositories/blog-repostitories";
import {HttpStatus} from "../../core/statuses";


const blogMapper = (blog: BlogDbModel): BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
};


export const blogsHandler = {

    async getAll(req: any, res: any) {

        const blogs = await blogsRepository.getAllBlogs();
        res.status(HttpStatus.OK).send(blogs.map(blogMapper))
    },


    async getById(req: any, res: any) {

        const blog = await blogsRepository.getBlogById(req.params.id)
        if (!blog) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        res.status(HttpStatus.OK).send(blogMapper(blog))

    },


    async create(req: any, res: any) {

        const newBlog = await blogsRepository.createBlog(req.body)
        res.status(HttpStatus.Created).send(blogMapper(newBlog))
    },


    async update(req: any, res: any) {

        const updatedBlog = await blogsRepository.updateBlog(req.params.id, req.body)
        if (!updatedBlog) {
            res.sendStatus(HttpStatus.NotFound)
        } else {
            res.sendStatus(HttpStatus.NoContent)
        }
    },


    async delete(req: any, res: any) {

        const deletedBlog = await blogsRepository.deleteBlog(req.params.id)
        if (!deletedBlog) {
            res.sendStatus(HttpStatus.NotFound)
        } else {
            res.sendStatus(HttpStatus.NoContent)
        }

    }

}