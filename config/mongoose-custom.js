var mongoose = require('mongoose');

function connectMongoose(){
    
    mongoose.connect('mongodb://localhost:27017/mongoose', {useMongoClient : true});

    return mongoose;
}


module.exports = () => {
    return connectMongoose;
}