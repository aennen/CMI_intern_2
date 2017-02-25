// server.js

// set up ======================================================================
// get all the tools we need
var express     = require('express');
var session     = require('express-session');
var browser     = require('detect-browser');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var favicon     = require('serve-favicon');
var path        = require('path');
var fs          = require('fs');
var mysql       = require('mysql');
var connection = require('express-myconnection');
var dbConfig   = require('./config/database.js');
var database = dbConfig.database;

var app         = express();
var port        = process.env.PORT || 3000;

var cookieParser = require('cookie-parser');

var passport    = require('passport');
var flash       = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set Env var RUNMODE to some value to run server as a daemon
var runmode = process.env.RUNMODE;

if(runmode !== '' && typeof runmode !== 'undefined') {
	console.log("Running as Daemon " + runmode);
	require('daemon')();
}
else
{
	console.log("Running in Development mode");
}



app.use(express.static(path.join(__dirname, 'public'))); // set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json())

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'amdocsinternshipappsessionsecret',
	resave: true,
	saveUninitialized: true
 } )); // session secret

// Passport ====================================================================
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//open database connection pool ================================================
var dbOptions = {
    host: 'localhost',
    user: 'itrendam',
    password: 'itrendam',
    port: 3306,
    database: 'CMI_internship_data',
    multipleStatements: true,
    connectionLimit: 20
};

app.use(connection(mysql, dbOptions, 'request'));


process.on('uncaughtException', function(err)  {
    console.log('Whoops there is an uncaught error ' + err.stack);
    //process.exit(1);
    app.use(connection(mysql, dbOptions, 'request'));
    return;
});

app.locals.myvar = "Alan";

// routes ======================================================================
require('./app/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/index.js')(app, passport);
require('./app/routes/applicants.js')(app, passport);
require('./app/routes/managers.js')(app);

// launch ======================================================================
app.listen(port);
console.log('Listening on port ' + port);
