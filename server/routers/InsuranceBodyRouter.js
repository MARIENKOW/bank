import { Router } from "express";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import insuranceBodyController from "../controllers/insuranceBody-controller.js";


const InsuranceBodyRouter = new Router();

InsuranceBodyRouter.post(
    "/",
    authAdminMiddelware,
    insuranceBodyController.create
);
InsuranceBodyRouter.put(
    "/",
    authAdminMiddelware,
    insuranceBodyController.update
);
InsuranceBodyRouter.get(
    "/:id",
    authUserAdminMiddleware,
    insuranceBodyController.find
);
InsuranceBodyRouter.delete(
    "/:id",
    authAdminMiddelware,
    insuranceBodyController.delete
);

export default InsuranceBodyRouter;
