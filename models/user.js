const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectID = mongodb.ObjectID;

class User{
    constructor(userName,email,cart,_id){
        this.userName = userName;
        this.email = email;
        this.cart = cart;
        this._id = _id;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(result=>{
            console.log(result);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    addToCart(product){
        // const updatedCart = { items: [{...product,quantity:1}]}

        const cartProductIndex = this.cart.items.findIndex(cp=>{
            return cp.productId.toString() === product._id.toString();
        })
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if(cartProductIndex>=0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else {
            updatedCartItems.push({
                productId: new ObjectID(product._id),
                quantity: newQuantity
                })
        }
        const updatedCart = { items:updatedCartItems };
        const db = getDb();
        return db
        .collection('users')
        .updateOne(
            {_id: ObjectID(this._id)},
            {$set: {cart: updatedCart}}
            );
        }

    getCart(){
        const db = getDb();
        const prodIds = this.cart.items.map(p=>{
            return p.productId;
        })
        return db
        .collection('products')
        .find({ _id : { $in: prodIds }})
        .toArray()
        .then(products=>{
            return products.map(p=>{
                return {
                    ...p,
                    quantity: this.cart.items.find(item=>{
                        return item.productId.toString() === p._id.toString()
                    }).quantity
                }
            })
        })
    }

    deleteFromCart(productId){
        const updatedCartItems = this.cart.items.filter(item=>{
            return item.productId.toString() !== productId.toString()
        })
        const upadtedCart = {items: updatedCartItems}
        const db = getDb();
        return db
        .collection('users')
        .updateOne(
            {_id: ObjectID(this._id)},
            {$set: {cart: upadtedCart}}
        )
    }

    addOrder() {
        const db = getDb();

        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new ObjectID(this._id),
                        userName: this.userName
                    }
                }
                return db.collection('orders').insertOne(order)
            })
            .then(result => {
                this.cart = { items: [] }
                return db
                    .collection('users')
                    .updateOne(
                        { _id: ObjectID(this._id) },
                        { $set: { cart: { items: [] } } }
                    )
            })
    }

    getOrders(){
        const db = getDb();
        return db
        .collection('orders')
        .find({'user._id': new ObjectID(this._id)})
        .toArray()
    }

    static findById(id){
        const db = getDb();
        return db
        .collection('users')
        //// if use findOne there is no cursor so next() no need
        // findOne({
        //     _id: new ObjectID(id)
        // })
        .find({
            _id: new ObjectID(id)
        })
        .next()
        .then(user=>{
            console.log(user);
            return user;
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

module.exports = User;