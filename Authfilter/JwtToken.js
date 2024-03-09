const jwt = require("jsonwebtoken");
const { hashPassword } = require("../PasswordEncryptor/encrypt");
require("dotenv").config();

// Secret key used to sign JWT tokens
const secretKey = process.env.SECRETKEY;

// Function to generate a JWT token
const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1w" }); // Token expires in 1 week
  // localStorage.setItem("token", token);
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
  return token;
};

const verifyToken = (token) => {
  if (!token) return null;

  // Check if token is expired or not..
  if (isTokenExpired(token)) return null;

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Function to check if a JWT token is expired
const isTokenExpired = (token) => {
  const decodedToken = jwt.decode(token);
  if (!decodedToken || !decodedToken.exp) {
    // Token is invalid or doesn't have an expiration time
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decodedToken.exp < currentTime;
};

module.exports = { generateToken, verifyToken };
