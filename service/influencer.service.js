import connectToDatabase from '../config/database.js'
import { v7 as uuidv7 } from 'uuid'

const buildFilters = (query) => {
  const filters = []

  if (query?.first_name) {
    filters.push({ first_name: { $regex: query.first_name, $options: 'ix' } })
  }

  if (query?.last_name) {
    filters.push({ last_name: { $regex: query.last_name, $options: 'ix' } })
  }

  if (query?.employee) {
    filters.push({ 'employee.name': { $regex: query.employee, $options: 'ix' } })
  }

  return filters
}

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

  const filters = buildFilters(query)

  const influencers = await col
    .find(
      filters.length > 0
        ? {
            $or: filters,
          }
        : {}
    )
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
