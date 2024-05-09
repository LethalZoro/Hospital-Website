import express from "express";
import mongoose from "mongoose";
// import { PORT, mongoURI } from "./config.js";
import { mongoURI } from "./config.js";

import { Patient } from "./models/patientModel.js";
import patientRoute from "./routes/patientRoute.js";
import expenseRoute from "./routes/expenseRoute.js";

import cors from "cors";

const PORT = process.env.PORT || 5555;

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handeling CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcomse");
});

app.use("/patient", patientRoute);

// use expenseRoute here
app.use("/expense", expenseRoute);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
