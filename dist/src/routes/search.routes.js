"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const search_controller_1 = require("./../controller/search.controller");
router.post("/search", search_controller_1.searchEmoji);
exports.default = router;
//# sourceMappingURL=search.routes.js.map