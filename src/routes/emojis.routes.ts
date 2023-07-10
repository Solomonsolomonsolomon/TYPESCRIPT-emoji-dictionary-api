import { Router } from "express";

import { allEmojis, singleEmoji } from "./../controller/emoji.controller";

const router: Router = Router();

router.get("/", allEmojis);
router.get("/:_id", singleEmoji);
export default router;
