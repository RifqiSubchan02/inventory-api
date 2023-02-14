"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const successResponse = ({ req, res, message, data, status, totalCount, page, pageSize, }) => {
    res.status(status).send({
        status,
        message,
        data: data === null ? {} : data,
        totalCount,
        page: page !== undefined && pageSize !== undefined
            ? page / pageSize + 1
            : undefined,
        pageSize,
    });
};
const errorResponse = ({ req, res, message, status, error }) => {
    res.status(status).send({
        status,
        message,
        error,
    });
};
exports.default = { successResponse, errorResponse };
