import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import session from "express-session";
import { Server } from "socket.io";
import http from "http";
import connectDb from "./config/db.js";
import "./config/passport.js";
import globalErrorHandler from "./middlewares/errorMiddleware.js";
import productRouter from "./router/productRouter.js";
import authRouter from "./router/authRouter.js";
import cartRouter from "./router/cartRouter.js";
import socketHandler from "./socket/socketHandler.js";
import passport from "passport";

dotenv.config();

// Express app initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware Setup
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true for HTTPS
  })
);

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Routes Setup
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

// Global Error Handling Middleware
app.use(globalErrorHandler);

// Socket.IO Setup (Moved to separate handler)
socketHandler(io);

// Start Server
const startServer = async () => {
  try {
    // Connect to Database
    await connectDb(process.env.MONGO_URI);

    // Start Server
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(
        `Server is listening on port ${PORT} in ${
          process.env.NODE_ENV || "production"
        } mode.`
      );
    });
  } catch (error) {
    console.error("Database connection failed, server not started:", error);
  }
};

startServer();
