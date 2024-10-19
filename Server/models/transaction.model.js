import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card", "online"],
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "expense", "investment"],
    required: true,
  },
  amount: {
    required: true,
    type: Number,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  data: {
    type: Date,
    required: true,
  },
});

export default Transaction = mongoose.model("Transaction", transactionSchema);
