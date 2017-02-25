//LOADING DEPENDENCIES
var mysql = require('mysql');
var connection = require('express-myconnection');
var browser    = require('detect-browser');
var path = require('path');
var fs = require('fs');
//DATABASE INFORMATION (TABLE NAMES)
var dbConfig = require('../../config/database.js');
var database = dbConfig.database;

//INDEX.JS
module.exports = function(app, passport) {

    // HANDLES /home HTTP REQUEST
    app.get('/home', function(req, res) {
        var mediaObjectsWelcomeData = {};
        var mediaObjectsOverviewData = {};
        var mediaObjectsPastInternData = {};
        var jobBoardData = {};
        var eventsData = {};
        var listItems = {};
        var projBrief = {};
        var tasks = {};
        var taskItems = {};
        var contactData = {};
        var userData = {};
        var projRefData = {};
        var skillsData = {};
        var skillValues = {};
        var appFolderData = [];
        var splitSkills = [];
        var splitSkillValues = [];
        var display1;
        var display2;
        var insertData = {
            id_fk: req.user.id,
            email: req.user.username
        };

        console.log("Browser name : ", browser.name + " : " + browser.version);
        console.log("DBCALL : /home " + req);

        req.getConnection(function(err, connection) {
            // LOOKS UP userProfile RECORD AND CREATES ONE IF NOT PRE-EXISTING

            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.intern_profile_table+" WHERE id_fk = ?;", req.user.id, function(err, rows) {
                    if (err) throw err;
                    if(!rows.length) {
                        connection.query(
                            "INSERT INTO "+database+"."+dbConfig.intern_profile_table+" SET ?;", [insertData], function(err, rows) {
                                if(err) throw err;
                                else{
                                    console.log("record added to userProfile");
                                }
                            }
                        );
                    }
            });
            //LOGS userProfile RECORD INFORMATION TO userData OBJECT
            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.intern_profile_table+" WHERE id_fk = ?;",req.user.id, function (err, result) {
                    if (err) {
                        console.log('error selecting %s ', err);
                    } else {
                        userData = result[0];
                    }
            });
            //LOOKS UP CORRESPONDING projRef RECORD AND LOGS INFO TO OBJECTS USED IN THE My Applications PORTION OF THE SITE
            connection.query(

                //"SELECT * FROM "+database+"."+dbConfig.intern_application_table+" WHERE id_fk = ? AND proficiency IS NULL;", req.user.id , function (err, rows) {

                "SELECT * FROM "+database+"."+dbConfig.intern_application_table+" WHERE id_fk = ?;", req.user.id , function (err, rows) {

                    if(err) throw err;
                    if(!rows.length) {
                        console.log('no current applications')
                    }
                    else {
                        for (var i = 0; i < rows.length; i++) {
                                projRefData = rows[i];
                                appFolderData[i] = projRefData;
                                skillsData = appFolderData[i].userSkills;
                                splitSkills[i] = skillsData.split(' | ');
                                skillValues = appFolderData[i].proficiency;
                                splitSkillValues[i] = skillValues.split(',');
                            //console.log("proj ref = " + projRefData.idProject_fk);
                                }
                        }

            });

            //LOADS STATIC DATABASE CONTENT (mediaObjects, jobBoard, events, and contacts) AND RENDERS /home WITH ALL PREVIOUSLY QUERIED DATA
            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.media_objects_table+" WHERE idPage='Welcome'; " +
                "SELECT * FROM "+database+"."+dbConfig.media_objects_table+" WHERE idPage='Overview'; " +
                "SELECT * FROM "+database+"."+dbConfig.media_objects_table+" WHERE idPage='Past Interns'; " +
                "SELECT * FROM "+database+"."+dbConfig.job_board_table+"; " +
                "SELECT * FROM "+database+"."+dbConfig.events_table+"; " +
                "SELECT * FROM "+database+"."+dbConfig.contacts_table+"; ", function(err, result) {
                    if(err) {
                        console.log('error selecting %s ', err);
                    } else {
                        mediaObjectsWelcomeData = result[0];
                        mediaObjectsOverviewData = result[1];
                        mediaObjectsPastInternData = result[2];
                        jobBoardData = result[3];
                        eventsData = result[4];
                        contactData = result[5];
                        res.render('home', {
                            title:"Amdocs Internships",
                            mediaObjectsWelcomeData: mediaObjectsWelcomeData,
                            mediaObjectsOverviewData: mediaObjectsOverviewData,
                            mediaObjectsPastInternData: mediaObjectsPastInternData,
                            jobBoardData: jobBoardData,
                            eventsData: eventsData,
                            contactData: contactData,
                            userData: userData,
                            appFolderData: appFolderData,
                            splitSkills: splitSkills,
                            splitSkillValues: splitSkillValues
                        });
                    }
            });

        });

    });

    //TRANSFERS THE SKILLS INFO FROM THE jobBoard TABLE TO THE projRef RECORD UPON CLICKING "Apply"
    app.post('/myFolder', function(req, res) {
        var input = JSON.parse(JSON.stringify(req.body));
        var projName = {};
        var skillItems = {};
        var nameUser = {};
        var visaStat = {};
        var userMajor = {};
        var userResume = {};

        console.log("DBCALL : /myFolder " + req.body.idProject_fk);

        req.getConnection(function (err, connection) {
            if (err) throw err;
            else {
                connection.query("SELECT * FROM "+database+"."+dbConfig.job_board_table+" WHERE idProject = ?;", input.idProject_fk, function(err, result) {
                    if (err) throw err;
                    else {
                        projName = result[0].projTitle;
                        skillItems = result[0].skills;

                        var skillTemp = skillItems;
                        var skillList = skillTemp.split(' | ');
                        var skillProf = "";
                        for (var j = 0; j < skillList.length; j++) {
                            skillProf += "0,";
                        }
                        skillProf = skillProf.replace(/,\s*$/, "");

                        //console.log("Number of Skills : " + skillProf);

                        connection.query("SELECT * FROM "+database+"."+dbConfig.intern_profile_table+" WHERE id_fk = ?;", req.user.id, function(err, result) {
                            if(err) throw err;
                            else {
                                nameUser = result[0].nameFirst+' '+result[0].nameLast;
                                visaStat = result[0].usAuth;
                                userMajor = result[0].major;
                                userResume = result[0].resLink;
                                var data = {
                                    id_fk: req.user.id,
                                    idProject_fk: input.idProject_fk,
                                    project:projName,
                                    nameUser: nameUser,
                                    email: req.user.username,
                                    visaStat: visaStat,
                                    major: userMajor,
                                    resume: userResume,
                                    userSkills: skillItems,
                                    proficiency:skillProf
                                };

                                console.log(data);
                                connection.query("INSERT INTO "+database+"."+dbConfig.intern_application_table+" SET ?;", [data], function(err, result) {

                                    if (err && err.code !== 'ER_DUP_ENTRY') {
                                        throw err;
                                    }
                                    else {
                                        console.log('record successfully added!');
                                        res.redirect('home#t3');

                                    }
                                });
                            }
                        });

                    }
                });

            }
        });
    });

    //DELETES A SPECIFIC projRef RECORD UPON CLICKING THE TRASH BUTTON FROM THE My Applications FOLDER
    app.get('/deleteApp/', function(req, res) {
        var jobID = req.query.jobID;
        console.log(jobID);
        req.getConnection(function(err, connection) {
            if(err) throw err;
            else {
                connection.query("DELETE FROM "+database+"."+dbConfig.intern_application_table+" WHERE id_fk = ? AND idProject_fk = ?;", [req.user.id, jobID], function(err, rows) {
                    if(err) throw err;
                    else{
                        console.log('record successfully deleted from projRef table');
                        res.redirect('/home')
                    }
                });
            }
        })
    });

    //UPDATES projRef RECORD AND TRANSFERS THE USER SKILLS PROFICIENCY TO THE MANAGERS PAGE UPON CLICKING "Submit"
    app.post('/submitApp', function(req,res) {
        var input = JSON.parse(JSON.stringify(req.body));
        var projRefData = {};
        var appFolderData = [];
        var splitSkills = [];
        var applicationData = [];
        var jobId = [];
        var skills_map = [];
        var skills = [];

        console.log("DBCALL : " + JSON.stringify(req.body));
        console.log("DBCALL : " + req.body.action);
        //console.log("DBCALL : /submitapp " + req.body.action + " : " + req.body.project + " : " + req.body.userid);
        //console.log("** DBCALL : /submitapp " + req.body.action + " : " + req.body.project[projIdx] + " : " + req.body.userid[projIdx] + " : " + req.body.action.search("deleteapp"));

        req.getConnection(function(err,connection) {
            if(err) throw err;
            else {

                // if the submit is to delete do this else update
                if((typeof req.body.action !== 'undefined') && req.body.action !== '') {
                    if (req.body.action.search("deleteapp") !== -1) {

                        if(Array.isArray(req.body.project) ) {
                            var projTemp = req.body.action;
                            var projSeg = projTemp.split('-');
                            var projIdx = projSeg[1];
                            var projUserid = req.body.userid[projIdx];
                            var projId = req.body.project[projIdx];
                        }
                        else
                        {
                            var projUserid = req.body.userid;
                            var projId = req.body.project;
                        }

                        console.log("Delete " + projIdx + " = " + projUserid + " : " + projId);
                        connection.query("Delete from " + database + "." + dbConfig.intern_application_table + "  WHERE id_fk = ? AND idProject_fk = ? ",
                            [projUserid, projId], function (err, rows) {
                                if (err) throw err;
                                else {
                                    console.log("projRef record sucessfully deleted!");

                                }
                            })
                    }
                }
                else {
                    var projects = req.body.projects;
                    var project_names = Object.keys(projects);

                    for (var i = 0; i < project_names.length; i++) {
                        var skillsData = [];
                        var project_name = project_names[i];
                        console.log("Project Name: " + project_name);
                        skills_map = projects[project_name];
                        skills = Object.keys(skills_map);

                        for (var j = 0; j < skills.length; j++) {
                            var skill = skills[j];
                            console.log("Skill level at " + skill + " is " + skills_map[skill]);
                            skillsData[j] = skills_map[skill];
                        }
                        var skillsJoin = skillsData.join();
                        var dataSet = {
                            proficiency: skillsJoin
                        };
                        console.log(dataSet);
                        connection.query("UPDATE " + database + "." + dbConfig.intern_application_table + " SET ? WHERE id_fk = ? AND project = ?", [dataSet, req.user.id, project_name], function (err, rows) {
                            if (err) throw err;
                            else {
                                console.log("projRef record sucessfully updated!");

                            }
                        })
                    }
                }
                res.redirect('home#t3');
            }
        })
    });

    //ALLOWS THE USER TO CLICK ON THE LINK TO THEIR RESUME AND DIRECTS THEM TO THE CORRESPONDING FILE
    app.get('/uploads/', function(req, res) {
        var file = req.query.fileName;
        res.sendfile(path.resolve('app/routes/uploads/'+file));
    })
};
