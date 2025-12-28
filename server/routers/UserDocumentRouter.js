import { Router } from "express";
import autUserMiddelware from "../middlewares/authUser-middleware.js";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import userDocumentController from "../controllers/userDocument-controller.js";

const UserDocumentRouter = new Router();

UserDocumentRouter.post(
    "/",
    authAdminMiddelware,
    userDocumentController.create
);
UserDocumentRouter.get(
    "/:id",
    authUserAdminMiddleware,
    userDocumentController.find
);
UserDocumentRouter.post(
    "/setSign",
    autUserMiddelware,
    userDocumentController.setSign
);
UserDocumentRouter.delete(
    "/:id",
    authAdminMiddelware,
    userDocumentController.delete
);
export default UserDocumentRouter;
