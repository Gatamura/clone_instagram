//import mysql

// var mysql = require('mysql');
var mysql      = require('mysql');

var connectDB = function(){
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'instagram_clone'
    });
    
    connection.connect();

}


//wrapper
module.exports = function(){
    return connectDB;
}
