import { Router } from "express";
import authenticate from "../middleware/authenticate";

const indexRouter = Router();

indexRouter.get("/", authenticate, (req, res) => {
  res.render("index", {
    title: "Event Tickets",
  });
});

export default indexRouter;
// This router handles the root path and renders the index page with a title.
