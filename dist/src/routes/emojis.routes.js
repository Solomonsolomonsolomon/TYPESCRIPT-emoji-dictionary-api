"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emoji_controller_1 = require("./../controller/emoji.controller");
const router = (0, express_1.Router)();
router.get("/", emoji_controller_1.allEmojis);
router.get("/:_id", emoji_controller_1.singleEmoji);
exports.default = router;
//# sourceMappingURL=emojis.routes.js.map