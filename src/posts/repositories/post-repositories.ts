import {postCollection} from "../../db/mongo-db";
import {PostDbModel, PostInputModel} from "../models/post-models";
import {ObjectId} from "mongodb";
import {blogsRepository} from "../../blogs/repositories/blog-repostitories";


export const postsRepository = {

    async getAllPosts () {
        const posts = await postCollection.find().toArray()
        return posts as PostDbModel[]
    },


    async getPostById (id: string) {
        const post = await postCollection.findOne({_id: new Object(id)})
        return post as PostDbModel
    },


    async createPost (data: PostInputModel) {

        const blog = await blogsRepository.getBlogById(data.blogId)

        const newPost: PostDbModel = {
            _id: new ObjectId(),
            title: data.title,
            shortDescription: data.shortDescription,
            content: data.content,
            blogId: data.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }

        await postCollection.insertOne(newPost);
        return newPost

    },


    async updatePost (id: string, data: PostInputModel) {

        const updatedPost = await postCollection.updateOne({_id: new ObjectId(id)}, {$set: {title: data.title, shortDescription: data.shortDescription, content: data.content, blogId: data.blogId}})
        return updatedPost.matchedCount === 1
    },


    async deletePost (id: string) {

        const result = await postCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    }




}