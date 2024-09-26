import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Utils/DB.js";
import UserRoute from "./Router/UserRoute.js";
import CompanyRouter from "./Router/CompanyRoute.js";
import morgan from "morgan";
const app = express();
dotenv.config();
//middleware
app.use(express.json());
app.use("/api/user", UserRoute);
app.use("/api/company", CompanyRouter);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
const corsOption = { origin: "http://localhost:5173", credential: true };

const PORT = process.env.PORT || 6000;
app.use(cors(corsOption));
app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server Running at Port ${PORT}`);
});
