import {Router} from "express";
import {postsHandler} from "./posts-handler";
import {idValidation} from "../../core/id-validation";
import {inputValidationResultMiddleware} from "../../core/validation-result";
import {superAdminGuardMiddleware} from "../../core/super-admin-guard";
import {postInputValidation} from "../validation/post-input-validation";


export const postsRouter = Router();


postsRouter.get('/', postsHandler.getAll);

postsRouter.get('/:id', idValidation, inputValidationResultMiddleware, postsHandler.getById);

postsRouter.post('/', superAdminGuardMiddleware, postInputValidation, inputValidationResultMiddleware, postsHandler.create);

postsRouter.put('/:id', superAdminGuardMiddleware, idValidation, postInputValidation, inputValidationResultMiddleware, postsHandler.update);

postsRouter.delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, postsHandler.delete)


