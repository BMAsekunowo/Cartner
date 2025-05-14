const express = require('express'); //Express server
const cors = require('cors');   //Communication between client and server   
const dotenv = require('dotenv');   //Hot-Hush Pagush
const connectDB = require('./config/db.js'); //Database MVC
const app = express(); //Express app Init

// Middleware
dotenv.config();
connectDB(); //MongoDB connection
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounted Routes
app.use('/ap', require('./routes/system'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`This Server is currently running on port ${PORT}`);
});

//All fully Tested by self and operational -- Cleared for phase 2 on the 14th of May 2025