const mongoose = require("mongoose");
const Product = require("../models/product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      await product.save({ session });
      await session.commitTransaction();

      res.status(201).json({ success: true, message: "product created successfully", product });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Something Went Wrong!" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products, message: "products retrieved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something Went Wrong!" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, product, message: "product retrieved successfully"  });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something Went Wrong!" });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, isAvailable } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.isAvailable = isAvailable;

    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      await product.save({ session });
      await session.commitTransaction();

      res.status(200).json({ success: true, product, message: "product updated successfully"  });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Something Went Wrong!" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    await product.deleteOne({_id: req.params.id});

    res.status(200).json({ success: true, message: "product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something Went Wrong!" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
