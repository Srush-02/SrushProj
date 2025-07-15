const API_BASE_URL = 'http://localhost:3000';
//const API_BASE_URL = 'http://13.79.120.224:3000';

let allData = [];

const tableBody = document.getElementById('dataTable').querySelector('tbody');
const form = document.getElementById('filterForm');

function renderTable(dataToRender) {
  tableBody.innerHTML = '';

  if (dataToRender.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6">No records found</td></tr>';
    return;
  }
 console.log("dataToRender--" + dataToRender)
  dataToRender.forEach(patient => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${patient.test_id || ''}</td>
      <td>${patient.first_name}</td>
      <td>${patient.date_of_birth || ''}</td>
      <td style="width: 50px;">${patient.gender || ''}</td>
      <td>${patient.phone_number}</td>
      <td>${patient.patient_email}</td>
      <td>${patient.test_name || ''}</td>
      <td>${patient.appointment_date || ''}</td>
      <td>${patient.test_status || ''}</td>
      <td>
        <button onclick="editPatient('${patient.phone_number}')">Edit</button>
        <button onclick="deletePatient('${patient.phone_number}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

const fName = document.getElementById('first_name')
const fromDateId = document.getElementById('dateFrom')
const toDateID = document.getElementById('dateTo')
const mobileId = document.getElementById('mobileNumber')
const emailId = document.getElementById('email')
const testNameID = document.getElementById('testName')

//TODO checks
function applyFilters() {
  console.log("check applyfilter");
  const name = fName.value.toLowerCase();
  console.log("check applyfilter2", name);

  const dateFrom = fromDateId.value;
  const dateTo = toDateID.value;
  const selectedStatus = document.querySelector('input[name="status"]:checked');
  const statusValue = selectedStatus ? selectedStatus.value : null;
  const mobile = mobileId.value;
  const email = emailId.value.toLowerCase();
  const testName = testNameID.value.toLowerCase();
  const filtered = allData.filter(item => {

    const formattedDate = dateFormatIso(item.appointment_date);
    const itemDate = new Date(formattedDate);
    const matchName = !name || (item.first_name && item.first_name.toLowerCase().includes(name));
    const matchDateFrom = !dateFrom || new Date(dateFrom) <= itemDate;
    const matchDateTo = !dateTo || itemDate <= new Date(dateTo);
    const matchStatus = !statusValue || item.status === statusValue;
    const matchMobile = !mobile || item.phone_number.includes(mobile);
    const matchEmail = !email || item.patient_email.toLowerCase().includes(email);
    const matchTestName = !testName || item.test_name.toLowerCase().includes(testName);

    return matchName && matchDateFrom && matchDateTo && matchStatus && matchMobile && matchEmail && matchTestName;
  });

  renderTable(filtered);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  applyFilters();
});

const clearFilterForm = document.getElementById("clearBtn")

clearFilterForm.addEventListener('click', () => {
  fName.value = '';
  fromDateId.value = '';
  toDateID.value = '';
  mobileId.value = '';
  emailId.value = '';
  testNameID.value = '';
  const statusRadios = document.querySelectorAll('input[name="status"]');
  statusRadios.forEach(radio => radio.checked = false);
  applyFilters()
});





//edit 
window.editPatient = function (phone_number) {
  const row = Array.from(tableBody.rows).find(
    r => r.cells[4].textContent === phone_number
  );

  if (!row) return;

  const patient = allData.find(p => p.phone_number === phone_number);
  if (!patient) return;

  row._ogHTML = row.innerHTML;

  row.innerHTML = `
    <td>${patient.test_id || ''}</td>
    <td><input type="text" value="${patient.first_name}" id="editFirstName"/></td>
    <td><input type="date" value="${dateFormatIso(patient.date_of_birth)}" id="editDob"/></td>
    <td style="width: 70px;"><input style="width: 50px;" type="text" value="${patient.gender || ''}" id="editGender"/></td>
    <td>${patient.phone_number}</td>
    <td><input type="email" value="${patient.patient_email}" id="editEmail"/></td>
    <td><input type="text" value="${patient.test_name}" id="editTestName"/></td>
    <td><input type="date" value="${dateFormatIso(patient.appointment_date)}" id="editAppointDate"/></td>
    <td>
        <label><input type="radio" name="editStatus" value="Complete" /> Complete</label>
        <label><input type="radio" name="editStatus" value="Pending" /> Pending</label>
    </td>
    <td>
      <button onclick="saveEdit('${phone_number}', this)">Save</button>
      <button onclick="cancelEdit(this)">Cancel</button>
    </td>
  `;
};

window.saveEdit = function (phone_number, btn) {
  const row = btn.closest('tr');
  const selectedStatus = row.querySelector('input[name="editStatus"]:checked');
  const statusValue = selectedStatus ? selectedStatus.value : null;

  const updatedPatient = {
    ...allData.find(p => p.phone_number === phone_number),
    first_name: document.getElementById('editFirstName').value,
    date_of_birth: document.getElementById('editDob').value,
    gender: document.getElementById('editGender').value,
    patient_email: document.getElementById('editEmail').value,
    appointment_date: document.getElementById('editAppointDate').value,
    test_name: document.getElementById('editTestName').value,
    test_status:  statusValue
  };

  //update
  fetch(`${API_BASE_URL}/updatePatient/${phone_number}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedPatient)
  })
    .then(response => {
      if (!response.ok) throw new Error('Update failed');
      return response.json();
    })
    .then(() => {
      const index = allData.findIndex(p => p.phone_number === phone_number);
      allData[index] = updatedPatient;
      applyFilters(); 
    })
    .catch(err => alert('Error updating patient: ' + err.message));
};



//Delete

window.deletePatient = function (phone) {
  if (!confirm(`Are you sure you want to delete this test record ${phone}?`)) return;
console.log("Type of ID:", typeof id);
  fetch(`${API_BASE_URL}/delete-record/${phone}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) throw new Error('Delete failed');
      allData = allData.filter(p => p.phone_number !== phone);
      applyFilters();
    })
    .catch(err => alert('Error deleting patient: ' + err.message));
};





