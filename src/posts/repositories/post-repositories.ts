import { ObjectId } from "mongodb";
import { client } from "../../db/mongo-db"; // Импортируем клиент
import { PostDbModel, PostInputModel } from "../models/post-models";
import { blogsRepository } from "../../blogs/repositories/blog-repostitories";

// Функция для безопасного получения коллекции
const getCollection = () => client.db().collection<PostDbModel>('posts');

export const postsRepository = {

    async getAllPosts(): Promise<PostDbModel[]> {
        const posts = await getCollection().find().toArray();
        return posts as PostDbModel[];
    },

    async getPostById(id: string): Promise<PostDbModel | null> {
        if (!ObjectId.isValid(id)) return null;
        // Исправил Object на ObjectId
        const post = await getCollection().findOne({ _id: new ObjectId(id) });
        return post as PostDbModel;
    },

    async createPost(data: PostInputModel): Promise<PostDbModel | null> {
        const blog = await blogsRepository.getBlogById(data.blogId);

        // Важно: если блог не найден, пост создавать нельзя
        if (!blog) return null;

        const newPost: PostDbModel = {
            _id: new ObjectId(),
            title: data.title,
            shortDescription: data.shortDescription,
            content: data.content,
            blogId: data.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        };

        await getCollection().insertOne(newPost);
        return newPost;
    },

    async updatePost(id: string, data: PostInputModel): Promise<boolean> {
        if (!ObjectId.isValid(id)) return false;

        const result = await getCollection().updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: data.blogId
                }
            }
        );
        return result.matchedCount === 1;
    },

    async deletePost(id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) return false;

        const result = await getCollection().deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount === 1;
    }
};