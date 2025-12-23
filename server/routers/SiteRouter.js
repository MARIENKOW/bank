import { Router } from "express";
import siteController from "../controllers/site-controller.js";
import authAdminMiddleware from "../middlewares/authAdmin-middleware.js";

const SiteRouter = new Router();

SiteRouter.post("/sendTelegram", siteController.sendTelegram);
SiteRouter.get("/whatsUp", siteController.getWhatsUp);
SiteRouter.post("/whatsUp", authAdminMiddleware, siteController.setWhatsUp);
SiteRouter.get("/banker", siteController.getBanker);
SiteRouter.post("/banker", authAdminMiddleware, siteController.setBanker);

export default SiteRouter;
