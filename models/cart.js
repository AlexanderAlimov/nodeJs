const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

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
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })
        })
    }
}