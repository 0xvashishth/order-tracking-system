const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required for the order"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required for each item in the order"],
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalAmount: {
    type: Number,
    required: [true, "Total order amount is required"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "in progress", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
