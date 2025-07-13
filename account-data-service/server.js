
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

app.get('/patient', async (req, res) => {
  try {

    const pool = await sql.connect(config);
    console.log("Connecting to db");
    const result = await pool.request().query(`
        SELECT 
          tr.test_id,
          p.phone_number,
          p.first_name,
          p.last_name,
          p.gender,
          FORMAT(p.date_of_birth, 'dd-MM-yyyy') AS date_of_birth,
          p.patient_email,
          tr.test_name,
          tr.test_status,
          FORMAT(tr.appointment_date, 'dd-MM-yyyy') AS appointment_date
        FROM Patient p
      LEFT JOIN TestRecord tr ON p.phone_number = tr.phone_number
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: 'Database query failed' });

  }
});

app.put('/updatePatient/:phone_number', async (req, res) => {
  const { phone_number } = req.params;
  const { first_name, last_name, gender, date_of_birth, patient_email, test_id, test_name, test_status, appointment_date
  } = req.body;

  try {
    const pool = await sql.connect(config);
    console.log({
  test_id,
  phone_number,
  first_name,
  appointment_date,
  date_of_birth
});
    const patientData = await pool.request()
    
    //patient
      .input('first_name', sql.VarChar(100), first_name)
      .input('last_name', sql.VarChar(100), last_name)
      .input('gender', sql.VarChar(10),  gender)
      .input('date_of_birth', sql.Date, date_of_birth)
      .input('patient_email', sql.VarChar(255), patient_email)
      .input('phone_number', sql.VarChar(20), phone_number)
   
      .query(`
        UPDATE patient
           SET first_name = @first_name,
               last_name = @last_name,
               gender = @gender,
               date_of_birth = @date_of_birth,
               patient_email= @patient_email
         WHERE phone_number = @phone_number;
      `);

      if (patientData.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Patient record not found' });
    }

    const testRecordResult = await pool.request()
      .input('test_name', sql.VarChar(100), test_name)
      .input('test_status',sql.VarChar(50), test_status)
      .input('appointment_date', sql.DateTime,appointment_date)
      .input('test_id',  sql.Int,  test_id)
      .query(`
        UPDATE testrecord
           SET test_name  = @test_name,test_status = @test_status, appointment_date= @appointment_date
         WHERE test_id = @test_id;
      `);

    if (testRecordResult.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Patient test record not found' });
    }

    res.json({ message: 'Patients record updated successfully' });
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});


// add new Patient 
app.post('/add-patient', async (req, res) => {
  try {
    const {
      phone_number, first_name, last_name, gender,
      date_of_birth, patient_email, test_name, test_status, appointment_date
    } = req.body;

    const pool = await sql.connect(config);
    await pool.request()
      .input('phone_number', sql.VarChar(20), phone_number)
      .input('first_name', sql.VarChar(100), first_name)
      .input('last_name', sql.VarChar(100), last_name)
      .input('gender', sql.VarChar(10), gender)
      .input('date_of_birth', sql.Date, date_of_birth)
      .input('patient_email', sql.VarChar(100), patient_email)
      .query(`
        IF NOT EXISTS (SELECT 1 FROM Patient WHERE phone_number = @phone_number)
        BEGIN
          INSERT INTO Patient (phone_number, first_name, last_name, gender, date_of_birth, patient_email)
          VALUES (@phone_number, @first_name, @last_name, @gender, @date_of_birth, @patient_email)
        END
      `);
    //for TestRecord
    await pool.request()
      .input('phone_number', sql.VarChar(20), phone_number)
      .input('test_name', sql.VarChar(100), test_name)
      .input('test_status', sql.VarChar(255), test_status)
      .input('appointment_date', sql.Date, appointment_date)
      .query(`
        INSERT INTO TestRecord (phone_number, test_name, test_status, appointment_date)
        VALUES (@phone_number, @test_name, @test_status, @appointment_date)
      `);

    res.json({ message: 'Patients record added successfully' });
  } catch (err) {
    console.error('Error adding patient:', err);
    res.status(500).json({ error: 'Failed to add patient' });
  }
});

//app.delete

app.delete('/delete-record/:id', async (req, res) => {
  const { id } = req.params;
  console.log("delete id check ")
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM TestRecord WHERE test_id = @id'); 

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Patients record not found' });
    }

    res.json({ message: 'Record deleted successfully!!' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete record' });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});






