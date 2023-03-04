const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  used: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
});

const RefreshToken = mongoose.model("refreshtoken", refreshTokenSchema);

module.exports = RefreshToken;
