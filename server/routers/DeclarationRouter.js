import { Router } from "express";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import declarationController from "../controllers/declaration-controller.js";

const DeclarationRouter = new Router();

DeclarationRouter.post("/", authAdminMiddelware, declarationController.create);
DeclarationRouter.get(
    "/:id",
    authUserAdminMiddleware,
    declarationController.find,
);
DeclarationRouter.delete(
    "/:id",
    authAdminMiddelware,
    declarationController.delete,
);

export default DeclarationRouter;
