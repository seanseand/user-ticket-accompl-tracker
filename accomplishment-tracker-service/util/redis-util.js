import { createClient } from 'redis';

// Debug environment variables
console.log('Redis Environment Variables:', {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD ? '***' : 'undefined'
});

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD || 'password',
    socket: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        family: 4
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('ready', () => {
    console.log('Redis client ready');
});

async function connectRedis(retries = 5, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            if (!redisClient.isOpen) {
                await redisClient.connect();
            }
            console.log('Successfully connected to Redis');
            return redisClient;
        } catch (error) {
            console.error(`Redis connection attempt ${i + 1}/${retries} failed:`, error.message);
            
            if (i === retries - 1) {
                console.error('Failed to connect to Redis after all retries');
                throw error;
            }
            
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Don't auto-connect here, let the main app handle it
export { redisClient, connectRedis };
export default redisClient;