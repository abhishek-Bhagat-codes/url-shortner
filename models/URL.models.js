const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    URL: {
      type: String,
      required: true,
    },
    ShortUrl: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // store user _id
      ref: "userModel", // reference User model
    },
    vistingHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
