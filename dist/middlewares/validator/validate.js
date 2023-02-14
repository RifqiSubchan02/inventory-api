"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const helpers_1 = require("@/helpers");
const { errorResponse } = helpers_1.myResponse;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return errorResponse({
            res,
            message: 'Invalid value',
            status: 400,
            error: errors.array(),
        });
    }
    next();
};
exports.default = validate;
