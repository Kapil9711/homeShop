import express from "express";
import passport from "passport";
import { handleCallBack, handleLogout } from "../controllers/authController.js";

const router = express.Router();

// Google authentication route
router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.route("/google/callback").get(
  passport.authenticate("google", { failureRedirect: "/" }), // on failure, redirect to home
  handleCallBack // Handle the successful authentication callback
);

// Logout route
router.route("/logout").get(handleLogout);

export default router;
