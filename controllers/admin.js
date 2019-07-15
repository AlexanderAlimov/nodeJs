const Product = require('../models/product');


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product => {
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
  Product.create({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  })
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
  Product.update({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description
  },{where:{id:prodId}})
  .then(()=>{
    res.redirect('/');
  })
  .catch(error=>{
    console.log(error);
  })
  
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.destroy({
    where: {
      id: req.body.id
    }
  }).then(() => {
    console.log("Done");
    res.redirect('/');
  })
  .catch(error=>{
    console.log(error);
  })
  
}
