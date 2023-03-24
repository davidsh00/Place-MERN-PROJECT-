const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSChema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});
module.exports = mongoose.model("User", userSChema);
