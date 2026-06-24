const express = require('express');
const app = express();

const path = require("path")
const cookieParser = require('cookie-parser');
const cors = require('cors');

const ErrorHandler = require("./utils/errorHandler");
const errorMiddleware = require("./middleware/errors");


//Midlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));


//Routes
const auth = require('./routes/auth');
const { applyTimestamps } = require('./models/user');
app.use('/api/v1/auth', auth);

const linkRouter = require("./routes/linkRouter");
app.use("/api/v1/links", linkRouter);

// View Engine
app.set("view engine", "pug");
app.set("views",path.join(__dirname, "views"));

//404 Handler
app.use((req, res, next) => {
    next(new ErrorHandler(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Handler
app.use(errorMiddleware)

module.exports = app;