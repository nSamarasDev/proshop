// import express from 'express'
// const router = express.Router()
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @dec      Fetch all products
// @route    Get /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @ desc   Fetch single product
// @ route  Get /api/products/:id
// @ access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// @ desc   Delete a product
// @ route  DELETE /api/products/:id
// @ access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If the product exists ? then
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export { getProducts, getProductById, deleteProduct };
