import User from "../models/user.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const Authenticate = catchAsyncError(async (req, res, next) => {
  let token;
  token = req?.cookies?.token;
  if (!token) {
    res.status(401);
    throw new Error("Authentication failed, Token is required");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.userId);
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Authentication failed token failed");
  }
});