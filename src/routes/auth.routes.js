import { Router } from "express";
import { signUp, signIn, logOut } from "../controllers/auth.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { signInSchema, singUpSchema } from "../schemas/auth.schemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(singUpSchema), signUp);
authRouter.post("/signin", schemaValidation(signInSchema), signIn);
authRouter.delete("/logout", authValidation, logOut);

export default authRouter;
