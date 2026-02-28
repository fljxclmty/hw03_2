import {Router} from "express";
import {blogsHandler} from "./blogs-handler";
import {idValidation} from "../../core/id-validation";
import {inputValidationResultMiddleware} from "../../core/validation-result";
import {superAdminGuardMiddleware} from "../../core/super-admin-guard";
import {blogInputValidation} from "../validation/blog-input-validation";


export const blogsRouter = Router();


blogsRouter.get("/", blogsHandler.getAll);

blogsRouter.get("/:id", idValidation, inputValidationResultMiddleware, blogsHandler.getById);

blogsRouter.post("/", superAdminGuardMiddleware, blogInputValidation, inputValidationResultMiddleware, blogsHandler.create);

blogsRouter.put("/:id", superAdminGuardMiddleware, idValidation, blogInputValidation, inputValidationResultMiddleware, blogsHandler.update);

blogsRouter.delete("/:id", superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, blogsHandler.delete)