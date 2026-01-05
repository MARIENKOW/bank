import { Router } from "express";
import autUserMiddelware from "../middlewares/authUser-middleware.js";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import bankController from "../controllers/bank-controller.js";

const BankRouter = new Router();

BankRouter.post("/", authAdminMiddelware, bankController.create);
BankRouter.get("/:id", authUserAdminMiddleware, bankController.find);

BankRouter.delete("/:id", authAdminMiddelware, bankController.delete);
BankRouter.post("/setActive", authAdminMiddelware, bankController.setActive);
BankRouter.post("/setCancel", authAdminMiddelware, bankController.setCancel);

export default BankRouter;
