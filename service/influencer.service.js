import connectToDatabase from '../config/database.js'
import { v7 as uuidv7 } from 'uuid'

export const createInfluencer = async (payload) => {
  const database = await connectToDatabase()
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)

  const id = uuidv7()

  await col.insertOne({ id, ...payload })

  return payload
}

export const getFilteredInfluencers = async (query) => {
  const database = await connectToDatabase()
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)

  const influencers = await col
    .find({
      $or: [
        { first_name: query?.first_name },
        { last_name: query?.last_name },
        {
          employee: query?.employee,
        },
      ],
    })
    .toArray()

  return influencers
}

export const getInfluencers = async () => {
  const database = await connectToDatabase()
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)
  const influencers = await col.find().toArray()

  return influencers
}

export const getInfluencerById = async (params) => {
  const database = await connectToDatabase()
  const col = database.collection(process?.env?.INFLUENCERS_COLLECTION)

  const allData = col.find({ id: params?.influencerId })

  const influencerData = await allData.toArray()

  return influencerData?.[0] || {}
}

export default { getInfluencers, getFilteredInfluencers, getInfluencerById, createInfluencer }
