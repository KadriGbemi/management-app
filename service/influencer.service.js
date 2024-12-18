import { MongoClient } from 'mongodb'

export const createInfluencer = async (payload) => {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  const database = client.db(process?.env?.MANAGEMENT_DB)
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)
  const response = await col.insertOne(payload)

  return response
}

export const getInfluencers = async () => {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  const database = client.db(process?.env?.MANAGEMENT_DB)
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)
  const employees = await col.find().toArray()

  return employees
}

export const getInfluencerById = async (params) => {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  const database = client.db(process?.env?.MANAGEMENT_DB)
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)

  const allData = col.find({ id: Number(params?.influencerId) })

  const influencerData = await allData.toArray()

  return influencerData?.[0] || {}
}

export default { getInfluencers, getInfluencerById, createInfluencer }
