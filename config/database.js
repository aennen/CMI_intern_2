// config/database.js
module.exports = {
    'connection': {
        'host': 'localhost',
        'user': 'itrendam',
        'port' : 3306,
        'password': 'itrendam',
        'multipleStatements': true,
        'connectionLimit': 100,
        'wait_timeout': 30
    },
	'database': 'CMI_internship_data',
    'users_table': 'users',
    'media_objects_table':'mediaObjects',
    'login_info_table':'infoLogin',
    'intern_profile_table':'userProfile',
    'job_board_table':'jobBoard',
    'intern_application_table':'projRef',
    'events_table':'events',
    'interviews_table':'interviews',
    'contacts_table':'contacts'
};
