const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoggerSchema = new Schema({
  phone: String,
  email: String,
  action: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("logger", LoggerSchema);
