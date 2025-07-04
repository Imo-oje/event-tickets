import asyncHandler from "../utils/asyc-handler";
import User, { UserDocument } from "../model/user-model";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { CookieOptions } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "../utils/date";

export const getLoginPage = asyncHandler(async (_, res) => {
  return res.status(200).render("login", {
    title: "Login page",
  });
});

export const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render("login", {
      title: "Login page",
      error: "All fields are required",
    });
  }

  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).render("login", {
      title: "Login page",
      error: "Invalid email or password",
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).render("login", {
      title: "Login page",
      error: "Invalid email or password",
    });
  }

  const tokenPayload = {
    userId: user.userId,
    email: user.email,
  };
  const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: "15m",
    audience: ["user"],
  });
  const refreshToken = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: "30d",
    audience: ["user"],
  });

  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: isProd ? "none" : "lax",
  };

  return res
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      expires: fifteenMinutesFromNow(),
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      expires: thirtyDaysFromNow(),
      path: "/auth/refresh",
    })
    .status(200)
    .redirect("/");
});

export const getRegisterPage = asyncHandler(async (req, res) => {
  return res.status(200).render("register", {
    title: "Register page",
    error: null,
  });
});

export const registerHandler = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).render("register", {
      title: "Register page",
      error: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).render("register", {
      title: "Register page",
      error: "User with this email already exists",
    });
  }

  const newUser = await User.create({ email, username, password }); // hashed password
  if (!newUser) {
    return res.status(500).render("register", {
      title: "Register page",
      error: "Failed to create user",
    });
  }

  return res.status(201).redirect("/auth/login");
});

export const logoutHandler = asyncHandler(async (req, res) => {
  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: "/auth/refresh" })
    .status(200)
    .redirect("/");
});
