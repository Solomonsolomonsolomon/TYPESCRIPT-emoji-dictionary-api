import { Router } from "express";

import { allEmojis,singleEmoji } from "./../controller/emoji.controller";

const router: Router = Router();
console.log(allEmojis)
router.get("/", allEmojis);
router.get('/:emojiName',singleEmoji)
export default router;
