import express, { json } from 'express';

import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

// middleware imports
import { ifValidToken } from './middleware/jwt-middleware.js';

// route imports
import { timeInOutRouter } from './routes/time-log-route.js';
import { accomplishmentFormRouter } from './routes/accomplishment-logs-route.js';

// util imports
import redisClient, { connectRedis }  from './util/redis-util.js';
import { connectMongoDB, disconnectMongoDB } from './util/mongo-util.js';


const app = express();
app.use(json());

const PORT = process.env.PORT || 2020;

app.get('/health', (req, res) => {
    res.status(200).send({status: 'UP'});
});

app.use('/accomplishment-tracker/time-service/', ifValidToken(), timeInOutRouter);
app.use('/accomplishment-tracker/accomplishment-service/', ifValidToken(), accomplishmentFormRouter);

try{
    await connectRedis();
    await connectMongoDB();
    app.listen(PORT, () => {
        console.log(`accomplishment-tracker-service is running on port ${PORT}`);
    });
} catch (error) {
    console.log('Error starting the server:', error);
    disconnectMongoDB();
    redisClient.quit();
    process.exit(1);
}