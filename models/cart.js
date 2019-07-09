const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

  const getDataFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

module.exports = class Cart {
    static addProduct(productId,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            let cart = { products:[], totalPrice:0 };
            if(!err){
                cart = JSON.parse(fileContent);
            }
            let existingProductIndex = cart.products.findIndex(prod => productId === prod.id );
            let existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                existingProduct.qty = existingProduct.qty +1;
                updatedProduct = {...existingProduct};
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
                
            }else{
                updatedProduct = {id:productId, qty:1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = +cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })
        })
    }

    static fetchAll(cb){
        getDataFromFile(cb)
    }

    static removeProduct(id,price,qty){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                console.log(err);
                return;
            }
            let cart = JSON.parse(fileContent);
            cart.products = cart.products.filter(item=>item.id!==id);
            console.log("33333333333");
            console.log(cart.totalPrice);
            console.log("2222222222");
            console.log(price);
            cart.totalPrice = cart.totalPrice - +price * qty;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })
        })
    }
}