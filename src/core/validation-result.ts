import {Request, Response, NextFunction} from "express";
import {HttpStatus} from "./statuses";
import {validationResult} from "express-validator";



export interface FieldError {
    message: string | null;
    field: string | null;
}


export interface APIErrorResult {
    errorsMessages: FieldError[] | null;
}



export const inputValidationResultMiddleware = (req: any, res: any, next: any)=> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errorsArray = result.array({onlyFirstError: true});

        const errorResponse: APIErrorResult = {
            errorsMessages: errorsArray.map((e:any)=> ({
            message: e.msg,
            field: e.path
            }))
        };

        return res.status(HttpStatus.BadRequest).send(errorResponse)
    }

    next()
}