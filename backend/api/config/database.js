const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Establishes a connection to MongoDB using the connection string from environment variables
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when connection is established successfully
 * @throws {Error} If connection fails, logs error and exits process with code 1
 * @example
 * // Usage:
 * await connectDB();
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

/**
 * Gracefully disconnects from MongoDB
 * @async
 * @function disconnectDB
 * @returns {Promise<void>} Resolves when disconnection is complete
 * @throws {Error} If disconnection fails, logs error but doesn't exit process
 * @example
 * // Usage:
 * await disconnectDB();
 */
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error.message);
  }
};

module.exports = { connectDB, disconnectDB };
