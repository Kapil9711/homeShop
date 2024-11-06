import catchAsyncError from "../middlewares/catchAsyncError.js";
import Cart from "../models/Cart.js";
import CustomError from "../utils/customError.js";

// Add product to cart
export const addToCart = catchAsyncError(async (req, res, next) => {
  const { productId, qty } = req.body;
  const userId = req.user._id;

  // Update the cart with the given productId and qty, or create a new entry if not found
  const updatedCart = await Cart.findOneAndUpdate(
    { productId, userId },
    { $set: { qty } },
    { new: true, upsert: true } // `upsert: true` will create a new document if not found
  );

  if (!updatedCart) {
    // Handle the error if cart is not updated or created
    return next(new CustomError("Failed to add product to cart", 500));
  }

  // Send success response with updated cart info
  res.status(201).json({
    message: "Product added to cart successfully",
    cart: updatedCart, // Optionally send back the updated cart info
  });
});

// Delete product from cart
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const { productId } = req.body;
  const deleteResult = await Cart.deleteOne({ productId });

  if (deleteResult.deletedCount === 0) {
    // Handle case when no product is deleted (i.e., cart not found or product doesn't exist)
    return next(new CustomError("Product not found in cart", 404));
  }
  // Send success response
  res.status(200).json({
    message: "Product removed from cart successfully",
  });
});
