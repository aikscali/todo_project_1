const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/routes");
const {connectDB} = require("./config/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.use("/api/v1", routes);

connectDB();

app.get("/",(req, res)=> res.send("Server is running"));

if (require.main == module){
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`)
    );
}