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

  const allData = col.find({ id: Number(params?.employeeId) })

  const employeeData = await allData.toArray()

  return employeeData?.[0] || {}
}

export default { getEmployees, getEmployeeById }
