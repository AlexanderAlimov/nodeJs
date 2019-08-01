const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectID = mongodb.ObjectID;

class User{
    constructor(userName,email){
        this.userName = userName;
        this.email = email;
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

    static findById(id){
        const db = getDb();
        return db.collection('users')

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