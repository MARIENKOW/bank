import { Router } from "express";
import controller from "../controllers/user-controller.js";
import autUserMiddelware from "../middlewares/authUser-middleware.js";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";

const UserRouter = new Router();

UserRouter.post("/signIn", controller.signIn);

UserRouter.post("/signUp", controller.signUp);

UserRouter.post("/logOut", controller.logOut);

UserRouter.get("/refresh", controller.refresh);

UserRouter.get("/aboutUser", autUserMiddelware, controller.aboutUser);

UserRouter.get("/getAll", authAdminMiddelware, controller.getAll);

UserRouter.get("/:id", authAdminMiddelware, controller.getById);

// UserRouter.post("/cash-out", authAdminMiddelware, controller.cashOut);

UserRouter.post("/updateName", authAdminMiddelware, controller.updateName);
UserRouter.post("/updateElc", authAdminMiddelware, controller.updateElc);
UserRouter.post(
    "/updateBankNumber",
    authAdminMiddelware,
    controller.updateBankNumber
);

UserRouter.post(
    "/updateUsername",
    authAdminMiddelware,
    controller.updateUsername
);
UserRouter.post(
    "/updatePassword",
    authAdminMiddelware,
    controller.updatePassword
);
UserRouter.post(
    "/bankerUpdate",
    authAdminMiddelware,
    controller.bankerUpdate
);

export default UserRouter;
