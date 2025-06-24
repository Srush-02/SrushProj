
// import sql from 'mssql';
// import express from 'express';
// import  {config} from './db/db.js';

const express = require('express');
const sql = require('mssql');
const { config } = require('./db/db');

const app = express();
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
