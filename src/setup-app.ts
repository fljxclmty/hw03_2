import express, {Express, Request, Response} from "express";
import {HttpStatus} from "./core/statuses";
import {BLOG_PATHS, POST_PATHS, TESTING_PATHS} from "./core/paths";
import {blogsRouter} from "./blogs/router/blogs-router";
import {postsRouter} from "./posts/router/posts-router";
import {testingRouter} from "./testing/testing router";




export const setupApp = (app: Express)=> {
    app.use(express.json())

    app.get('/', (req: Request, res: Response)=> {
        res.status(HttpStatus.OK).send('Hello World!!!')
    })


    app.use(BLOG_PATHS, blogsRouter);
    app.use(POST_PATHS, postsRouter);
    app.use(TESTING_PATHS, testingRouter);


    return app;


}