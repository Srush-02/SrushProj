
// import sql from 'mssql';
// import express from 'express';
// import  {config} from './db/db.js';
const cors = require('cors');
const express = require('express');
const sql = require('mssql');
const { config } = require('./db/db');

const app = express();
app.use(cors())
const port = 3000;

app.use(express.json());

app.get('/patient', async(req, res) => {
    try{

        const pool = await sql.connect(config);
        console.log("Connecting to db");
        const result = await pool.request().query('SELECT * FROM patient');
        res.json(result.recordset);
    } catch (err){
    console.error('SQL Error:', err);
    res.status(500).json({ error: 'Database query failed' });
  
    }
});

app.put('/updatePatient', async (req, res) => {
  const { phone_number } = req.params;
  const { first_name, last_name, gender, date_of_birth , patient_email} = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('phone_number', sql.VarChar(20), phone_number)
      .input('first_name', sql.VarChar(100), first_name)
      .input('last_name', sql.VarChar(100), last_name)
      .input('gender', sql.VarChar(10), gender)
      .input('date_of_birth', sql.Date, date_of_birth)
      .input('patient_email', sql.VarChar(20), patient_email)
      .query(`
        UPDATE Patient
        SET first_name = @first_name,
            last_name = @last_name,
            gender = @gender,
            date_of_birth = @date_of_birth,
            patient_email = @patient_email
        WHERE phone_number = @phone_number
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient updated successfully' });
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

//app.delete


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});






