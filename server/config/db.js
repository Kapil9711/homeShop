import mongoose from "mongoose";

// making connection to mongoDB server
const connectDb = async (connectionStr) => {
  try {
    await mongoose.connect(connectionStr);
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export default connectDb;
