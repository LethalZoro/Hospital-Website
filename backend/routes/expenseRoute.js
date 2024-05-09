import express from "express";
import { Expense } from "../models/expenseModel.js";
const router = express.Router();

// Route to save the Expense data
router.post("/", async (request, response) => {
  try {
    if (!request.body.type || !request.body.amount) {
      return response
        .status(400)
        .send({ message: "Please fill all the fields" });
    }
    const new_expense = {
      type: request.body.type,
      amount: request.body.amount,
      note: request.body.note,
    };
    const expense = await Expense.create(new_expense);
    return response.status(201).send(expense);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on post");
  }
});

// Route to get all the Expense data
router.get("/", async (request, response) => {
  try {
    const expenses = await Expense.find({});
    return response.status(200).json({
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on get");
  }
});

// Route to get a single Expense data
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const expenses = await Expense.findById(id);

    if (!expenses) {
      return response.status(404).send({ message: "Expense not found" });
    }
    return response.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on get");
  }
});

// Route to update the Expense data
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updated_expense = {
      type: request.body.type,
      amount: request.body.amount,
      note: request.body.note,
    };
    const expense = await Expense.findByIdAndUpdate(id, updated_expense, {
      new: true,
    });
    if (!expense) {
      return response.status(404).send({ message: "Expense not found" });
    }
    return response.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on put");
  }
});

// Route to delete the Expense data
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return response.status(404).send({ message: "Expense not found" });
    }
    return response
      .status(200)
      .send({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error on delete");
  }
});

export default router;
