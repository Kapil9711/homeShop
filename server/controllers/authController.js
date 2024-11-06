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
    `${process.env.REDIRECT_URL}?token=${token}&user=${encodeURIComponent(
      JSON.stringify(req.user)
    )}`
  );
});

// handling logout
export const handleLogout = catchAsyncError(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logout Successfull" });
  });
});
