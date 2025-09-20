const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/routes");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS options
const corsOptions = {
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    /^https:\/\/.*\.vercel\.app$/, 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use("/api/v1", routes);

connectDB();

app.get("/", (req, res) => res.send("Server is running"));

if (require.main == module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}

/**
 * Express application setup with middleware, CORS, and routes.
 *
 * @module app
 * @requires express
 * @requires dotenv/config
 * @requires cors
 * @requires cookie-parser
 * @requires ./routes/routes
 * @requires ./config/database
 *
 * @example
 * // Start the server
 * node server.js
 *
 * @example
 * // Access the API
 * GET http://localhost:3000/api/v1/users
 */
