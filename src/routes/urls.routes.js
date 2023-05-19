import { Router } from "express";
import {
  postUrl,
  getUrlById,
  getOpenUrl,
  deleteUrlById,
} from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, schemaValidation(urlSchema), postUrl);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", getOpenUrl);
urlsRouter.delete("/urls/open/:shortUrl", authValidation, deleteUrlById);


export default urlsRouter;
