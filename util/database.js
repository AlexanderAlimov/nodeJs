
///not for mongoose /// mongoose does it behind the sceene

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => {
//     MongoClient.connect('mongodb+srv://sasha_alimov:Sasha1984@cluster0-gpvgi.mongodb.net/test?retryWrites=true&w=majority')
//         .then(client => { 
//             console.log('connected') 
//             _db = client.db();
//             callback();
//         })
//         .catch(error => {
//             console.log(error)
//             throw error;
//         });
// }

// const getDb = () => {
//     if(_db){
//         return _db;
//     }
//     throw "no Databace found";
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
