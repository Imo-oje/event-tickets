import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import User from "../model/user-model";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.accessToken;

  if (!token || token === null || token === undefined) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "object" && decoded !== null && "email" in decoded) {
      const user = await User.findOne({ email: (decoded as any).email });
      if (user) {
        res.locals.user = user;
        next();
      } else {
        return res.redirect("/auth/login");
      }
    } else {
      return res.redirect("/auth/login");
    }
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.redirect("/auth/login");
  }
};

export default authenticate;
