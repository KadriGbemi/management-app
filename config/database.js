import { MongoClient, ServerApiVersion } from 'mongodb'

const username = encodeURIComponent(process?.env?.DB_USERNAME || '')
const password = encodeURIComponent(process?.env?.DB_PASSWORD || '')
const host = encodeURIComponent(process?.env?.DB_HOST || '')
const appName = encodeURIComponent(process?.env?.DB_APP_NAME || '')

const uri = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority&appName=${appName}`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connectToDatabase() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('Successfully connected to MongoDB!')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default connectToDatabase
