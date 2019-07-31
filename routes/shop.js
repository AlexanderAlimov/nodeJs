const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:id',shopController.showProductDetails);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.addToCart);

// router.post('/cart-delete', shopController.removeFromCart);

// router.get('/orders', shopController.getOrders);

// router.post('/create-order', shopController.postOrder);

module.exports = router;
