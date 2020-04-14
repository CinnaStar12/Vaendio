

require('dotenv').config();
module.exports = {
  "development": 
  {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": "passport_demo",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "Nuid.2013",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
};