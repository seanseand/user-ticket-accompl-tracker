import { MongoClient } from 'mongodb';

const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`;

let client;
let db;

async function connectMongoDB() {
    try {
        client = new MongoClient(connectionString);
        await client.connect();
        db = client.db(process.env.MONGO_DATABASE);
        console.log('Connected to MongoDB successfully');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected. Call connectMongoDB first.');
    }
    return db;
}

async function disconnectMongoDB() {
    if (client) {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

export { connectMongoDB, getDB, disconnectMongoDB };