const jwt = require("jsonwebtoken");

/**
 * @openapi
 * components:
 *    schemas:
 *       Error401:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 *
 *
 */
module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    if (!decodedToken) {
      const error = new Error("Not authorized");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    next(error);
  }
};
