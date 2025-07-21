const JWT = require("jsonwebtoken"); //Handling Authentication

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized, token missing or malformed" });
  }

  const token = authHeader.split(" ")[1]; //Extracting the token from the authorization header
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET); //Verifying the token
    req.user = decoded; //Attaching the user information to the request object
    next(); //Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Unauthorized, Invalid or expired token. Please login again",
    });
  }
};

module.exports = protect;
