import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// Register User
export const Register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is Missing", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already exists with this Email",
        success: false,
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashpassword,
      role,
    });

    return res.status(200).json({ message: "Account Created Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Login User
export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is Missing", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect Email or Password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Incorrect Email or Password", success: false });
    }

    // Check if the role matches
    if (user.role !== role) {
      return res.status(400).json({
        message: "Account Does not Exist With Current Role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.Secret_key, {
      expiresIn: "1d",
    });
    console.log(token);
    user = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        success: true,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Logout User
export const Logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: "Logout Successfully",
        success: true,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Update User Profile
export const UpdateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Something is Missing", success: false });
    }
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim()); // Trim whitespace
    }

    const userId = req.id; // Assume req.id is set by the authentication middleware
    let user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Found", success: false });
    }

    // Updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Resume upload via Cloudinary or other storage service comes here (not implemented)

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
