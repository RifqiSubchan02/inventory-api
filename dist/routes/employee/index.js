"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("@/controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.employee.getAll);
router.get('/:id', controllers_1.employee.getDetail);
router.post('/', controllers_1.employee.create);
exports.default = router;
