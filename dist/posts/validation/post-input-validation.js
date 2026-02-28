"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputValidation = void 0;
const express_validator_1 = require("express-validator");
const titleValidation = (0, express_validator_1.body)('title')
    .isString()
    .withMessage('Title should be a string')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Invalid length');
const shortDescValidation = (0, express_validator_1.body)('shortDescription')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Invalid length');
const contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .withMessage('Content must be a string')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Invalid length');
const blogIdValidation = (0, express_validator_1.body)('blogId')
    .exists()
    .withMessage('Please enter blog id')
    .isString()
    .withMessage('Blog id must be a string');
exports.postInputValidation = [
    titleValidation, shortDescValidation, contentValidation, blogIdValidation
];
