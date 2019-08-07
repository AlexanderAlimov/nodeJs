const Product = require('../models/product');
const Order = require('../models/order');

// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(error => {
      console.log(error);
    })
};

exports.showProductDetails = (req, res, next) => {
  const prodId = req.params.id;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: 'Details',
        path: '/products'
      });
    })
    .catch(error => console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(error => {
      console.log(error);
    })
};

exports.getCart = (req, res, next) => {
  // console.log(req.user.cart);
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      console.log("cart products");
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        prods: products
      });
    })
    .catch(error => {
      console.log(error);
    })
};

exports.addToCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id).then(product=>{
    return req.user.addToCart(product)
    .then(result=>{
      console.log(result);
      res.redirect('/cart');
    })
    .catch(error=>{
      console.log(error)
    });
  })
};

exports.removeFromCart = (req, res, next) => {
  const id = req.body.id;
  req.user.deleteFromCart(id)
  .then(result=>{
    console.log(result)
    res.redirect('/cart');
  })
}

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(item => {
        return { quantity: item.quantity, product: { ...item.productId._doc }}
      })
      const order = new Order({
        products: products,
        user: {
          name: req.user.name,
          userId: req.user
        }
      })
      return order.save()
    })
    .then(result=>{
      return req.user.clearCart()
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(error => console.log(error))
}

exports.getOrders = (req, res, next) => {
  Order.find({"user.userId": req.user._id})
  .then(orders=>{
    console.log("orders");
    console.log(orders);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(error=>console.log(error));

};

