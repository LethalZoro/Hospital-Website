import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model("Expense", ExpenseSchema);
