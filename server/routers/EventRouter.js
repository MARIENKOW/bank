import { Router } from "express";
import autUserMiddelware from "../middlewares/authUser-middleware.js";
import authAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import authUserAdminMiddleware from "../middlewares/authUser-Admin-middleware.js";
import eventController from "../controllers/event-controller.js";

const EventRouter = new Router();

EventRouter.post("/", authAdminMiddelware, eventController.create);
EventRouter.get("/:id", authUserAdminMiddleware, eventController.find);
EventRouter.delete(
    "/all/:id",
    authUserAdminMiddleware,
    eventController.deleteAll
);
EventRouter.delete("/:id", authUserAdminMiddleware, eventController.delete);

export default EventRouter;
