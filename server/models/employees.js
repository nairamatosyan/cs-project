const path = process.cwd();
const Employee = require(`${path}/schemas/employees.js`);

const addNewEmployee = async data => {
    return await Employee.addNewEmployee(data);
}

module.exports = {
    addNewEmployee
}