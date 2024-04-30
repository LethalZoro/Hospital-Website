import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURI } from "./config.js";
import { Patient } from "./models/patientModel.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcomse");
});

// Route to save the Patient data
app.post("/patient", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.address ||
      !request.body.diagnosis ||
      !request.body.ammount
    ) {
      return response
        .status(400)
        .send({ message: "Please fill all the fields" });
    }
    const new_patient = {
      name: request.body.name,
      address: request.body.address,
      diagnosis: request.body.diagnosis,
      ammount: request.body.ammount,
    };
    const patient = await Patient.create(new_patient);
    return response.status(201).send(patient);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error");
  }
});

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
