import { Router } from "express";
import auth from "./auth.routes.js";
import urls from "./urls.routes.js";

const router = Router();

router.use(auth);
router.use(urls);

export default router;
