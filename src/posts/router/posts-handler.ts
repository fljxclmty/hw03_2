import {postsRepository} from "../repositories/post-repositories";
import {PostDbModel, PostViewModel} from "../models/post-models";
import {HttpStatus} from "../../core/statuses";
import express, {Express, Request, Response} from "express";


const postMapper = (post: PostDbModel): PostViewModel => {

    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}


export const postsHandler = {

    async getAll(req: Request, res: Response) {

        const posts = await postsRepository.getAllPosts()
        res.status(HttpStatus.OK).send(posts.map(postMapper))
    },


    async getById(req: Request, res: Response) {

        const post = await postsRepository.getPostById(req.params.id)

        if (!post) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        res.status(HttpStatus.OK).send(postMapper(post))
    },


    async create(req: Request, res: Response) {

        const newPost = await postsRepository.createPost(req.body)
        res.status(HttpStatus.Created).send(newPost)
    },


    async update(req: Request, res: Response) {

        const updatedPost = await postsRepository.updatePost(req.params.id, req.body)

        if (!updatedPost) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        res.sendStatus(HttpStatus.NoContent)


    },


    async delete(req: Request, res: Response) {


        const isDeleted = await postsRepository.deletePost(req.params.id)

        if (!isDeleted) {
            res.sendStatus(HttpStatus.NotFound)
        }


        res.status(HttpStatus.NoContent)


    }


}