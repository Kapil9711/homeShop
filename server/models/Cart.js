import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Product model
  },
  qty: Number,
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
