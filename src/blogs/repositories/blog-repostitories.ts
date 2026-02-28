import { ObjectId } from "mongodb";
import { client } from "../../db/mongo-db"; // Импортируем клиент, а не коллекцию
import { BlogDbModel, BlogInputModel } from "../models/blog-models";

// Вспомогательная функция для получения коллекции прямо в момент вызова
const getCollection = () => client.db().collection<BlogDbModel>('blogs');

export const blogsRepository = {
    async getAllBlogs(): Promise<BlogDbModel[]> {
        // Вызываем getCollection() внутри метода
        const blogs = await getCollection().find().toArray();
        return blogs as BlogDbModel[];
    },

    async getBlogById(id: string): Promise<BlogDbModel | null> {
        if (!ObjectId.isValid(id)) return null; // Хорошая практика: проверка валидности ID
        const blog = await getCollection().findOne({ _id: new ObjectId(id) });
        return blog as BlogDbModel;
    },

    async createBlog(data: BlogInputModel): Promise<BlogDbModel> {
        const newBlog: BlogDbModel = {
            _id: new ObjectId(),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        };

        await getCollection().insertOne(newBlog);
        return newBlog;
    },

    async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
        if (!ObjectId.isValid(id)) return false;
        const result = await getCollection().updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: data.name, description: data.description, websiteUrl: data.websiteUrl } }
        );
        return result.matchedCount === 1;
    },

    async deleteBlog(id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) return false;
        const result = await getCollection().deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount === 1;
    }
};