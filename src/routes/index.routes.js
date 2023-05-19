import { Router } from "express";
import auth from "./auth.routes.js";
import urls from "./urls.routes.js";
import users from "./users.routes.js";

const router = Router();

router.use(auth);
router.use(urls);
router.use(users);

export default router;
