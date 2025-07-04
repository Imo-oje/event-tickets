import { Router } from "express";
import {
  createEvent,
  getCreateEvent,
  getEvent,
} from "../controller/event-controller";

const eventRouter = Router();
eventRouter.get("/", getCreateEvent);
eventRouter.post("/", createEvent);
eventRouter.get("/:eventId", getEvent);

export default eventRouter;
