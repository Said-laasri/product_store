const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findOne({ _id: productId, createdBy: userId });
  if (!product) {
    throw new NotFoundError("No product with this id");
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    body: { price, quantity },
    user: { userId },
    params: { id: productId },
  } = req;

  const updates = {};

  if (price) {
    updates.price = price;
  }

  if (quantity) {
    updates.quantity = quantity;
  }

  if (Object.keys(updates).length === 0) {
    throw new BadRequestError(`No fields to update`);
  }

  const product = await Product.findOneAndUpdate(
    { _id: productId, createdBy: userId },
    updates,
    { new: true }
  );

  if (!product) {
    throw new NotFoundError(`No product with this ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findByIdAndRemove({
    _id: productId,
    createdBy: userId,
  });

  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
