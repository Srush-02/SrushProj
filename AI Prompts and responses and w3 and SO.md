
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
