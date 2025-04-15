
import { MongoClient, ServerApiVersion } from 'mongodb';

// Connection URI (replace with your MongoDB Atlas connection string)
// You should replace this with your actual MongoDB Atlas connection string
const uri = "mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority";

// Create a MongoClient with connection pooling
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;

// Helper function to get a database instance
export async function getDatabase(dbName = 'woodandwhimsy') {
  const client = await clientPromise;
  return client.db(dbName);
}

// Helper function to get a collection
export async function getCollection(collectionName: string, dbName = 'woodandwhimsy') {
  const db = await getDatabase(dbName);
  return db.collection(collectionName);
}

// User-related helpers
export async function findUserByEmail(email: string) {
  const collection = await getCollection('users');
  return collection.findOne({ email: email.toLowerCase() });
}

export async function createUser(userData: any) {
  const collection = await getCollection('users');
  return collection.insertOne({
    ...userData,
    email: userData.email.toLowerCase(),
    createdAt: new Date()
  });
}

export async function validateUserPassword(email: string, password: string) {
  // In a real application, you would use a proper password hashing library
  // like bcrypt to hash and compare passwords securely
  const user = await findUserByEmail(email);
  
  if (!user) return null;
  
  // IMPORTANT: This is a simplified version for demo purposes
  // In production, NEVER store plain text passwords and use proper password hashing
  if (user.password === password) {
    // Remove the password before returning user data
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
}
