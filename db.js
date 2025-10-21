const mongoose = require("mongoose");

const mongoURI = 'mongodb://127.0.0.1:27017/shortURL';

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ Server is connected to database!");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

module.exports = mongoose;

