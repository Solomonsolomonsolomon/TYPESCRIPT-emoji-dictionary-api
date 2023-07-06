




import { Router } from "express";
const router = Router();
import { searchEmoji } from "./../controller/search.controller";
router.post("/search", searchEmoji);

export default router;
