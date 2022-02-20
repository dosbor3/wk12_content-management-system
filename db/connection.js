const mysql = require("mysql2");

// Connect application to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',      
      password: 'password2',
      database: 'employee_info'
    },
    console.log('Connected to the employee_info database.')
  );

  module.exports = db;