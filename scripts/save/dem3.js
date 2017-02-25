/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

connection.query('USE ' + dbConfig.database, function(err,rows) { if(err) throw err; });

//CREATES jobBoard TABLE
process.stdout.write("Create users table"+dbConfig.job_board_table+"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.job_board_table + ' ( \
    idProject VARCHAR(64) NOT NULL, \
    projTitle VARCHAR(64) NOT NULL, \
    projManager VARCHAR(64) NOT NULL, \
    projDescription VARCHAR(4000) NULL, \
    projBrief VARCHAR(4000) NULL, \
    duties VARCHAR(4000) NULL, \
    tasks VARCHAR(4000) NULL, \
    eduExp VARCHAR(2000) NULL, \
    skills VARCHAR(2000) NULL, \
    PRIMARY KEY (idProject), \
    UNIQUE INDEX idProject_UNIQUE (idProject ASC)) \
    ENGINE = InnoDB;');


//CREATES projRef TABLE
process.stdout.write("Create intern application table"+dbConfig.intern_application_table+"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.intern_application_table + ' ( \
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
    appDate DATETIME NULL , \
CONSTRAINT projRef_foreign_key \
FOREIGN KEY (idProject_fk) \
REFERENCES CMI_internship_data.jobBoard (idProject) \
ON DELETE CASCADE \
ON UPDATE CASCADE) \
ENGINE = InnoDB;');

connection.query('create trigger intern_trig before insert on '+ dbConfig.intern_application_table +' for each row set new.appDate = now()');

console.log('Success: job board & intern Application tables Created!');

connection.end();
