import express from "express";
import connectDb from "./config/db.js";
import passport from "passport";
import dotenv from "dotenv";
import helmet from "helmet";
import hpp from "hpp";
import mongoSatitize from "express-mongo-sanitize";
import session from "express-session";
import productRouter from "./router/productRouter.js";
import cors from "cors";
import globalErrorHandler from "./middlewares/errorMiddleware.js";
import authRouter from "./router/authRouter.js";
import cartRouter from "./router/cartRouter.js";
import { Server } from "socket.io";
import http from "http";
import "./config/passport.js";
import User from "./models/user.js";
const app = express();
dotenv.config();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
    methods: ["GET", "POST"],
  },
});

// setup security headers
app.use(helmet());
// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize data for noSql atack
app.use(mongoSatitize());
// prevent parameter pollution
app.use(hpp());

// Middleware for session management
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with your session secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// endpoints
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

// Socket.IO event listeners for adding/removing from wishlist
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for adding a product to the wishlist
  socket.on("wishlist-add", async ({ userId, productId }) => {
    console.log('onserver',userId,productId);
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

  // Listen for removing a product from the wishlist
  socket.on("wishlist-remove", async ({ userId, productId }) => {
    try {
      const user = await User.findById(userId);
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();

      // Emit updated wishlist to all connected clients
      io.emit("wishlist-update", user.wishlist);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// global error handler
app.use(globalErrorHandler);

// spining server
const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || "production";

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    // starting server only if connection to mongoDB successfull
    server.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT} in ${MODE} mode.`);
    });
  } catch (error) {
    console.log(`Aborting server due to some issue connecting to db`);
  }
};

start();
