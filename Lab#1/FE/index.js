// index.js FE
function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => deleteEmployee(item.id)); // Add event listener to delete button
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// Add event listener to submit button
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', createEmployee);

// Add event listener to delete buttons
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-danger')) {
    const id = event.target.parentElement.parentElement.firstElementChild.textContent;
    deleteEmployee(id);
  }
});

function createEmployee() {
  const name = document.getElementById('name').value; 
  const id = document.getElementById('id').value; 

  // Send a POST request to your backend API to create a new employee
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, id: id }) // Send both name and id in the request body
  })
  .then(response => {
    if (response.ok) {
      // If creation is successful, refresh the table
      fetchEmployees();
    } else {
      throw new Error('Failed to create employee');
    }
  })
  .catch(error => console.error(error));
}


function deleteEmployee(id) {
  // Send a DELETE request to your backend API to delete the employee with the specified ID
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      // If deletion is successful, refresh the table
      fetchEmployees();
    } else {
      throw new Error('Failed to delete employee');
    }
  })
  .catch(error => console.error(error));
}

fetchEmployees();
