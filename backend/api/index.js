const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {connectDB} = require("./config/database")


connectDB();


const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => 
        console.log(`Server running on http://localhost:${PORT}`)
    );
    
}