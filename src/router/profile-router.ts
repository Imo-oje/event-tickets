import { Router } from "express";
import { getProfile } from "../controller/profile-controller";

const profileRouter = Router();

profileRouter.get("/", getProfile);

export default profileRouter;
