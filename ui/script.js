function applyFilters() {
  const name = document.getElementById('patientName').value.toLowerCase();

  const filtered = allData.filter(item => {
    const itemDate = new Date(item.date);

    const matchName = !name || item.name.toLowerCase().includes(name);
    

    return matchName 
  });

  renderTable(filtered);
}