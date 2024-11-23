const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const questionRouter = require("./routes/questionRoutes");
const answerRouter = require("./routes/answerRoutes");

const AppError = require("./utils/appError");
const app = express();

// Middlewares

// converts the JSON data into a JavaScript object and attaches it to the req.body property
app.use(express.json());

app.use(cors());
// app.use(cors({origin:"https://frontendhost"}));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/answers", answerRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
