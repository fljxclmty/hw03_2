import {ObjectId} from "mongodb";



export type PostInputModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}





export type PostViewModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,

}




export type PostDbModel = {
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}