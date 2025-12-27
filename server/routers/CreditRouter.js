import { Router } from "express";
import autUserMiddelware from "../middlewares/authUser-middleware.js";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import creditController from "../controllers/credit-controller.js";

const CreditRouter = new Router();

CreditRouter.post("/", authAdminMiddelware, creditController.create);
CreditRouter.get("/:id", authUserAdminMiddleware, creditController.find);
// CreditRouter.delete(
//     "/all/:id",
//     authUserAdminMiddleware,
//     creditController.deleteAll
// );
CreditRouter.delete("/:id", authAdminMiddelware, creditController.delete);
CreditRouter.post(
    "/setActive",
    authAdminMiddelware,
    creditController.setActive
);
CreditRouter.post(
    "/setCancel",
    authAdminMiddelware,
    creditController.setCancel
);

export default CreditRouter;
