const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *    schemas:
 *       UserSignUp:
 *          type: object
 *          required:
 *             - fullName
 *             - email
 *             - password
 *          properties:
 *             fullName:
 *                type: string
 *                example: Satyendra Kumar
 *             email:
 *                type: string
 *                example: satyendra@gmail.com
 *             password:
 *                type: password
 *                example: Satyendra123
 *
 */
const postSchema = new Schema({
  fullName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("users", postSchema);
