"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = void 0;
const statuses_1 = require("./statuses");
const express_validator_1 = require("express-validator");
const inputValidationResultMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        const errorsArray = result.array({ onlyFirstError: true });
        const errorResponse = {
            errorsMessages: errorsArray.map((e) => ({
                message: e.msg,
                field: e.path
            }))
        };
        return res.status(statuses_1.HttpStatus.BadRequest).send(errorResponse);
    }
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;
