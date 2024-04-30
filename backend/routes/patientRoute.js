import express from "express";
import { Patient } from "../models/patientModel.js";
const router = express.Router();

// Route to save the Patient data
router.post("/", async (request, response) => {
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
    response.status(500).send("Internal server error on post");
  }
});

// Route to get all the Patient data
router.get("/", async (request, response) => {
  try {
    const patients = await Patient.find({});
    return response.status(200).json({
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on get");
  }
});

// Route to get a single Patient data
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const patients = await Patient.findById(id);

    if (!patients) {
      return response.status(404).send({ message: "Patient not found" });
    }
    return response.status(200).json(patients);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on get");
  }
});

// Route to update the Patient data
router.put("/:id", async (request, response) => {
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
    const { id } = request.params;

    const result = await Patient.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Patient not found" });
    }

    return response
      .status(200)
      .send({ message: "Patient updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on put");
  }
});

// Route to delete the Patient data
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Patient.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Patient not found" });
    }

    return response
      .status(200)
      .send({ message: "Patient deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on delete");
  }
});

export default router;
