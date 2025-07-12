# SrushProj

Company Name : MEDICON INDIA
Company Website: https://mediconindia.com/
Company Location : https://g.co/kgs/VwsfmQk
Company Background : 
    Medicon India is a healthcare service centre located in Mira-Bhayandar(Mumbai). Medicon India is a company that is committed to make healthcare affordable. It is committed to making healthcare accessible to all. They achieve this by partnering with over 100 medical facilities, such as diagnostic centers, hospitals, and laboratories. 
Implemention : 
    Healthcare patient test data including MRI, blood test and and patient encounter information at admin level.

Frontend & Backend: JavaScript (Node.js and framework like React.js)
Database: SSMS
APIs: RESTful APIs to handle CRUD operations
For admin panel :Create, Read, Update, Delete (CRUD) operations for patient records, Upload diagnostic data like MRI & blood test results
For database ll be creating 2 table patient details, Test Record.
Patient API:
To get all patient records, Post call- Add a new patient , Delete - Delete a patient record.

# steps for excution: 
Open SSMS for backend connection and using VS code open server.js file 
Run below command: 
node server.js
Try "Go live" to connect html file.


# Unit testcase:




# SQL query:

 CREATE TABLE TestRecord (
    test_id INT IDENTITY(1,1) PRIMARY KEY,
    phone_number VARCHAR(20), 
    test_name VARCHAR(100),
    test_status VARCHAR(255),
    appointment_date DATE
);

    CREATE TABLE Patient (
    phone_number VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender VARCHAR(10),
    date_of_birth DATE,
    patient_email VARCHAR(100)
);
select * from Patient
alter table Patient add test_name varchar
ALTER TABLE Patient ALTER COLUMN test_name VARCHAR(100);
/*test_result test_name and last 2 */
Update patient set test_name = 'Blood Test'
WHERE  phone_number = '9251478200';

ALTER TABLE Patient
DROP COLUMN test_name;

select * from TestRecord

ALTER TABLE TestRecord ALTER COLUMN test_name VARCHAR(100);
ALTER TABLE TestRecord ALTER COLUMN test_name VARCHAR(100);

ALTER TABLE TestRecord
DROP COLUMN created_at, LastUpdatedTimeStamp;

# Back-end Technology :
- Java script
- SSMS
- Node JS tool
- POSTMAN
- Jest for test case


- In CA2 of Programming for Information Systems, healthCare application was developed in JavaScript (Node. js) using Express.js framework in developing some of the RESTful APIs.
- It connects with Microsoft SQL Server database that contains patient as well as test records. I used an Express to install (sever.js) an independent configuration app.
- Information regarding connection of the database configured in db,js file.
- Code coverage, test cases of the service layer were introduced to access the standard format and run it successfully.

The backend services were performed so that I should be able to carry out the basic functionalities of storing and querying the patient and the test details.
## Backend specific api calls:
1. GET call: /patient
Get api call access to all the record of the patients. I used LEFT JOIN in query so that I could reflect the patients missing the tests. In query I used FORMAT function to format dates.
2. POST Api: /add-patient
Adds new records of patients and their test records with test status(pending/completed).
3. PUT Api: /updatePatient/:phone_number
Updates the patients and the test record based on phone number of patient and identifying number of test records.
It sends back a message based on whether the update has suceeded or not as well as whether the record exists or not.
4. DELETE Api call: delete-record/:id
Removes a test based on the test_id presented. Added validation to show "Patients record not found".

# Front-end Technology:
HTML,
CSS, 
JavaScript


- Using RESTful APIs and frontend interface to help filtering/ modifying/ delete patient records using CRUD operations.
- The application runs at the http://localhost:3000 host.
- I added window.addEventListener function to display all patient record on the basis of the page rendered.
- filter exiting patient record with applyFilters method. Included also radio button to test status of patient
- The addition of a Patient form to add the details of a new patient record. on submit button it triggers /add-patient API to create a new record in the database. with the help of const payload I am adding this data for patient record.
 payload = {
    first_name: firstName,
    last_name: lastName,
    gender,
    date_of_birth: dob,
    phone_number: phoneNumber,
    patient_email: email,
    test_name: testName,
    appointment_date: appointmentDate,
    test_status: status
  };

- Added a column to action in below table so that it contains 2 buttons EDIT and DELETE row. To begin with, I was trying to do global edit of the change in pages but it was not working properly due to proper css hence taking array as per raw edit.
- Applied use of wrapper to correct content of table properly
- Save button makes a PUT api call request to modify a patient and test record.
- The Delete button that removes a certain record of a test through api call DELETE /delete-record/:id with the message asking conformation whether he is sure to delete the test record.


