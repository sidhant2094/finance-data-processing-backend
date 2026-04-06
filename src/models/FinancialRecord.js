const mongoose = require("mongoose");

const financialRecordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
      index: true
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
      index: true
    },

    notes: {
      type: String,
      trim: true,
      default: ""
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "FinancialRecord",
  financialRecordSchema
);