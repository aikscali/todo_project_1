const jwt = require("jsonwebtoken");

/**
 * Authentication middleware for Express.js.
 *
 * Validates JWT tokens provided either in cookies or in the `Authorization` header.
 * If the token is valid, attaches the decoded user information to the `req.user` object.
 * Otherwise, returns an appropriate HTTP error response.
 *
 * @function authMiddleware
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next middleware function.
 * @returns {import("express").Response|void} If the token is missing or invalid, returns an error response; otherwise calls `next()`.
 *
 * @example
 * // Usage in an Express route
 * const authMiddleware = require("./middlewares/authMiddleware");
 *
 * app.get("/protected", authMiddleware, (req, res) => {
 *   res.json({ message: `Hello ${req.user.username}` });
 * });
 */
function authMiddleware(req, res, next) {
  // Try to get the token from cookies or the Authorization header
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // e.g., user.id, user.email, user.roles
    next();
  });
}

module.exports = authMiddleware;
