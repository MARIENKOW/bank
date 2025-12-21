import { Router } from "express";
import { accessController } from "../controllers/access-controller.js";
import authAdminMiddleware from "../middlewares/authAdmin-middleware.js";



const AccessRouter = new Router();

AccessRouter.post("/checkToken", accessController.checkToken);
AccessRouter.get("/allTokens", accessController.allTokens);
AccessRouter.post("/newToken", authAdminMiddleware, accessController.newToken);
AccessRouter.delete(
    "/deleteToken/:id",
    authAdminMiddleware,
    accessController.deleteToken
);

export default AccessRouter;
