import catchAsyncError from "../middlewares/catchAsyncError.js";
import Cart from "../models/Cart.js";
import CustomError from "./../utils/customError.js";

// add product to cart
export const addToCart = catchAsyncError(async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user._id;
  console.log("inside", productId, qty);
  const cart = await Cart.findOneAndUpdate(
    { productId, userId },
    {
      $set: { qty },
    },
    { new: true, upsert: true }
  );
  console.log(cart);
  if (!cart) return next(new CustomError("Internal Server Error", 500));
  res.status(201).json({ message: "Added Successfully" });
});

// delete product from cart
export const deleteProduct = catchAsyncError(async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.deleteOne({ productId });
  console.log("deleted", cart);
  if (!cart) return next(new CustomError("Cart not found", 404));

  res.status(200).json({
    message: "Successfully removed",
  });
});
