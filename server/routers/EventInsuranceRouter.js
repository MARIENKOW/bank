import { Router } from "express";
import autUserMiddelware from "../middlewares/authUser-middleware.js";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import eventController from "../controllers/eventInsurance-controller.js";

const EventInsuranceRouter = new Router();

EventInsuranceRouter.post("/", authAdminMiddelware, eventController.create);
EventInsuranceRouter.get("/:id", authUserAdminMiddleware, eventController.find);
EventInsuranceRouter.delete(
    "/all/:id",
    authUserAdminMiddleware,
    eventController.deleteAll
);
EventInsuranceRouter.delete(
    "/:id",
    authUserAdminMiddleware,
    eventController.delete
);

export default EventInsuranceRouter;
