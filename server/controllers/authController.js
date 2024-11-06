import catchAsyncError from "./../middlewares/catchAsyncError.js";
import jwt from "jsonwebtoken";

// Generate JWT and redirect to the specified URL
export const handleCallBack = catchAsyncError(async (req, res) => {
  const { id, displayName } = req.user;

  // Create JWT token
  const token = jwt.sign({ id, displayName }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  // Redirect to the client-side with the token and user data
  const redirectUrl = new URL(process.env.REDIRECT_URL);
  redirectUrl.searchParams.append("token", token);
  redirectUrl.searchParams.append("user", JSON.stringify(req.user));

  // Send the response
  res.redirect(redirectUrl.toString());
});

// Handle user logout and session destruction
export const handleLogout = catchAsyncError((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Forward error to the global error handler
    }

    // Successful logout
    res.status(200).json({ message: "Logout successful" });
  });
});
