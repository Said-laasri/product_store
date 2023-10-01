const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: 50,
      minlength: 3,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      maxlength: 100,
    },
    company: {
      type: String,
      required: [true, "Please add a company name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [false, "Please add a description"],
      maxlength: 500,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductsSchema);
