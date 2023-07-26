"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { testApi } = require("./../controller/root.controller");
const router = (0, express_1.Router)();
router.get("/", testApi);
exports.default = router;
//# sourceMappingURL=root.route.js.map