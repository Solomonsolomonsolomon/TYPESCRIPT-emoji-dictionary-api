import { Router } from "express";
const { testApi } = require("./../controller/root.controller");
const router: Router = Router();
router.get("/", testApi);

export default router;
