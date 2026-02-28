"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputValidation = void 0;
const express_validator_1 = require("express-validator");
const nameValidation = (0, express_validator_1.body)('name')
    .isString()
    .withMessage('Name should be a string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Name length incorrect');
const descriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .withMessage('Description should be a string')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description length incorrect');
const urlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .withMessage('URL should be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('URL length incorrect')
    .isURL()
    .withMessage('You must enter a valid URL');
exports.blogInputValidation = [
    nameValidation,
    descriptionValidation,
    urlValidation
];
