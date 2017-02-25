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

// trigger is needed to automatically set the appDate date on insert for mysql version 5.1
process.stdout.write("Create trigger for appDAte for " + dbConfig.intern_application_table + "\n");
connection.query('create trigger intern_trig before insert on '+ dbConfig.intern_application_table +' for each row set new.appDate = now()');


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
    "The tasks will be tailored to the candidates skill set, interests and availability (which will vary depending on term time or vacation time). | The task will be well defined and may or may not involve team work. | Research and selection of best tools to meet goals. | Design and develop rules engine and data repository. | Designing the overall appearance and function | Producing some of the project softwareÀ documentation and installation details ", \
    "Studying for Computer Science degree and have taken enough courses to cover the basic requirements. Excellent communication skills, both written and verbal.", \
    "Development IDE | C/C++ | Java | HTML5 | CSS3"), \
("P-0003", \
    "Operations Dashboard", \
    "Rakesh Hemrajani", \
    "Develop a site wide mobile/tablet based dashboard:", \
    "Design a GUI which supports multiple clients | The dashboard should be able to incorporate data from the existing tools (Production heads up / AMC / DB). | Send notifications to the users in case of crisis | Ability to create different user profiles and restrict the data-view to 3rd parties.", "Design a GUI which supports multiple clients | The dashboard should be able to incorporate data from the existing tools (Production heads up / AMC / DB). | Send notifications to the users in case of crisis | Ability to create different user profiles and restrict the data-view to 3rd parties." \
    "Should be able to work independently with multiple teams / individuals and develop the operations dashboard", \
    "The tasks will be tailored to the candidates skill set, interests and availability (which will vary depending on term time or vacation time). | The task will be well defined and may or may not involve team work. | Research and selection of best tools to meet goals. | Design and develop rules engine and data repository.  Designing the overall appearance and function | Producing some of the project softwareÀ documentation and installation details ", \
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


console.log('Success: job board & intern Application tables Created!');

connection.end();
