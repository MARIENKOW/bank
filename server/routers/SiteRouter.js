import { Router } from "express";
import siteController from "../controllers/site-controller.js";


const SiteRouter = new Router();

SiteRouter.post("/sendTelegram", siteController.sendTelegram);

export default SiteRouter;
