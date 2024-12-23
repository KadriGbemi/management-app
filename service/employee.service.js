import connectToDatabase from '../config/database.js'

export const getEmployees = async () => {
  const database = await connectToDatabase()

  const col = database.collection(process?.env?.EMPLOYEES_COLLECTION)

  const employees = await col.find().toArray()

  return employees
}

export const getEmployeeById = async (params) => {
  const database = await connectToDatabase()

  const col = database.collection(process?.env?.EMPLOYEES_COLLECTION)

  const allData = col.find({ id: params?.employeeId })

  const employeeData = await allData.toArray()

  return employeeData?.[0] || {}
}



export default { getEmployees, getEmployeeById }
