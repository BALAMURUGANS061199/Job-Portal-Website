import jwt from "jsonwebtoken";

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    const decoded = await jwt.verify(token, process.env.Secret_key);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    console.log(decoded, "token");
    req.id = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export default isAuthenticate;
