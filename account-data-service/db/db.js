
const sql = require('mssql');

const config = {
    user: 'srushti',
    password: 'SrushtiR@02',
  server: 'localhost',               // or 'localhost\\SQLEXPRESS' for named instance
  database: 'HealthCare',
  port: 1433,
  options: {
    encrypt: true,                  // Use false if local DB without SSL
    trustServerCertificate: true,// Required for self-signed certs
  }
};



module.exports = {
  config
};

