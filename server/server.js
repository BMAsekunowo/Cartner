const express = require("express"); //Express server
const cors = require("cors"); //Communication between client and server
const dotenv = require("dotenv"); //Hot-Hush Pagush
const connectDB = require("./config/db.js"); //Database MVC
const app = express(); //Express app Init
const errorHandler = require("./middleware/errorHandler"); //Global Error Handler

// Middleware
dotenv.config(); // Load Environment Var
connectDB(); //MongoDB connection

//Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounted Routes
app.use("/api", require("./routes/system")); //Basic System Routes
app.use("/api/auth", require("./routes/auth")); //Auth Routes
app.use("/api/products", require("./routes/product")); //Product Routes
app.use("/api/carts", require("./routes/cart")); //Cart Routes
app.use("/api/sessions", require("./routes/session")); //Session Routes
app.use("/api/profile", require("./routes/profile")); //Profile Routes
const path = require("path");
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Global Error Handler (should come after all routes)
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This Server is currently running on port ${PORT}`);
});

//All fully Tested by self and operational -- Cleared for phase 2 on the 14th of May 2025
