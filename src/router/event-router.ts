import { Router } from "express";
import {
  createEvent,
  getCreateEvent,
  getEvent,
  getAllEvents,
} from "../controller/event-controller";

const eventRouter = Router();
eventRouter.get("/", getCreateEvent);
eventRouter.post("/", createEvent);
eventRouter.get("/all", getAllEvents);
eventRouter.get("/:eventId", getEvent);

export default eventRouter;
