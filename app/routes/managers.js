//DEPENDENCIES
var mysql = require('mysql');
var connection = require('express-myconnection');

//LOADING DATABASE INFO (TABLE NAMES)
var dbConfig = require('../../config/database.js');
var database = dbConfig.database;

//MANAGERS.JS
module.exports = function(app) {

    //HANDLES MAIN /managers HTTP REQUEST
    //LOADS jobBoard, projRef, userProfile, and events TABLE CONTENT
    app.get('/managers', function (req, res) {
        var jobBoardData = {};
        var listItems = {};
        var projBrief = {};
        var tasks = {};
        var taskItems = {};
        var skills = {};
        var skillItems = {};
        var projRefData = [];
        var userProfileData = {};
        var eventsData = {};
        req.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.job_board_table+"; " +
                "SELECT * FROM "+database+"."+dbConfig.intern_application_table+"; " +
                "SELECT * FROM "+database+"."+dbConfig.intern_profile_table+"; " +
                "SELECT * FROM "+database+"."+dbConfig.events_table+"; ", function (err, result) {
                    if (err) {
                        console.log('error selecting %s ', err);
                    } else {
                        jobBoardData = result[0];
                        projRefData = result[1];
                        userProfileData = result[2];
                        eventsData = result[3];
                        console.log(projRefData);
                        res.render('managers', {
                            title: "Project Manager Dashboard",
                            jobBoardData: jobBoardData,
                            projRefData: projRefData,
                            userProfileData: userProfileData,
                            eventsData: eventsData
                        });
                    }
                });
        });
    });

    //HANDLES /myProjects HTTP REQUEST INITIATED BY THE "Filter Projects" OPTION
    app.post('/managers/myProjects', function (req, res) {
        var jobBoardData = {};
        var jobID = {};
        var listItems = {};
        var projBrief = {};
        var tasks = {};
        var taskItems = {};
        var skills = {};
        var skillItems = {};
        var projRefData = {};
        var userProfileData = {};
        var calendarData = {};
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            var projFilter = input.filterManager;
            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.job_board_table+" WHERE projManager = ?; " +
                "SELECT * FROM "+database+"."+dbConfig.intern_application_table+"; " +
                "SELECT * FROM "+database+"."+dbConfig.intern_profile_table+"; " +
                "SELECT * FROM "+database+"."+dbConfig.events_table+"; ", projFilter, function (err, result) {
                    if (err) {
                        console.log('error selecting %s ', err);
                    } else {
                        jobBoardData = result[0];
                        projRefData = result[1];
                        userProfileData = result[2];
                        calendarData = result[3];
                        res.render('myProjects', {
                            title: "Project Manager Dashboard",
                            jobBoardData: jobBoardData,
                            projRefData: projRefData,
                            userProfileData: userProfileData,
                            calendarData: calendarData
                        });
                    }
                });
        });
    });

    //CREATES A NEW jobBoard RECORD INITIATED BY FILLING OUT "New Project" FORM
    app.post('/managers/jobData', function (req, res) {
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            var data = {
                idProject: input.idProject,
                projTitle: input.projTitle,
                projManager: input.projManager,
                projDescription: input.projDescription,
                projBrief: input.projBrief,
                duties: input.duties,
                tasks: input.tasks,
                eduExp: input.eduExp,
                skills: input.skills
            };
            var query = connection.query("INSERT INTO "+database+"."+dbConfig.job_board_table+" set ?", data, function (err, result) {

                if (err)
                    console.log("Error inserting : %s ", err);
                console.log(query.sql);
                console.log(result);
                res.redirect('../managers/');

            });
        });
    });

    // CREATES A NEW events RECORD INITIATED BY FILLING OUT "New Event" FORM
    app.post('/managers/eventData', function(req, res) {
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function(err, connection) {
            var data = {
                eventTitle: input.eventTitle,
                eventLocation: input.eventLocation,
                eventDate: input.eventDate,
                startTime: input.startTime,
                endTime: input.endTime
            };
            connection.query("INSERT INTO "+database+"."+dbConfig.events_table+" SET ?", data, function(err, rows) {
                if(err) throw err;
                else{
                    res.redirect('../managers/');
                }
            })
        })
    });

    // HANDLES /projView HTTP REQUEST AND SELECTS ALL APPLICATIONS FOR THE CORRESPONDING POSITION
    app.get('/managers/projView/', function (req, res) {

        var idNum = req.query.jobID;
        console.log(idNum);
        var jobId = 'P-000' + idNum;
        var jobBoardData = {};
        var projRefData = {};
        var listItems = [];
        var taskItems = [];
        var project =  {};
        req.getConnection(function (err, connection) {
            var query = connection.query(
                "SELECT * FROM "+database+"."+dbConfig.job_board_table+" WHERE idProject = ?;" +
                "SELECT * FROM "+database+"."+dbConfig.intern_application_table+" WHERE idProject_fk = ?;", [jobId, jobId], function (err, rows) {
                    if (err) {
                        console.log('error selecting %s ', err);
                    } else {
                         jobBoardData = rows[0];
                         projRefData = rows[1];
                        project = jobBoardData.projTitle;
                        res.render('projView', {
                            title: "View Project",
                            jobBoardData: jobBoardData,
                            jobId: jobId,
                            projRefData: projRefData,
                            project: project
                        });
                    }
                });
            console.log(query.sql);
        });
    });

    //ALLOWS MANAGER TO CLICK ON THE LINK TO THEIR RESUME AND DIRECTS THEM TO THE CORRESPONDING FILE
    app.get('/managers/uploads/', function(req, res) {
        var file = req.query.fileName;
        res.sendfile(path.resolve('app/routes/uploads/'+file));
    });

    //HANDLES /applicantProfile HTTP REQUEST INITITED BY CLICKING THE "View" LINK IN THE APPLICANTS TABLE
    app.get('/applicantProfile/', function(req, res) {
        var userId = req.query.userId;
        var projId = req.query.projId;

        console.log("projId = " + projId);
        var userData = {};
        var skillSet = {};
        var profSet = {};
        var skillData = {};

        req.getConnection(function(err, connection) {
            var query = connection.query(
                "SELECT * FROM "+database+"."+dbConfig.intern_application_table+" WHERE id_fk = ?;" +
                "SELECT * FROM "+database+"."+dbConfig.intern_profile_table+" WHERE id_fk = ?;", [userId, userId], function(err, rows) {
                    if(err) throw err;
                    else {
                        skillData = rows[0][0];
                        userData = rows[1][0];
                        profSet = skillData.proficiency.split(',');
                        skillSet = skillData.userSkills.split(' | ');

                        console.log("Skill Data: " + JSON.stringify(rows[0][0]));
                        console.log("skill item : " + skillSet[0]);

                        res.render('profile',{
                            title: 'Applicant Profile',
                            idProj : projId,
                            userData: userData,
                            profSet: profSet,
                            skillSet: skillSet
                        });
                    }
                }
            );
            console.log("applicantProfile : " + query.sql);
        })
    });

    //RENDERS THE projEdit EJS FORM WITH THE CURRENT jobBoard DATA THAT WILL BE EDITED
    app.get('/managers/projEdit/', function (req, res){
        var idNum = req.query.jobID;
        console.log(idNum);
        var jobId = 'P-000' + idNum;
        var jobBoardData = {};
        req.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.job_board_table+" WHERE idProject = ?;", [jobId], function (err, result) {
                    if (err) {
                        console.log('error selecting %s ', err);
                    } else {
                        jobBoardData = result[0];
                        res.render('projEdit', {
                            title: "Edit Project",
                            jobBoardData: jobBoardData,
                            jobId: jobId
                        });
                        console.log(jobBoardData);
                    }
                }
            );
        });
    });

    //SAVES THE CHANGES MADE TO THE jobBoard INFORMATION THAT APPEARS ON THE INTERN SITE
    app.post('/managers/projSave', function(req, res) {
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            var jobId = input.idProject;
            var data = {
                projTitle: input.projTitle,
                projManager: input.projManager,
                projDescription: input.projDescription,
                projBrief: input.projBrief,
                duties: input.duties,
                tasks: input.tasks,
                eduExp: input.eduExp,
                skills: input.skills
            };

            var query = connection.query("UPDATE "+database+"."+dbConfig.job_board_table+" set ? WHERE idProject = ? ",[data,jobId], function(err, result)
            {

                if (err)
                    console.log("Error Updating : %s ",err );

                console.log(query.sql);
                res.redirect('../managers/');
            });
        });
    });

    //HANDLES /projDelete HTTP REQUEST AND DELETES ALL PROJECT INFO
    app.get('/managers/projDelete/', function(req, res) {
        var idNum = req.query.jobID;
        console.log(idNum);
        var jobId = 'P-000' + idNum;
        req.getConnection(function (err, connection) {
            connection.query("DELETE FROM "+database+"."+dbConfig.job_board_table+" WHERE idProject = ? ", [jobId], function (err, result) {
                if (err)
                    console.log("Error deleting : %s ", err);
                res.redirect('../managers/');
            });
        });
    });

    //RENDERS THE eventEdit EJS FORM WITH THE CURRENT events DATA THAT WILL BE EDITED
    app.get('/managers/eventEdit/', function (req, res){
        var idNum = req.query.eventID;
        console.log(idNum);
        var eventData = {};
        req.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.events_table+" WHERE idEvent = ?;", [idNum], function (err, result) {
                    if (err) {
                        console.log('error selecting %s ', err);
                    } else {
                        eventData = result[0];
                        res.render('eventEdit', {
                            title: "Edit Event",
                            eventData: eventData,
                            eventId: idNum
                        });
                    }
                }
            );
        });
    });
    //SAVES THE CHANGES MADE TO THE EVENTS INFORMATION THAT APPEARS ON THE INTERN SITE
    app.post('/managers/eventSave', function(req, res) {
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            var eventId = input.idEvent;
            var data = {
                eventTitle: input.eventTitle,
                eventLocation: input.eventLocation,
                eventDate: input.eventDate,
                startTime: input.startTime,
                endTime: input.endTime
            }

            var query = connection.query("UPDATE "+database+"."+dbConfig.events_table+" set ? WHERE idEvent = ? ",[data,eventId], function(err, result)
            {

                if (err)
                    console.log("Error Updating : %s ",err );

                console.log(query.sql);
                res.redirect('../managers/');
            });
        });
    });

    //HANDLES /eventDelete HTTP REQUEST AND DELETES INFO OF CORRESPONDING events DATA
    app.get('/managers/eventDelete/', function(req, res) {
        var idNum = req.query.eventID;
        console.log(idNum);
        req.getConnection(function (err, connection) {
            connection.query("DELETE FROM "+database+"."+dbConfig.events_table+" WHERE idEvent = ? ", [idNum], function (err, result) {
                if (err)
                    console.log("Error deleting : %s ", err);
                res.redirect('../managers/');
            });
        });
    });

    // HANDLES /deleteApplication HTTP REQUEST AND REMOVES THE SPECIFIED projRef RECORD FROM THE APPLICATIONS TABLE
    app.get('/deleteApplication/', function(req, res) {
        var userId = req.query.userId;
        var jobId = req.query.jobId;
        req.getConnection(function (err, connection) {
            connection.query("DELETE FROM "+database+"."+dbConfig.intern_application_table+" WHERE id_fk = ? AND idProject_fk = ?", [userId, jobId], function(err, result) {
                if(err) throw (err);
                else {
                    res.redirect('../managers/');
                }
            })
        })
    })
};
