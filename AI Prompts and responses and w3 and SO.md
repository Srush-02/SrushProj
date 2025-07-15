
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


 8. Test suite failed to run
                                                                                                                            
    Your test suite must contain at least one test.

      at onResult (node_modules/@jest/core/build/index.js:1052:18)
      at node_modules/@jest/core/build/index.js:1122:165
      at node_modules/emittery/index.js:363:13
          at Array.map (<anonymous>)
      at Emittery.emit (node_modules/emittery/index.js:361:23)

Test Suites: 1 failed, 1 total 
soln: added test() on each methodName
Error: no test specified
soln: https://chatgpt.com/c/6872f9ec-80dc-8005-94c4-4f026c8a4f61


9. value, which is much more comprehensive and powerful.
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm ERR! code 1
npm ERR! path /home/20067494/SrushProj/account-data-service/node_modules/msnodesqlv8
npm ERR! command failed
npm ERR! command sh -c prebuild-install || node-gyp rebuild
npm ERR! make: Entering directory '/home/20067494/SrushProj/account-data-service/node_modules/msnodesqlv8/build'
npm ERR!   ACTION binding_gyp_sqlserverv8_target_print_variables src/BeginTranOperation.cpp
npm ERR! cflags_cpp -std=c++20 | arch: x86_64 | link_path: -L/usr/local/lib -L/usr/lib -L/usr/lib64 -L. | msodbc_include_folders  | fileset src/BeginTranOperation.cpp src/BinaryColumn.cpp src/BoundDatum.cpp src/BoundDatumSet.cpp src/CancelOperation.cpp src/CloseOperation.cpp src/CollectOperation.cpp src/Column.cpp src/Connection.cpp src/ConnectionHandles.cpp src/EndTranOperation.cpp src/FreeStatementOperation.cpp src/MutateJS.cpp src/OdbcConnection.cpp src/OdbcConnectionBridge.cpp src/OdbcError.cpp src/OdbcHandle.cpp src/OdbcOperation.cpp src/OdbcStatement.cpp src/OdbcStatementCache.cpp src/OpenOperation.cpp src/Operation.cpp src/OperationManager.cpp src/PollingModeOperation.cpp src/PrepareOperation.cpp src/ProcedureOperation.cpp src/QueryOperation.cpp src/QueryOperationParams.cpp src/QueryPreparedOperation.cpp src/ReadColumnOperation.cpp src/ReadNextResultOperation.cpp src/ResultSet.cpp src/TimestampColumn.cpp src/UnbindOperation.cpp src/Utility.cpp src/addon.cpp src/bcp.cpp src/stdafx.cpp
npm ERR!   CXX(target) Release/obj.target/sqlserverv8/src/BeginTranOperation.o
npm ERR! make: Leaving directory '/home/20067494/SrushProj/account-data-service/node_modules/msnodesqlv8/build'
npm ERR! prebuild-install warn install No prebuilt binaries found (target=18.19.1 runtime=node arch=x64 libc= platform=linux)
npm ERR! gyp info it worked if it ends with ok
npm ERR! gyp info using node-gyp@9.3.0
npm ERR! gyp info using node@18.19.1 | linux | x64
npm ERR! gyp info find Python using Python version 3.12.3 found at "/usr/bin/python3"
npm ERR! gyp info spawn /usr/bin/python3
npm ERR! gyp info spawn args [
npm ERR! gyp info spawn args   '/usr/share/nodejs/node-gyp/gyp/gyp_main.py',
npm ERR! gyp info spawn args   'binding.gyp',
npm ERR! gyp info spawn args   '-f',
npm ERR! gyp info spawn args   'make',
npm ERR! gyp info spawn args   '-I',
npm ERR! gyp info spawn args   '/home/20067494/SrushProj/account-data-service/node_modules/msnodesqlv8/build/config.gypi',
npm ERR! gyp info spawn args   '-I',
npm ERR! gyp info spawn args   '/usr/share/nodejs/node-gyp/addon.gypi',
npm ERR! gyp info spawn args   '-I',
npm ERR! gyp info spawn args   '/usr/include/nodejs/common.gypi',
npm ERR! gyp info spawn args   '-Dlibrary=shared_library',
npm ERR! gyp info spawn args   '-Dvisibility=default',
npm ERR! gyp info spawn args   '-Dnode_root_dir=/usr/include/nodejs',
npm ERR! gyp info spawn args   '-Dnode_gyp_dir=/usr/share/nodejs/node-gyp',
npm ERR! gyp info spawn args   '-Dnode_lib_file=/usr/include/nodejs/<(target_arch)/node.lib',
npm ERR! gyp info spawn args   '-Dmodule_root_dir=/home/20067494/SrushProj/account-data-service/node_modules/msnodesqlv8',
npm ERR! gyp info spawn args   '-Dnode_engine=v8',
npm ERR! gyp info spawn args   '--depth=.',
npm ERR! gyp info spawn args   '--no-parallel',
npm ERR! gyp info spawn args   '--generator-output',
npm ERR! gyp info spawn args   'build',
npm ERR! gyp info spawn args   '-Goutput_dir=.'
npm ERR! gyp info spawn args ]
npm ERR! gyp info spawn make
npm ERR! gyp info spawn args [ 'BUILDTYPE=Release', '-C', 'build' ]

curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
sudo apt-get update



