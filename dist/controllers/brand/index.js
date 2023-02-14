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
function getAllBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { take, skip } = (0, helpers_1.pagination)(req);
            const brand = yield prisma.brand.findMany({
                take: take,
                skip: skip,
            });
            const totalCount = yield prisma.brand.count();
            successResponse({
                res,
                message: 'Get all brand',
                data: brand,
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
function createBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            yield prisma.brand.create({ data: { name } });
            successResponse({ res, message: 'Create brand success', status: 200 });
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
function updateBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const { id } = req.params;
            yield prisma.brand.update({ where: { id: Number(id) }, data: { name } });
            successResponse({ res, message: 'Update brand success', status: 200 });
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
function deleteBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield prisma.brand.delete({ where: { id: Number(id) } });
            successResponse({ res, message: 'Delete brand success', status: 200 });
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
exports.default = { getAllBrand, createBrand, updateBrand, deleteBrand };
