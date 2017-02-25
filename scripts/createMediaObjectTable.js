/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbConfig = require('../config/database');

var connection = mysql.createConnection(dbConfig.connection);

// CREATES mediaObjects TABLE
process.stdout.write("Create object table "+ dbConfig.media_objects_table +"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.database + '.' + dbConfig.media_objects_table + ' ( \
    idMedia INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    idPage VARCHAR(64) NOT NULL,\
    idObject INT NOT NULL,\
    mediaTitle VARCHAR(64) NULL,\
    mediaText VARCHAR(4000) NULL,\
    PRIMARY KEY (idMedia),\
    UNIQUE INDEX idMedia_UNIQUE (idMedia ASC))\
ENGINE = InnoDB;');

// INSERTS SAMPLE DATA INTO THE mediaObjects TABLE
process.stdout.write("Insert mediaObjects table "+ dbConfig.media_objects_table +"\n");
connection.query('\
INSERT INTO ' + dbConfig.database + '.' + dbConfig.media_objects_table + '(idPage, idObject, mediaTitle, mediaText) VALUES \
("Welcome",1,"Welcome to Amdocs","Amdocs is the market leader in customer experience software solutions and services for the world’s largest communications, entertainment and media service providers. For more than 30 years, Amdocs solutions, which include BSS, OSS, network control, optimization and network functions virtualization, coupled with professional and managed services, have accelerated business value for its customers by simplifying business complexity, reducing costs and delivering a world-class customer experience. "), \
("Welcome",2,"Our Mission","Our industry is changing at an accelerated pace. Customer behaviors and business models which were unthinkable 10 years ago are commonplace today. Technology innovations are being adopted at unprecedented scale and speed, particularly by over-the-top (OTT) players. If service providers can’t deliver a great customer experience, their customers will move to a provider who does. So there’s no time to waste. In fact, research shows that digital transformation is a priority for over 80% of service provider executives."),\
("Welcome",3,"Our Customers","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus nibh nec nunc ultricies imperdiet. Morbi non pellentesque est. Nullam at augue ut sapien aliquam pulvinar. Cras molestie ex nec leo faucibus dictum. Aenean lacinia vitae risus nec ullamcorper. Vestibulum id ornare lacus, ac porttitor felis. Mauris vulputate mi et elit ultricies, et lacinia ex pharetra. Sed libero augue, ultricies eu nisl in, vulputate scelerisque mi. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"),\
("Welcome",4,"General Information","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci libero, posuere non felis non, sollicitudin elementum orci. Fusce non augue ac erat pharetra vulputate quis tempus turpis. Vestibulum finibus molestie tempor. Vivamus vitae sapien elit. Etiam lacinia dui non ullamcorper efficitur. Donec ut efficitur tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet libero scelerisque leo finibus, vitae congue sem eleifend."),\
("Overview",1,"Internships at Amdocs","SAMPLE TEXT 5"),\
("Past Interns",1,"Project 1", "PROJECT 1 DESCRIPTION"),\
("Past Interns",2,"Project 2", "PROJECT 2 DESCRIPTION"),\
("Past Interns",3,"Project 3", "PROJECT 3 DESCRIPTION"),\
("Past Interns",4,"Project 4", "PROJECT 4 DESCRIPTION");');

console.log('Success: Table Created!');

connection.end();
