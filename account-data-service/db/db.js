
const sql = require('mssql');

const config = {
    user: 'srushti',
    password: 'SrushtiR@02',
  server: 'localhost',               // or 'localhost\\SQLEXPRESS' for named instance
  database: 'HealthCare',
  port: 1433,
  options: {
    encrypt: true,              
    trustServerCertificate: true,
  }
};



module.exports = {
  config
};

