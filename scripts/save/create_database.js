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

process.stdin.on('data:', function(text) { });

// CREATES users TABLE
process.stdout.write("Create users table " + dbConfig.users_table + "\n");
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbConfig.database + '`.`' + dbConfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(128) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC), \
)');

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
process.stdout.write("Create users table "+ dbConfig.media_objects_table +"\n");
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

// CREATES userProfile TABLE
process.stdout.write("Create profile table"+ dbConfig.intern_profile_table +"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.database + '.' + dbConfig.intern_profile_table + ' ( \
   idUser INT NOT NULL AUTO_INCREMENT,\
    id_fk INT UNSIGNED NOT NULL,\
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
CONSTRAINT userProfile_foreign_key \
FOREIGN KEY (id_fk) \
REFERENCES CMI_internship_data.users (id) \
ON DELETE CASCADE \
ON UPDATE CASCADE) \
ENGINE = InnoDB;');


//CREATES jobBoard TABLE
process.stdout.write("Create users table"+dbConfig.job_board_table+"\n");
connection.query('\
CREATE TABLE IF NOT EXISTS ' + dbConfig.database + '.' + dbConfig.job_board_table + ' ( \
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

//INSERTS SAMPLE DATA INTO THE jobBoard TABLE
process.stdout.write("Insert Job board Data"+dbConfig.job_board_table+"\n");
connection.query('\
INSERT INTO ' + dbConfig.database + '.' + dbConfig.job_board_table + ' VALUES \
("P-0001", \
"Audio/Video Technician", \
    "Tony Marion", \
    "Develop a knowledge library of videos and short courses for Infra/IT specific items for GiTech:", \
    "Build overall knowledge sharing strategy | Work with technical leads to identify content to produce | Work with technical leads to identify experts to host sessions | Research best audio/video methods for capturing sessions | Edit, Publish, and share content produced. ", \
    "To be assigned a mentor that will oversee the project and provide advice and direction as required.  To write a brief weekly status detailing major project milestones, risks, and open issues.", \
    "Help build a plan to achieve the project requirements and success will be measured based on the ability to deliver a working video library with useful content. | Team work and individual contribution will be required | Coordination with multiple teams onshore and offshore will be required | Research and selection of best tools to meet goals from audio/video to hosting, searching, and presenting content. | Interviewing group leads to understand gaps in knowledge | Interviewing specialists to outline content for production | Schedule sessions to record content with specialists | Editing audio/video | Developing a social strategy to get others to consume and share content | Producing documentation for end to end process", \
    "Studying for Computer Science degree and have taken enough courses to cover the basic requirements. Excellent communication skills, both written and verbal.", \
    "Communication | Organization | Planning | Programming"), \
("P-0002", \
    "Mobile App Development", \
    "Alan Ennen", \
    "Assist in developing new functionality for a mobile application, the successful candidate will combine existing skills with new skills learned for project with the support of our software professionals currently working on project. The completed project will extend current functionality and enhanced style for the mobile application base line. This project will provide you with valuable software industry experience as you are exposed to activities, needs and practices of an enterprise-class, multi-national software company with offices in Champaign", \
    "Design and deliver hybrid mobile application functions. | Application presents key business information to clients and company staff. ", \
    "To be assigned to a mentoring team that will oversee a variety of design and development tasks. To write a brief weekly status detailing activities and anything else relevant to the mentoring team.", \
    "The tasks will be tailored to the candidates skill set, interests and availability (which will vary depending on term time or vacation time). | The task will be well defined and may or may not involve team work. | Research and selection of best tools to meet goals. | Design and develop rules engine and data repository. | Designing the overall appearance and function | Producing some of the project software’s documentation and installation details ", \
    "Studying for Computer Science degree and have taken enough courses to cover the basic requirements. Excellent communication skills, both written and verbal.", \
    "Development IDE | C/C++ | Java | HTML5 | CSS3"), \
("P-0003", \
    "Operations Dashboard", \
    "Rakesh Hemrajani", \
    "Develop a site wide mobile/tablet based dashboard:", \
    "Design a GUI which supports multiple clients | The dashboard should be able to incorporate data from the existing tools (Production heads up / AMC / DB). | Send notifications to the users in case of crisis | Ability to create different user profiles and restrict the data-view to 3rd parties.", "Design a GUI which supports multiple clients | The dashboard should be able to incorporate data from the existing tools (Production heads up / AMC / DB). | Send notifications to the users in case of crisis | Ability to create different user profiles and restrict the data-view to 3rd parties." \
    "Should be able to work independently with multiple teams / individuals and develop the operations dashboard", \
    "The tasks will be tailored to the candidates skill set, interests and availability (which will vary depending on term time or vacation time). | The task will be well defined and may or may not involve team work. | Research and selection of best tools to meet goals. | Design and develop rules engine and data repository.  Designing the overall appearance and function | Producing some of the project software’s documentation and installation details ", \
    "Studying for Computer Science degree and have taken enough courses to cover the basic requirements. Excellent communication skills, both written and verbal.", \
    "Mobile App Development | HTML5 | CSS3 | Java | SQL"), \
("P-0004", \
    "Testing / Automation", \
    "Jay Schubert", \
    "To develop an automated set of software tests for amdocs API applications using in-house tool Ginger.", \
    "Learn how our customers use amdocs API applications. | Design the solution to run the activities involved using automation. | Develop the solution using our in-house automation tool, Ginger. | The solution should be configurable and reusable in different situations.", \
    "To be assigned to a mentoring team that will oversee a variety of design and development tasks. To write a brief weekly status detailing activities and anything else relevant to the mentoring team.", \
    "The tasks will be tailored to the candidates skill set, interests and availability (which will vary depending on term time or vacation time). | The task will be well defined and may or may not involve team work. | Automate the routine software testing activities in amdocs API product. | Develop automation of tests for to be used daily in live business critical environments. | Produce project software documentation and installation details.", \
    "Studying for Computer Science degree and have taken enough courses to cover the basic requirements. Excellent communication skills, both written and verbal.", \
    "Programming (General) | Relational Databases | UNIX - Linux | XML");');

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
