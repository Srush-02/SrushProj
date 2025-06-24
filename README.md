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
For database ll be creating 3 table patient details, Medical Record, Test Result.
Patient API:
To get all patient records, Get details of a specific patient, Post call- Add a new patient , Delete call Delete a patient record.
Test Resukt API: 
Get all tests for a patient, Post call Add a new test record, PUT call Update a test result, Delete call -admin can delete test record.

To connect Database server I faced this types of error which I have solved by chatgpt and stack overflow
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
