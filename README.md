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

In healthCare application for CA2 of Programming for Information Systems, I have build database setup with configuration. I created REST APIs in JavaScript.
After developing the REST APIs and connecting with database. I used POSTMAN for local tetsing as rest client tool.
For code coverage I wrote test case for ther service layer as per standard and run them successfully.
I have constructed database setup along with set up configuration. Also I designed REST APIs on JavaScript.
Once the REST APIs are created and the connection with database. I did local testing through POSTMAN as rest client tool.
Regarding the code coverage I wrote the test cases of the service layer in accordance to standard format and run them successfully.
This functionality in the back-end of the healthcare information system was developed on JavaScript (Node. js) with Express. js to create few of the RESTful APIs. It is connected to Microsoft SQL Server database which stores patient records. An independent configuration app (db. js) where the connection information of the database was saved and retrieved safely it was an Express to configure the server.

Application-specific api calls:
1. GET call: Get api call access all the record of the patients.
I applied LEFT JOIN in query to be able to reflect the tests missing patients.
In query I used FORMAT function to format dates.
2. POST Api: /add-patient
Adds new patient and detected test records.
3. PUT Api: /updatePatient/:phone_number
Updates the patient and the test record with respect to the patient’s phone number and test record identifier.
It returns a meaning message depending on whether or not the update has suceeded and the record is there.
4. DELETE Api:  /delete-record/:id
Deletes a test using the given test_id. In case of a non-existent record, I included verification.
