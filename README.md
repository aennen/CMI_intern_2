Current version database is ported to MySQL

We will be using Passport to authenticate users locally, 

## Instructions

If you would like to download the code and try it for yourself:

1. Clone the repo: `https://github.com/jamesafrich/CMI_intern.git`
2. Install packages: `npm install`
3. Edit the database configuration: `config/database.js`
4. Create the database schema: `node scripts/create_database.js`
5. Launch: `node server.js`
6. Visit in your browser at: `http://localhost:3000`

## Folder Structure / Contents

/CMI_intern

    /app

        /routes

            /uploads <---- contains the uploaded files of users (resumes, cover letters, etc)

            applicants.js <---- handles applicant specific HTTP requests

            index.js <---- handles main HTTP requests pertaining to /home

            managers.js <----handles HTTP requests located on the /managers page

        auth.js <---- handles the login/signup routes on the landing page and initiates passport authentication

    /config

        database.js <---- stores the names of all tables located in the database (changes made here will be automatically reflected in all dependent files)

        passport.js <---- contains the local authentication strategy used within the web app

    /node_modules <---- contains the node modules installed when 'npm install' command is initiated

    /public <---- holds all of the static content used throughout the site (images, stylesheets, and javascripts) (vendor holds 3rd party files like bootstrap and foundation)

    /scripts

        create_database.js <---- contains all of the SQL scripts and connections to get the database up and running when 'node scripts/create_database' command is initiated

    /views <---- holds the various EJS templates that are rendered with retrieved data from the /routes directory

    package.json <---- lists the various dependencies of the web app

    server.js <---- sets up express application, configures/initializes passport, and loads routes passing in app and passport
