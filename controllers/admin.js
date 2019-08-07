const Product = require('../models/product');


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  console.log("reqParams !!!!");
  console.log(req.params);
  console.log('!!!!!!!!!!!');
  const prodId = req.params.productId;
  // req.user.getProducts({where:{id:prodId}})
  Product.findById(prodId)
  .then(product => {
    // const product = products[0];
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product:product
    });
  })
  .catch(error=>{console.log(error)});
};

exports.getAddProduct = (req, res, next) => {
  const editMode = false;
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: editMode
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title,
    imageUrl,
    price,
    description,
    userId: req.user
  });

  product.save()
  .then((result)=>{
    console.log("Created Product");
    res.redirect('/');
  })
  .catch(error=>{
    console.log(error);
  })
  
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.body.id;
  console.log("Start Update!!!!");
  Product.update({ _id: prodId }, {
    $set: {
      title,
      imageUrl,
      price,
      description
    }
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    })
};

exports.getProducts = (req, res, next) => {
  // req.user.getProducts()
  Product.find()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(error=>{
    console.log(error);
  })

};

exports.removeProduct = (req, res, next) => {
  Product.remove({_id: req.body.id})
  .then(() => {
    console.log("Done");
    res.redirect('/');
  })
  .catch(error=>{
    console.log(error);
  })
  
}
