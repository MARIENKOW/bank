import { Router } from "express";
import autUserMiddelware from "../middlewares/authUser-middleware.js";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import insuranceController from "../controllers/insurance-controller.js";

const InsuranceRouter = new Router();

InsuranceRouter.post("/", authAdminMiddelware, insuranceController.create);
InsuranceRouter.put("/", authAdminMiddelware, insuranceController.update);
InsuranceRouter.get("/:id", authUserAdminMiddleware, insuranceController.find);
InsuranceRouter.delete("/:id", authAdminMiddelware, insuranceController.delete);

export default InsuranceRouter;
