const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product{
  constructor(title,price,description,imageUrl,id,userId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.userId = userId;
  }

  save(){
    const db = getDb();
    return db.collection('products').insertOne(this)
    .then(result=>{
      console.log(result);
    })
    .catch(error=>console.log(error));
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray()
    .then(products=>{
      console.log(products);
      return products;
    })
    .catch(error=>console.log(error));
  }

  static findById(id){
    const db = getDb();
    return db.collection('products').find({
      _id: new mongodb.ObjectID(id)
    })
    .next()
    .then(product=>{
      console.log(product);
      return product;
    })
    .catch(error=>console.log(error));
  }

  static update(id,prod){
    const db = getDb();
    console.log('id!!!!');
    console.log(id);
    return db.collection('products').updateOne({
      _id: new mongodb.ObjectID(id)
    },
      {
        $set:{title: prod.title,imageUrl:prod.imageUrl,description:prod.description,price:prod.price},
        $currentDate: { lastMoified: true }
      }
    )
    .then(updatedProduct=>{
      console.log('updatedProduct!!!!!');
      console.log(updatedProduct);
      return updatedProduct;
    })
    .catch(error=>console.log(error));
  }

  static delete(id){
    const db = getDb();
    return db.collection('products').deleteOne({
      _id: new mongodb.ObjectID(id)
    })
    .then(result=>{
      console.log(result);
    })
    .catch(error=>{
      console.log(error);
    })
  }
}


module.exports = Product;

