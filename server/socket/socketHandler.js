import User from "../models/user.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("wishlist-add", async ({ userId, productId }) => {
      try {
        const user = await User.findById(userId);
        if (!user.wishlist.includes(productId)) {
          user.wishlist.push(productId);
          await user.save();

          // Emit updated wishlist to all connected clients
          io.emit("wishlist-update", user.wishlist);
        }
      } catch (err) {
        console.error("Error adding to wishlist:", err);
      }
    });

    socket.on("wishlist-remove", async ({ userId, productId }) => {
      try {
        const user = await User.findById(userId);
        user.wishlist = user.wishlist.filter(
          (id) => id.toString() !== productId
        );
        await user.save();

        // Emit updated wishlist to all connected clients
        io.emit("wishlist-update", user.wishlist);
      } catch (err) {
        console.error("Error removing from wishlist:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socketHandler;
