Student  Srushti Kalpak Raut(20067494)
Programme:  2425_TMD3
Module/Subject Title:  B9IS123 PROGRAMMING FOR INFORMATION SYSTEMS
Assignment Title: Paul Laird 



# Introduction:

Medicon India is a health care service center which is located in Mira-Bhayandar, Mumbai,
This company providing affordable and accessible healthcare to all. There are more than 100 medical facilities, which including diagnostic centers, hospitals, and laboratories with which the organization cooperates to provide a large number of different services at the fair price to patients.

In this project, a development of the application is required at an administrative level to handle patient and their testing records on admin level. It is centered around CRUD (Create, Read, Update, Delete) functionality and makes possible that administrators level:
Insert, modify, or remove patient records
modify the test status (e.g. Pending or Completed)
Search and find the data of the patients using filter which is according to a given date interval of the appointment (fromDate to toDate)
This system will be able to efficient for management process of healthcare services of Medicon India by increasing the precision of data, and by handling data better and also making better decisions using structured and easily accessible information about the patients.

Company Name : MEDICON INDIA
Company Website: https://mediconindia.com/
Company Location : https://g.co/kgs/VwsfmQk
Company Background : 
    Medicon India is a healthcare service centre located in Mira-Bhayandar(Mumbai). Medicon India is a company that is committed to make healthcare affordable. It is committed to making healthcare accessible to all. They achieve this by partnering with over 100 medical facilities, such as diagnostic centers, hospitals, and laboratories. 
Implemention : 
    Healthcare patient test data including MRI, blood test etc and patient encounter information at admin level.

APIs: RESTful APIs to handle CRUD operations
Admin panel :Create, Read, Update, Delete (CRUD) operations for patient records, Upload diagnostic data like MRI & blood



# Steps for excution: 
Open SSMS for backend connection and using VS code open server.js file 
Run below command: 
node server.js
Try "Go live" to connect html file locally.

# Unit testcase:
jest tests written for Apis
serverTest.test.js class run and test the APIs
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install --save-dev jest
added in package.json
{
  "scripts": {
    "test": "jest"
  }
}



# SQL query:
Created two tables using SSMS plateform:
TestRecord, Patient

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
- Backend interface with frontend form inputs using index.html, which is configured to store and retrieve patient details in admin level, including patients information, test names, appointment dates, phone number i have added as a mendatory key and statuses

## Added console logs for debugging issues.

# Connection to VM:
Run command on bash:
ssh srush@13.79.120.224
- updated basic packages:
sudo apt update && sudo apt upgrade -y
- github clone:
git clone https://github.com/Srush-02/SrushProj.git
cd /home/20067494/SrushProj/account-data-service
ls
npm install

curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
sudo apt-get update
to solve issue of msnodesqlv8 installation
cd SrushProj
- Installed my project
command:
$ cd /home/20067494/SrushProj/account-data-service
$ npm install
ll get:
Server running at http://localhost:3000




# Reference:
https://www.youtube.com/watch?v=ER9SspLe4Hg&list=PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR
https://www.w3schools.com/js/
https://www.geeksforgeeks.org/javascript/javascript-tutorial/
window event: https://blog.octalabs.com/javascript-window-events-explained-with-practical-examples-b278cb0bb74c
auto increament field for record ID: https://www.w3schools.com/sql/sql_autoincrement.asp
express: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction
jest: https://jestjs.io/docs/getting-started
To solve jest UnauthorizedAccess issue : https://stackoverflow.com/questions/64633727/how-to-fix-running-scripts-is-disabled-on-this-system


# Documentation:
Api writtern in server.js  for backend.
One server.js has added for 4 apis. i.e. /patient, /updatePatient, /add-patient, /delete-record
Handled css style in CSS.style  with index.html file.



