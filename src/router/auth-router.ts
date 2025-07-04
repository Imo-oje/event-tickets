import { Router } from "express";
import {
  loginHandler,
  getLoginPage,
  getRegisterPage,
  registerHandler,
  logoutHandler,
} from "../controller/auth-controller";

const authRouter = Router();

authRouter.get("/login", getLoginPage);
authRouter.post("/login", loginHandler);

authRouter.get("/register", getRegisterPage);
authRouter.post("/register", registerHandler);

authRouter.get("/logout", logoutHandler);
export default authRouter;
