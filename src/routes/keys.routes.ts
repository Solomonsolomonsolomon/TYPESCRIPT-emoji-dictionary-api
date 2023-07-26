import { Router } from "express";
const router: Router = Router();
import {
  addApiKey,
  generateApiKey,
  getHostName,
  verifyKey,
} from "../controller/key.controller";
import { apiKeyRequestLimit } from "./../middleware/ratelimit.middleware";
router.get("/getapikey", apiKeyRequestLimit(), addApiKey);
export default router;
