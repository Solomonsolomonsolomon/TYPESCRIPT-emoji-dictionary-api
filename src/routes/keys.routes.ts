import { Router } from "express";
const router: Router = Router();
import {
  addApiKey,
  generateApiKey,
  getHostName,
  verifyKey,
} from "../controller/key.controller.ts";
import { apiKeyRequestLimit } from "./../middleware/ratelimit.middleware.ts";
router.get("/getapikey", apiKeyRequestLimit(), addApiKey);
export default router;
