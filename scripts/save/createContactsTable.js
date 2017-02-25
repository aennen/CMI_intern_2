/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

//CREATES contacts TABLE
process.stdout.write("Create contacts table"+dbConfig.contacts_table +"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.database + '.' + dbConfig.contacts_table + ' ( \
    idContact INT NOT NULL, \
    nameFirst VARCHAR(64) NULL, \
    nameLast VARCHAR(64) NULL, \
    email VARCHAR(64) NULL, \
    phone VARCHAR(24) NULL, \
    jobTitle VARCHAR(64) NULL, \
    image VARCHAR(256) NULL, \
    PRIMARY KEY (idContact), \
    UNIQUE INDEX idContact_UNIQUE (idContact ASC))\
    ENGINE = InnoDB;');

//INSERTS SAMPLE DATA INTO THE contacts TABLE
process.stdout.write("Insert contacts table"+dbConfig.contacts_table +"\n");
connection.query('\
INSERT INTO ' + dbConfig.database + '.' + dbConfig.contacts_table + ' VALUES \
(1, "Amanda", "Ressel", "internships@amdocs.com", "(217) 353 - 7520", "Program Administrator", NULL);');

console.log('Success: Database Created!');

connection.end();
