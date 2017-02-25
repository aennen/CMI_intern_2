/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

connection.query('DROP SCHEMA IF EXISTS ' + dbConfig.database, function(err,rows) { if(err) throw err; process.stdout.write("Drop Schema OK\n"); }); // DROPS RESIDUAL DATABASE/TABLES

connection.query('CREATE DATABASE ' + dbConfig.database, function(err,rows) { if(err) throw err; }); // CREATES CMI_internship_data SCHEMA

connection.query('USE ' + dbConfig.database, function(err,rows) { if(err) throw err; });

process.stdout.write("Create schema " + dbConfig.database + "\n");

console.log('Success: Schema Created!');

connection.end();
