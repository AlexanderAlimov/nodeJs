const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(error=>{
    console.log(error);
  })
};

exports.showProductDetails = (req, res, next) => {
  const prodId = req.params.id;
  Product.findByPk(prodId)
  .then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Details',
      path: '/products'
    });
  })
  .catch(error=>console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(error=>{
    console.log(error);
  })
};

exports.getCart = (req, res, next) => {
  Product.findAll()
  .then((productsProd)=>{
    Cart.fetchAll(productsCart=>{
      let products = [];
      for(let prodItem of productsCart.products){
        for(let p of productsProd){
          if(p.dataValues.id == prodItem.id){
            products.push({title:p.dataValues.title,qty:prodItem.qty,id:p.dataValues.id,price:p.dataValues.price});
          }
        }
      }
        res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        prods: products
      });
    })
  })
  .catch(error=>{console.log(error)});
};

exports.removeFromCart = (req,res,next) => {
  const id = req.body.id;
  const price = req.body.price;
  const qty = req.body.qty;
  Cart.removeProduct(id,price,qty);
  res.redirect('/cart');
}

exports.addToCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findByPk(id)
  .then(product => {
    Cart.addProduct(id,product.price);
    res.redirect('/')
  })
  .catch(error=>console.log(error));
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
