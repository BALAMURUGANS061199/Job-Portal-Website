import express from "express";
import {
  Login,
  Logout,
  Register,
  UpdateProfile,
} from "../Controllers/UserController.js";
import isAuthenticate from "../Middleware/isAuthentcate.js";

const router = express.Router();

router.route("/create").post(Register);
router.route("/login").post(Login);
router.route("/profile/update").post(isAuthenticate, UpdateProfile);
router.route("/logout").get(Logout);

export default router;
