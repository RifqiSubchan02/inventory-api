"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination = (req) => {
    const { page, pageSize } = req.query;
    let skip; // page
    let take; // pageSize
    if (!page || !pageSize)
        return {
            skip,
            take,
        };
    return {
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
    };
};
exports.default = pagination;
