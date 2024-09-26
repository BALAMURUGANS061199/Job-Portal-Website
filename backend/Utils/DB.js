import Mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await Mongoose.connect(process.env.URL);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(err, "error");
  }
};

export default ConnectDB;
