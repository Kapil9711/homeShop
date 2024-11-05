import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js";
import CustomError from "../utils/customError.js";

// getAllProducts = /api/products ->get
export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

//getSingleProduct = /api/products/:id
export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  console.log(req.params);
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }
  res.status(200).json(product);
});
