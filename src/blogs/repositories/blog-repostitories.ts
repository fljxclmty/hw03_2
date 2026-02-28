import {ObjectId} from "mongodb";
import {blogCollection} from "../../db/mongo-db";
import {BlogDbModel, BlogInputModel} from "../models/blog-models";



export const blogsRepository = {
    async getAllBlogs(): Promise<BlogDbModel[]> {
        const blogs = await blogCollection.find().toArray()
        return blogs as BlogDbModel[];
    },

    async getBlogById (id: string): Promise<BlogDbModel> {
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        return blog as BlogDbModel
    },

    async createBlog (data: BlogInputModel): Promise<BlogDbModel>  {

        const newBlog: BlogDbModel = {
            _id: new ObjectId(),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        await blogCollection.insertOne(newBlog);
        return newBlog;
    },


    async updateBlog (id: string, data: BlogInputModel) {

        const result = await blogCollection.updateOne({_id: new ObjectId(id)}, {$set: {name: data.name, description: data.description, websiteUrl: data.websiteUrl}})
        return result.matchedCount===1;
    },


    async deleteBlog (id:string) {

        const result = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1;
    }

}

