import employeeService from '../service/employee.service.js'

export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees()
    res.status(200).json(employees)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params)
    res.status(200).json(employee)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export default { getEmployees, getEmployeeById }
