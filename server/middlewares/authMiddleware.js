import User from "../models/user.js";
import catchAsyncError from "./catchAsyncError.js";
import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const Authenticate = catchAsyncError(async (req, res, next) => {
  let token;
  token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(
      new CustomError("Authentication failed, Token is required", 401)
    );
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    return next(new CustomError("Authentication failed token failed", 401));
  }
});
