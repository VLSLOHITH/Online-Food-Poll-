const mongoose = require('mongoose')

//Map globel promises
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose.connect('mongodb+srv://jack_king:jack_king@cluster0.8xujqjm.mongodb.net/Pusherpolldb')
.then(()=> console.log('MongoDB Connected'))
.catch(err=> console.log(err));