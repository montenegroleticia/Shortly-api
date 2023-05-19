import { Router } from "express";
import { getUser, getRanking } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const usersRouter = Router();

usersRouter.get("/users/me", authValidation, getUser);
usersRouter.get("/ranking", getRanking);

export default usersRouter;
