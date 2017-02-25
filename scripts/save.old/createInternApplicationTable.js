/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

//CREATES projRef TABLE
process.stdout.write("Create intern application table"+dbConfig.intern_application_table+"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.database + '.' + dbConfig.intern_application_table + ' ( \
    id_fk INT NOT NULL,\
    idProject_fk VARCHAR(64) NULL,\
    project VARCHAR(256) NULL, \
    nameUser VARCHAR(128) NULL, \
    email VARCHAR(64) NULL,\
    major VARCHAR(128) NULL, \
    userSkills VARCHAR(1024) NULL, \
    proficiency VARCHAR(1024) NULL, \
    visaStat ENUM("Y", "N") NULL,\
    resume VARCHAR(256) NULL,\
    appDate DATETIME NULL DEFAULT NOW(), \
CONSTRAINT projRef_foreign_key \
FOREIGN KEY (idProject_fk) \
REFERENCES CMI_internship_data.jobBoard (idProject) \
ON DELETE CASCADE \
ON UPDATE CASCADE) \
ENGINE = InnoDB;');

console.log('Success: Database Created!');

connection.end();
