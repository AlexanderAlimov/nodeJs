const path = require('path');
const request = require('request');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('5d46c4bce2dae02282e38da0')
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(error=>{
        console.log(error);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        'mongodb+srv://sasha_alimov:Sasha1984@cluster0-gpvgi.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: "Sasha",
                    email: "sasha@s.com",
                    cart: {
                        items: []
                    }
                })
                user.save();
            }

        })

        app.listen(3000);
    })
    .catch(error => {
        console.log(error)
    })




