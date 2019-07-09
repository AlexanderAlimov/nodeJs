const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.showProductDetails = (req, res, next) => {
  const prodId = req.params.id;
  Product.findById(prodId, prod => {
      res.render('shop/product-detail', {
      product: prod,
      pageTitle: 'Details',
      path: '/products'
    });
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Product.fetchAll(productsProd=>{
    Cart.fetchAll(productsCart=>{
      let products = [];
      for(let prodItem of productsCart.products){
        for(let p of productsProd){
          if(p.id === prodItem.id){
            products.push({title:p.title,qty:prodItem.qty,id:p.id,price:p.price});
          }
        }
      }
      console.log(products);
        res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        prods: products
      });
    })
  })
};

exports.removeFromCart = (req,res,next) => {
  console.log("req.body");
  console.log(req.body);
  const id = req.body.id;
  const price = req.body.price;
  const qty = req.body.qty;
  console.log("req.body.price+++++++++");
  console.log(price);
  Cart.removeProduct(id,price,qty);
  res.redirect('/cart');
}

exports.addToCart = (req, res, next) => {
  // console.log(req.body.productId);
  const id = req.body.productId;
  Product.findById(id, product => {
    Cart.addProduct(id,product.price);
  })
  res.redirect('/')
  
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
