//import mongodb

var mongo = require('mongodb');

var connMongoDB = function(){
    var db = new mongo.Db(
        'controle_de_pagamentos', // nome da database
        new mongo.Server(
            'localhost', // endereco do banco
            '27017', // porta
            {}
        ),
        {}
    )

    return db;

}


//wrapper
module.exports = function(){
    return connMongoDB;
}
