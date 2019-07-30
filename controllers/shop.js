const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(prodId)
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
  Product.findAll()
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
    .then(cart => {
      // console.log(cart);
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            prods: products
          });
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      console.log(error)
    })
};

exports.addToCart = (req, res, next) => {
  const id = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: id } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        let oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(id)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => { console.log(error) });
};

exports.removeFromCart = (req, res, next) => {
  const id = req.body.id;
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{id: id}})
  })
  .then(products=>{
    let product;
    if(products.length>0){
      product = products[0];
      return product.cartItem.destroy();
    }
  })
  .then(()=>{
    res.redirect('/cart');
  })
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts()
    })
    .then(products => {
      console.log(products)
      return req.user
        .createOrder()
        .then(order => {
          order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity }
              return product;
            }))
        })
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(()=>{
      res.redirect('/orders');
    })
    .catch(error => console.log(error))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
  .then(orders=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(error=>console.log(error));

};

