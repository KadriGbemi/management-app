import { MongoClient } from 'mongodb'

export const getEmployees = async () => {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  const database = client.db(process?.env?.MANAGEMENT_DB)
  const col = database.collection(process?.env?.EMPLOYEES_COLLECTION)
  const employees = await col.find().toArray()

  return employees
}

export const getEmployeeById = async (params) => {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  const database = client.db(process?.env?.MANAGEMENT_DB)
  const col = database.collection(process?.env?.EMPLOYEES_COLLECTION)

  const allEmployeesByID = col.find({ id: Number(params?.employeeId) })

  const employee = await allEmployeesByID.toArray()

  return employee?.[0] || {}
}

export default { getEmployees, getEmployeeById }
