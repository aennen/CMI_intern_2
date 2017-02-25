/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

//CREATES events TABLE
process.stdout.write("Create events table"+dbConfig.events_table +"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.database + '.' + dbConfig.events_table + ' ( \
    idEvent INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    eventTitle VARCHAR(64) NULL, \
    eventLocation VARCHAR(64) NULL, \
    eventDate VARCHAR(64) NULL, \
    startTime VARCHAR(64) NULL, \
    endTime VARCHAR(64) NULL, \
    eventUrl VARCHAR(256) NULL, \
    PRIMARY KEY (idEvent), \
    UNIQUE INDEX idEvent_UNIQUE (idEvent ASC))\
    ENGINE = InnoDB;');

//INSERTS SAMPLE DATA INTO THE events TABLE
process.stdout.write("Inert Events table"+dbConfig.events_table +"\n");
connection.query('\
INSERT INTO ' + dbConfig.database + '.' + dbConfig.events_table + '(eventTitle, eventLocation, eventDate, startTime, endTime, eventUrl) VALUES \
( "University of Illinois Engineering Career Fair", "Champaign, IL", "08/09/2016", "12:00pm", "6:00pm", NULL), \
( "Bradley University", "Peoria, IL", "09/15/2016", "11:00am", "3:00pm", NULL), \
( "Southern Illinois University", "Carbondale, IL", "09/28/2016", "10:00am", "2:00pm", NULL), \
( "Southern Illinois University STEM Career Fair", "Carbondale, IL", "10/04/2016", "10:00am", "2:00pm", NULL), \
( "Illinois State University Career Fair", "Bloomington, IL", "10/13/2016", "4:00pm", "7:00pm", NULL), \
( "University of Illinois Fall Career & Internship Fair", "Champaign, IL", "10/26/2016", "12:00pm", "4:00pm", NULL);');

console.log('Success: Database Created!');

connection.end();
