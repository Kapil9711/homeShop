import express from "express";
import passport from "passport";
import { handleCallBack, handleLogout } from "../controllers/authController.js";
const router = express.Router();
router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    handleCallBack
  );
router.route("/logout").get(handleLogout);

export default router;
