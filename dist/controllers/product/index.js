"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const helpers_1 = require("@/helpers");
const prisma = new client_1.PrismaClient();
const { successResponse, errorResponse } = helpers_1.myResponse;
function getAllProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { take, skip } = (0, helpers_1.pagination)(req);
            const products = yield prisma.product.findMany({
                take: take,
                skip: skip,
                include: {
                    brand: true,
                },
            });
            const totalCount = yield prisma.product.count();
            successResponse({
                res,
                message: 'Get all product',
                data: products,
                status: 200,
                totalCount,
                page: skip,
                pageSize: take,
            });
        }
        catch (error) {
            errorResponse({
                res,
                message: 'Something went wrong',
                status: 500,
                error: error,
            });
        }
    });
}
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, brandId } = req.body;
            yield prisma.product.create({ data: { name, brandId } });
            successResponse({ res, message: 'Create product success', status: 200 });
        }
        catch (error) {
            console.log(error);
            errorResponse({
                res,
                message: 'Something went wrong',
                status: 500,
                error: error,
            });
        }
    });
}
function getDetailProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const product = yield prisma.product.findUnique({
                where: {
                    id,
                },
                include: {
                    attribute: {
                        where: {
                            productId: id,
                        },
                        include: {
                            attributeValue: true,
                        },
                    },
                    brand: true,
                },
            });
            successResponse({
                res,
                message: 'Get detail product',
                status: 200,
                data: product,
            });
        }
        catch (error) {
            errorResponse({
                res,
                message: 'Something went wrong',
                status: 500,
                error: error,
            });
        }
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield prisma.product.delete({ where: { id } });
            successResponse({ res, message: 'Delete product success', status: 200 });
        }
        catch (error) {
            errorResponse({
                res,
                message: 'Something went wrong',
                status: 500,
                error: error,
            });
        }
    });
}
function createAttribute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, attributeValue } = req.body;
            yield prisma.attribute.create({
                data: {
                    name: name,
                    productId: id,
                    attributeValue: {
                        createMany: {
                            data: attributeValue,
                        },
                    },
                },
            });
            successResponse({ res, message: 'Create attribute success', status: 200 });
        }
        catch (error) {
            errorResponse({
                res,
                message: 'Something went wrong',
                status: 500,
                error: error,
            });
        }
    });
}
exports.default = {
    getAllProduct,
    getDetailProduct,
    createProduct,
    deleteProduct,
    createAttribute,
};
