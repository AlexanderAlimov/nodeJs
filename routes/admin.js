const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/products => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.removeProduct);

module.exports = router;
