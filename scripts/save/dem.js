/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

connection.query('USE ' + dbConfig.database, function(err,rows) { if(err) throw err; });

connection.query('\
CREATE TABLE categories ( \
   cat_id int not null auto_increment primary key, \
   cat_name varchar(255) not null, \
   cat_description text) \
ENGINE=InnoDB;');
 
connection.query('CREATE TABLE products ( \
   prd_id int not null auto_increment primary key, \
   prd_name varchar(355) not null, \
   prd_price decimal, \
   cat_id int not null, \
   FOREIGN KEY fk_cat(cat_id) \
   REFERENCES categories(cat_id) \
   ON UPDATE CASCADE \
   ON DELETE RESTRICT) \
ENGINE=InnoDB;');

console.log('Success: Table Created!');

connection.end();