//Patient form
const addPatientBtn = document.getElementById('addPatientBtn');
const patientModal = document.getElementById('patientModal');
const addPatientForm = document.getElementById('addPatientForm');
const cancelBtn = document.getElementById('cancelBtn');

addPatientBtn.addEventListener('click', () => {
  patientModal.style.display = 'block';
  addPatientBtn.style.display = 'none'
});

cancelBtn.addEventListener('click', () => {
  patientModal.style.display = 'none';
  addPatientBtn.style.display = 'block'
  addPatientForm.reset();
});

addPatientForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log("submit addPatientForm");

  const firstName = document.getElementById('newFirstName').value.trim();
  const lastName = document.getElementById('newLastName').value.trim();
  const gender = document.getElementById('newGender').value.trim();
  const dob = document.getElementById('newDob').value;
  const phoneNumber = document.getElementById('newPhoneNumber').value.trim();
  const email = document.getElementById('newEmail').value.trim();
  const testName = document.getElementById('newTestName').value.trim();
  const appointmentDate = document.getElementById('newAppointmentDate').value;
  const status = document.getElementById('newStatus').value;

  document.querySelectorAll('.form-group input').forEach(input => {
    input.style.borderColor = '';
  });

  let hasError = false;

  if (!firstName || !lastName || !gender || !dob || !phoneNumber || !email || !testName || !appointmentDate || !status) {
    hasError = true
  }

  if (hasError) {
    alert('Please fill in all required fields');
    return;
  }

  const payload = {
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


  console.log('Submitting data:', payload);

  
  fetch(`${API_BASE_URL}/add-patient`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw new Error(error.error || 'Bad Request- check Server ');
        });
      }
      return res.json(); 
    })
    .then(data => {
      console.log('API Success:', data);
      
      alert('Patient added successfully!');
      addPatientForm.reset();
    })
    .catch(err => {
      console.error('API Error:', err);
      alert('Failed to add patient.');
    }).finally(() => {
     applyFilters()
    });

});

// 1st load data

window.addEventListener('DOMContentLoaded', () => {
  fetch(`${API_BASE_URL}/patient`)
    .then(res => res.json())
    .then(data => {
      allData = data;
      console.log("DOMContentLoaded---->", allData)
      renderTable(allData);
    })
    .catch(err => {
      console.error('Fetch failed:', err);
      tableBody.innerHTML = '<tr><td colspan="6">Failed to load data</td></tr>';
    });
});

function dateFormatIso(dateStr) {
  if (!dateStr) return '';
  const [dd, mm, yyyy] = dateStr.split('-');
  return `${yyyy}-${mm}-${dd}`;
}

window.cancelEdit = function (btn) {
  const row = btn.closest('tr');
  if (row && row._ogHTML) {
    row.innerHTML = row._ogHTML;   
    delete row._ogHTML;          
  }
};

