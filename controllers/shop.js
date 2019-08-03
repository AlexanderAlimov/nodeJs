const Product = require('../models/product');

// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.fetchAll()
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
  req.user.getCart()
        .then(products => {
          console.log("cart products");
          console.log(products);
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
  let fetchedCart;
  req.user.addOrder()
    .then(()=>{
      res.redirect('/orders');
    })
    .catch(error => console.log(error))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
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

