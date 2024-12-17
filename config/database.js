import { MongoClient, ServerApiVersion } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
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
