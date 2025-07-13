
1. To connect Database server I faced this types of error which I have solved by chatgpt and stack overflow
npm init -y
npm install mssql

Error: Cannot find module 'C:\Users\srush\Documents\sem1\HealthCare\index.js'

  2nd error : throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express' imported from C:\Users\srush\Documents\sem1\HealthCare\account-data-service\index.js
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:256:9)


file:///C:/Users/srush/Documents/sem1/HealthCare/account-data-service/server.js:4
import config from './db/db.js';
       ^^^^^^
SyntaxError: The requested module './db/db.js' does not provide an export named 'default'

import  {config} from './db/db.js';

file:///C:/Users/srush/Documents/sem1/HealthCare/account-data-service/db/db.js:2
const sql = require('mssql');
            ^

ReferenceError: require is not defined in ES module scope, you can use import instead
    at file:///C:/Users/srush/Documents/sem1/HealthCare/account-data-service/db/db.js:2:13
	
	node server.js
(node:904) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/srush/Documents/sem1/HealthCare/account-data-service/server.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to C:\Users\srush\Documents\sem1\HealthCare\account-data-service\package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
file:///C:/Users/srush/Documents/sem1/HealthCare/account-data-service/db/db.js:25
module.exports = {
^

ReferenceError: module is not defined in ES module scope
    at file:///C:/Users/srush/Documents/sem1/HealthCare/account-data-service/db/db.js:25:1
    at ModuleJob.run (node:internal/modules/esm/module_job:274:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:644:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)

Node.js v22.16.0
soln: 
npm init
npm install express cors
import express from 'express';

2. how to define defines the number of columns a table cell should span. and styling ideas(used colspan information from w3school).

ChatGPT History share link: 


3.how to write query in js ?
Response: 
const sql = require('mssql');

const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  database: 'your_database',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

async function updatePatient() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('phone_number', sql.VarChar(20), '1234567890')
      .input('first_name', sql.VarChar(100), 'John')
      .input('last_name', sql.VarChar(100), 'Doe')
      .input('gender', sql.VarChar(10), 'Male')
      .input('date_of_birth', sql.Date, '1990-01-01')
      .query(`
        UPDATE Patient
        SET first_name = @first_name,
            last_name = @last_name,
            gender = @gender,
            date_of_birth = @date_of_birth
        WHERE phone_number = @phone_number
      `);

    console.log('Rows affected:', result.rowsAffected);
  } catch (err) {
    console.error('SQL Error:', err);
  }
}
3. issue:  No 'Access-Control-Allow-Origin
index.html:1  Access to fetch at 'http://localhost:3000/patient' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
script.js:125  Fetch failed: TypeError: Failed to fetch
    at script.js:118:3
solution :
You're getting two related errors, indicating the request to your backend is failing due to CORS and/or fetch handling issues
npm install cors
const cors = require('cors'); //code change
const app = express();

app.use(cors()); // This enables CORS for all origins

4. W3 school window.addEventListener 
window.addEventListener -> DOMContentLoaded is a special browser event that fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.


5. Difference between append() vs appendChild() (https://dev.to/ibn_abubakre/append-vs-appendchild-a4m)
const parent = document.createElement('div');
const child = document.createElement('p');
// Appending Node Objects
parent.append(child) // Works fine
parent.appendChild(child) // Works fine
// Appending DOMStrings
parent.append('Hello world') // Works fine
parent.appendChild('Hello world') // Throws error

6. alter table Patient add test_name varchar(Forget to add varchar size)
Msg 2628, Level 16, State 1, Line 5
String or binary data would be truncated in table 'HealthCare.dbo.Patient', column 'test_name'. Truncated value: 'B'.
The statement has been terminated.
solution: ALTER TABLE Patient ALTER COLUMN test_name VARCHAR(100);

To reolved issue :
ALTER TABLE … DROP COLUMN fails when anything (default constraints, computed columns, indexes, foreign‑keys, etc.) still depends on the column.
ALTER TABLE dbo.TestRecord
DROP CONSTRAINT DF__TestRecor__creat__398D8EEE;

ALTER TABLE TestRecord
DROP COLUMN created_at, LastUpdatedTimeStamp;

#  SQL Identity -(geeksforgeeks.com)
Identity column of a table is a column whose value increases automatically. The value in an identity column is created by the server. A user generally cannot insert a value into an identity column. Identity column can be used to uniquely identify the rows in the table.
CREATE TABLE TestRecord (
    test_id INT IDENTITY(1,1) PRIMARY KEY,
    phone_number VARCHAR(20), 
    test_name VARCHAR(100),
    test_status VARCHAR(255),
    appointment_date DATE
);

# What’s a connection pool?
Opening a new TCP connection to SQL Server, await: waits to complete  Promise, so this is pausing that process 

7. PS C:\Users\srush\Documents\sem1\HealthCare\SrushProj> npm install --save-dev jest
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see 
about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npm install --save-dev jest
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
https://stackoverflow.com/questions/64633727/how-to-fix-running-scripts-is-disabled-on-this-system
soln: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser  run on powerShell admi
then run npm install --save-dev jest


