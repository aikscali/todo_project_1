const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/routes");
const {connectDB} = require("./config/database");
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// set the CORS options

const corsOptions = {
  origin: [
    process.env.CLIENT_URL,   
    "http://localhost:5173" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};




app.use(cors({
  origin: [
    'http://localhost:5173',       // frontend local
    process.env.CLIENT_URL, // frontend en producción
  ],
  credentials: true  
}));

app.use("/api/v1", routes);

connectDB();

app.get("/",(req, res)=> res.send("Server is running"));

if (require.main == module){
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`)
    );
}