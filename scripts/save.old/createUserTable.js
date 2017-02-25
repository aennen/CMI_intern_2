/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

// CREATES users TABLE
process.stdout.write("Create users table " + dbConfig.users_table + "\n");
connection.query('CREATE TABLE IF NOT EXISTS `' + dbConfig.database + '`.`' + dbConfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(128) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log('Success: Table Created!');

connection.end();
