import CustomError from "./../utils/customError.js";

const handleProductionError = (err) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  // Handle Mongoose errors
  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 404;
  } else if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    statusCode = 400;
  } else if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    statusCode = 400;
  } else if (err.name === "jsonWebTokenError") {
    message = `Invalid JSON Web Token. Try again!`;
    statusCode = 401;
  } else if (err.name === "TokenExpiredError") {
    message = `JSON Web Token has expired. Try again!`;
    statusCode = 401;
  }

  // Return the processed error
  return new CustomError(message, statusCode);
};

const globalErrorHandler = (err, req, res, next) => {
  let responseError = err;
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  // Development environment - detailed error info
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      message,
      error: err,
      stackTrace: err.stack,
    });
  }

  // Production environment - clean error message
  if (process.env.NODE_ENV === "production") {
    responseError = handleProductionError(err);

    return res.status(responseError.statusCode).json({
      success: false,
      message: responseError.message,
    });
  }

  // In case of unhandled environment case
  return res.status(500).json({
    success: false,
    message: "An unexpected error occurred!",
  });
};

export default globalErrorHandler;
