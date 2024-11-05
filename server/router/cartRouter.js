import express from "express";
import { Authenticate } from "../middlewares/authMiddleware.js";
import { addToCart, deleteProduct } from "../controllers/cartController.js";
const router = express.Router();

router.route("/new").post(Authenticate, addToCart);
router.route("/").delete(Authenticate, deleteProduct);

export default router;
