
let allData = [];

const tableBody = document.getElementById('dataTable').querySelector('tbody');
const form = document.getElementById('filterForm');

function renderTable(dataToRender) {
  tableBody.innerHTML = '';

  if (dataToRender.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6">No records found</td></tr>';
    return;
  }

  dataToRender.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.date}</td>
      <td>${item.status}</td>
      <td>${item.mobile}</td>
      <td>${item.email}</td>
      <td>
        <button onclick="editPatient(${item.id})">Edit</button>
        <button onclick="deletePatient(${item.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function applyFilters() {
  const name = document.getElementById('patientName').value.toLowerCase();
  const dateFrom = document.getElementById('dateFrom').value;
  const dateTo = document.getElementById('dateTo').value;
  const statusComplete = document.getElementById('statusComplete').checked;
  const statusPending = document.getElementById('statusPending').checked;
  const mobile = document.getElementById('mobileNumber').value;
  const email = document.getElementById('email').value.toLowerCase();

  const filtered = allData.filter(item => {
    const itemDate = new Date(item.date);

    const matchName = !name || item.name.toLowerCase().includes(name);
    const matchDateFrom = !dateFrom || new Date(dateFrom) <= itemDate;
    const matchDateTo = !dateTo || itemDate <= new Date(dateTo);
    const matchStatus = (!statusComplete && !statusPending) ||
      (statusComplete && item.status === 'Complete') ||
      (statusPending && item.status === 'Pending');
    const matchMobile = !mobile || item.mobile.includes(mobile);
    const matchEmail = !email || item.email.toLowerCase().includes(email);

    return matchName && matchDateFrom && matchDateTo && matchStatus && matchMobile && matchEmail;
  });

  renderTable(filtered);
}