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

    async getAll(req: any, res: any) {

        const posts = await postsRepository.getAllPosts()
        res.status(HttpStatus.OK).send(posts.map(postMapper))
    },


    async getById(req: any, res: any) {

        const post = await postsRepository.getPostById(req.params.id)

        if (!post) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        res.status(HttpStatus.OK).send(postMapper(post))
    },


    async create(req: any, res: any) {
        const newPost: PostDbModel | null = await postsRepository.createPost(req.body);

        // 1. Сначала проверяем на null
        if (!newPost) {
            // Если пост не создался (например, указан неверный blogId), возвращаем 404
            res.sendStatus(HttpStatus.NotFound);
            return;
        }

        // 2. Теперь TypeScript знает, что newPost — это точно PostDbModel (не null)
        // и позволит прогнать его через маппер
        res.status(HttpStatus.Created).send(postMapper(newPost));
    },

    async update(req: any, res: any) {

        const updatedPost = await postsRepository.updatePost(req.params.id, req.body)

        if (!updatedPost) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        res.sendStatus(HttpStatus.NoContent)


    },


    async delete(req: any, res: any) {


        const isDeleted = await postsRepository.deletePost(req.params.id)

        if (!isDeleted) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }


        res.status(HttpStatus.NoContent)


    }


}