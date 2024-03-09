const { verifyToken } = require("./JwtToken");

let errormessage = {
  success: false,
  message: "",
};

// Middleware to check for Bearer token
const restrictTouser = (req, res, next) => {
  // Check if Authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    errormessage.message = "User need to log in to access this page.";
    return res.status(401).json(errormessage);
  }

  // Extract token from header
  const token = authHeader.split(" ")[1];
  if (!token) {
    errormessage.message = "User need to log in to access this page.";
    return res.status(401).json(errormessage);
  }

  // Example: Check if the token is valid
  const payload = verifyToken(token);
  if (payload == null) {
    errormessage.message = "Invalid token access!! Request Denied. Login Again";
    return res.status(401).json(errormessage);
  }

  req.user = payload;
  // If everything is fine, proceed to the next middleware
  next();
};

module.exports = restrictTouser;
