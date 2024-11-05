import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import helmet from "helmet";
import hpp from "hpp";
import mongoSatitize from "express-mongo-sanitize";
import session from "express-session";
import productRouter from "./router/productRouter.js";
import cors from "cors";
import globalErrorHandler from "./middlewares/errorMiddleware.js";
const app = express();
dotenv.config();
app.use(cors());

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

// endpoints
app.use("/api/products", productRouter);

// global error handler
app.use(globalErrorHandler);

// spining server
const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || "production";

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    // starting server only if connection to mongoDB successfull
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT} in ${MODE} mode.`);
    });
  } catch (error) {
    console.log(`Aborting server due to some issue connecting to db`);
  }
};

start();
