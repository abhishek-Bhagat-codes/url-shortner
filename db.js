const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(uri);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
