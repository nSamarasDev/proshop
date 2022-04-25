// import express from 'express';
// const router = express.Router();
// import {
//   getProducts,
//   getProductById,
// } from '../controllers/productController.js';

// export default router;
import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// @ desc   Fetch all products
// @ route  Get /api/products
// @ access   Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // res.status(401)
    // throw new Error('Not Authorized')  // errorTesting
    res.json(products);
  })
);

// @ desc   Fetch single product
// @ route  Get /api/products/:id
// @ access   Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;

// The above code is what I have that is working.
// The code below is what brad has which is not working

// import express from 'express';
// const router = express.Router();
// import {
//   getProducts,
//   getProductById,
//   deleteProduct,
// } from '../controllers/productController.js';
// import { protect, admin } from '../middleware/authMiddleware';

// router.route('/').get(getProducts);
// router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

// export default router;
