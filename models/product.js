const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static findById(id,cb) {
    getProductsFromFile(products=>{
      const product = products.find(p=>id===p.id);
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static remove(id){
    getProductsFromFile(products => {
      products = products.filter(product => id !== product.id);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      } )
    })
  }

  static editProduct(id){
    getProductsFromFile(products => {
      console.log(66666666);
      console.log(id);
      console.log(7777777777777);
      console.log(products);
      const product = products.find(item=>item.id === id);
      console.log(8888888888);
      console.log(product);
    })
  }
};
