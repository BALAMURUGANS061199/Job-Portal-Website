import express from "express";
import {
  RegisterCompany,
  GetCompanyByID,
  GetCompany,
  UpdateCompany,
} from "../Controllers/CompanyControl.js";
import isAuthenticate from "../Middleware/isAuthentcate.js";
const router = express.Router();

router.route("/register").post(isAuthenticate, RegisterCompany);
router.route("/get").post(isAuthenticate, GetCompany);
router.route("/get/:id").post(isAuthenticate, GetCompanyByID);
router.route("/update/:id").post(isAuthenticate, UpdateCompany);

export default router;
