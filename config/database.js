import { MongoClient, ServerApiVersion } from 'mongodb'

const connectToDatabase = async () => {
  try {
    const client = new MongoClient(process?.env?.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    
    await client.connect()
    return client.db(process?.env?.MANAGEMENT_DB)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default connectToDatabase
