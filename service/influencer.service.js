import connectToDatabase from '../config/database.js'
import { v7 as uuidv7 } from 'uuid'

export const createInfluencer = async (payload) => {
  const database = await connectToDatabase()
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)

  const id = uuidv7()

  await col.insertOne({ id, ...payload })

  return payload
}

export const getInfluencers = async () => {
  const database = await connectToDatabase()
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)
  const employees = await col.find().toArray()

  return employees
}

export const getInfluencerById = async (params) => {
  const database = await connectToDatabase()
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)

  const allData = col.find({ id: params?.influencerId })

  const influencerData = await allData.toArray()

  return influencerData?.[0] || {}
}

export default { getInfluencers, getInfluencerById, createInfluencer }
