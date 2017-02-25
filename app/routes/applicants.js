//DEPENDENCIES
var mysql = require('mysql');
var connection = require('express-myconnection');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

//DATABASE INFORMATION (TABLE NAMES)
var dbConfig = require('../../config/database.js');
var database = dbConfig.database;

//APPLICANTS.JS ROUTE
module.exports = function(app, passport) {

    //NEW APPLICANT REQUEST
    app.get('/newApplicant', function(req, res) {
       var sessionEmail = {};
       var userData = {
           id_fk:req.user.id
       };
       req.getConnection(function(err, connection) {
           connection.query(
               "SELECT email FROM "+database+"."+dbConfig.intern_profile_table+" WHERE id_fk = ?", userData.id_fk, function(err, rows) {
                   if (err) throw err;
                   else {
                       sessionEmail = rows[0].email;
                       console.log(sessionEmail);
                       res.render('newApplicant', {userEmail:sessionEmail});
                   }
               }
           )
       })
    });

    //POSTING userData THAT IS INSERTED INTO THE userProfile TABLE
    app.post('/userData', function (req, res) {
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            var data = {
                nameFirst: input.nameFirst,
                nameLast: input.nameLast,
                address: input.address,
                city: input.city,
                stateCode: input.stateCode,
                zip: input.zip,
                phone: input.phone,
                usVet: input.usVet,
                usAuth: input.usAuth,
                industryPref: input.industryPref,
                langSkills: input.langSkills,
                school: input.school,
                degree: input.degree,
                major:input.major,
                interest:input.interest,
                gradDate: input.gradDate
            };
            connection.query("UPDATE "+database+"."+dbConfig.intern_profile_table+" set ? WHERE id_fk = ?",[data,req.user.id], function (err, result) {
                if (err) throw err;
                res.redirect('home');

            });
        });
    });

    // myProfile REQUEST
    app.get('/myProfile', function(req,res) {
        var userData =  {};
        req.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM "+database+"."+dbCOnfig.intern_profile_table+" WHERE id_fk = ?;",req.user.id, function (err, result) {
                    if (err) {
                        console.log('error selecting %s ', err);
                    } else {
                        userData = result[0];
                        res.render('profile', {
                            title: "My Profile",
                            userData: userData
                        });
                    }
                }
            );
        });
    });

    //HANDLING THE editProfile REQUEST
    app.get('/editProfile', function(req, res) {
        var userData = {};
        req.getConnection(function (err, connection) {
            connection.query(
                "SELECT * FROM "+database+"."+dbConfig.intern_profile_table+" WHERE id_fk = ?", req.user.id, function (err, result) {
                    if (err) throw err;
                    else {
                        userData = result[0];
                        res.render('editProfile', {
                            title: "Edit User Profile",
                            userData: userData
                        });
                    }
                });
        });
    });

    //POSTING editUser DATA USED TO UPDATE THE EXISTING userProfile RECORD
    app.post('/editUser', function(req, res) {
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {
            if (err) throw err;
            else {
                var data = {
                    nameFirst: input.nameFirst,
                    nameLast: input.nameLast,
                    address: input.address,
                    city: input.city,
                    stateCode: input.stateCode,
                    zip: input.zip,
                    phone: input.phone,
                    usVet: input.usVet,
                    usAuth: input.usAuth,
                    industryPref: input.industryPref,
                    langSkills: input.langSkills,
                    school: input.school,
                    degree: input.degree,
                    major: input.major,
                    interest: input.interest,
                    gradDate: input.gradDate
                };
                connection.query("UPDATE "+database+"."+dbConfig.intern_profile_table+" set ? WHERE id_fk = ?", [data, req.user.id], function (err, result) {
                    if (err) throw err;
                    res.redirect('home');
                });
            }
        });
    });

    // HANDLES FILE UPLOAD REQUESTS
    app.post('/upload', function(req, res){

        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, 'uploads');

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            var data = {
                resLink:file.name
            };
            req.getConnection(function(err, connection){
                connection.query("UPDATE "+database+"."+dbConfig.intern_profile_table+" set ? WHERE id_fk = ?",[data,req.user.id], function (err, result) {
                    if(err) throw err;
                    });
            });
        });


        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);

    });

}
