/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

connection.query('USE ' + dbConfig.database, function(err,rows) { if(err) throw err; });

// CREATES userProfile TABLE
process.stdout.write("Create profile table "+ dbConfig.intern_profile_table +"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.database + '.' + dbConfig.intern_profile_table + ' ( \
    idUser INT NOT NULL AUTO_INCREMENT,\
    `id` INT UNSIGNED NOT NULL,\
    nameFirst VARCHAR(64) NULL, \
    nameLast VARCHAR(64) NULL, \
    resLink VARCHAR(256) NULL, \
    address VARCHAR(64) NULL, \
    city VARCHAR(64) NULL, \
    stateCode VARCHAR(24) NULL, \
    zip VARCHAR(24) NULL, \
    email VARCHAR(64) NULL, \
    phone VARCHAR(24) NULL, \
    usVet ENUM("Y", "N") NULL, \
    usAuth ENUM("Y", "N") NULL, \
    industryPref VARCHAR(256) NULL, \
    langSkills VARCHAR(512) NULL, \
    school VARCHAR(256) NULL, \
    degree VARCHAR(64) NULL, \
    major VARCHAR(64) NULL, \
    interest VARCHAR(64) NULL, \
    gradDate VARCHAR(64) NULL, \
PRIMARY KEY (idUser), \
FOREIGN KEY idfk(id) \
REFERENCES users (id) \
ON UPDATE CASCADE \
ON DELETE CASCADE) \
ENGINE = InnoDB;');

console.log('Success: Table Created!');

connection.end();
