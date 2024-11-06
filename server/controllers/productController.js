import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js";
import CustomError from "../utils/customError.js";

// Handler to get all products
export const getAllProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// Handler to get a single product by ID
export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findById(id);
  console.log(product);
  // If product not found, return a 404 error with a custom message
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  res.status(200).json(product);
});
