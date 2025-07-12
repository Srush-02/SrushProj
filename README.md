# SrushProj

Company Name : MEDICON INDIA
Company Website: https://mediconindia.com/
Company Location : https://g.co/kgs/VwsfmQk
Company Background : 
    Medicon India is a healthcare service centre located in Mira-Bhayandar(Mumbai). Medicon India is a company that is committed to make healthcare affordable. It is committed to making healthcare accessible to all. They achieve this by partnering with over 100 medical facilities, such as diagnostic centers, hospitals, and laboratories. 
Implemention : 
    Healthcare data including MRI, blood test and and patient encounter information.

Clearning concept of Js :
https://www.youtube.com/watch?v=ER9SspLe4Hg&list=PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR
https://www.w3schools.com/js/
https://www.geeksforgeeks.org/javascript/javascript-tutorial/

Frontend & Backend: JavaScript (Node.js and framework like React.js)
Database: Postgress or MongoDB (flexibility in handling various data mongo DB)
APIs: RESTful APIs to handle CRUD operations
For admin panel :Create, Read, Update, Delete (CRUD) operations for patient records, Upload diagnostic data like MRI & blood test results
For database ll be creating 2 table patient details, Test Result.
Patient API:
To get all patient records, Post call- Add a new patient , Delete call Delete a patient record.
Test Resukt API: 
Get all tests for a patient, Post call Add a new test record, PUT call Update a test result, Delete call -admin can delete test record.

# steps for excution: 
Open SSMS for backend connection and using VS code open server.js file 
Run below command: 
node server.js
Try "Go live" to connect html file.


# Unit testcase:




# used SQL query:

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

To reolved issue :
ALTER TABLE … DROP COLUMN fails when anything (default constraints, computed columns, indexes, foreign‑keys, etc.) still depends on the column.
ALTER TABLE dbo.TestRecord
DROP CONSTRAINT DF__TestRecor__creat__398D8EEE;
