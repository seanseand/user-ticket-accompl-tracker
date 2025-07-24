import express, { json } from 'express';
import { config } from 'dotenv';

// middleware imports
import { ifValidToken } from './middleware/jwt-middleware.js';

// route imports
import { timeInOutRouter } from './routes/time-in-out-route.js';

config({ path: './.env' });

const app = express();
app.use(json());

const PORT = process.env.PORT || 2010;

app.get('/health', (req, res) => {
    res.status(200).send({status: 'UP'});
});

app.use('/accomplishment-tracker/time-service/', ifValidToken(), timeInOutRouter);

try{
    app.listen(PORT, () => {
        console.log(`accomplishment-tracker-service is running on port ${PORT}`);
    });
} catch (error) {
    console.log('Error starting the server:', error);
    process.exit(1);
}