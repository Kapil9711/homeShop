import catchAsyncError from "./../middlewares/catchAsyncError.js";
import jwt from "jsonwebtoken";
// callback handling
export const handleCallBack = catchAsyncError(async (req, res) => {
  const token = jwt.sign(
    { id: req.user.id, displayName: req.user.displayName },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  // Send token back to the client
  res.redirect(
    `http://localhost:3000?token=${token}&user=${encodeURIComponent(
      JSON.stringify(req.user)
    )}`
  );
});

export const handleLogout = catchAsyncError(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Redirect to Google logout
    const googleLogoutUrl = "https://accounts.google.com/Logout";
    res.redirect(googleLogoutUrl); // Redirecting to Google logout page
  });
});
