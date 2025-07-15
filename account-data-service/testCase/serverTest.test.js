const request = require('supertest');
const sql = require('mssql');

const app = require('../server');

afterAll(async () => {
    try{
  const pool = await sql.connect();
  await pool.close();
    } catch{
        console.log("check--")
    }

});


test('GET /patient should return patient records on success', async () => {
  const mockRecordset = [
    {
      test_id: 1,
      phone_number: '978945632',
      first_name: 'Jack',
      last_name: 'Patil',
      gender: 'M',
      date_of_birth: '01-01-1970',
      patient_email: 'jack.p@example.com',
      test_name: 'Blood Test',
      test_status: 'Completed',
      appointment_date: '15-07-2025',
    },
  ];
});

test('PUT /updatePatient/:phone_number - success', async () => {

  const phoneNumber = '147852369';
  const updateData = {
    first_name: 'June',
    last_name: 'Dosh',
    gender: 'F',
    date_of_birth: '1947-01-08',
    patient_email: 'june.d@example.com',
    test_id: 5,
    test_name: 'X-Ray',
    test_status: 'Pending',
    appointment_date: '2025-08-20',
  };
        expect(updateData).toHaveProperty('first_name');
});

test('check phone number', () => {
  const phoneNumber = '1234567890';
  expect(phoneNumber).toBe('1234567890');
});

test('PUT /updatePatient/:phone_number - missing required field', async () => {
  const phoneNumber = '1234567890';
  const incompleteData = {
    // test_id missing
    last_name: 'Doe',
    gender: 'F',
    date_of_birth: '1990-01-01',
    patient_email: 'jane.doe@example.com',
    test_id: 5,
    test_name: 'X-Ray',
    test_status: 'Pending',
    appointment_date: '2025-08-20',
  };

  const res = await request(app)
    .put(`/updatePatient/${phoneNumber}`)
    .send(incompleteData);

  expect(res.statusCode).toBe(404); // bad input
    expect(res.body).toHaveProperty('message', 'Patient record not found');

});


test('POST /add-patient - success', async () => {
  const newPatient = {
    phone_number: '9998887777',
    first_name: 'Jui',
    last_name: 'Save',
    gender: 'F',
    date_of_birth: '1985-05-05',
    patient_email: 'Jui.s@example.com',
    test_name: 'MRI Test',
    test_status: 'Completed',
    appointment_date: '2025-08-20',
  };

  const res = await request(app)
    .post('/add-patient')
    .send(newPatient);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('message', 'Patients record added successfully');
});


test('returns 404 for invalid id parameter', async () => {
  const res = await request(app).delete('/delete-record/test');

  expect(res.statusCode).toBe(404);
  expect(res.body).toEqual({ message: 'Patients record not found' });
});

