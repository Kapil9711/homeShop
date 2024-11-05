import express from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { Authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(Authenticate, getAllProducts);
router.route("/:id").get(Authenticate, getSingleProduct);

export default router;
