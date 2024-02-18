// index.js BE controllers

// Employee data store
let employees = [
  { id: '1', name: 'Mohamed Sayed' }
];

// Get all employees
exports.getEmployees = async (req, res, next) => {
  try {
    res.status(200).json({ data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the index of the employee with the given ID
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Remove the employee from the array
    employees.splice(index, 1);

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new employee
exports.createEmployee = async (req, res, next) => {
  const { name, id } = req.body;

  try {
    // Check if an employee with the same ID already exists
    const existingEmployee = employees.find(emp => emp.id === id);
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with this ID already exists' });
    }

    // Create the new employee object
    const newEmployee = { id, name };

    // Add the new employee to the array
    employees.push(newEmployee);

    res.status(201).json({ data: newEmployee, message: 'Employee created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
