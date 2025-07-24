import { Router, json } from 'express';

import { 
    handleTimeInRequest, 
    handleTimeOutRequest, 
    handleLunchBreakRequest, 
    handleEndLunchBreakRequest, 
    handleGetActivityRequest 
} from '../controller/time-in-out-controller.js';


const timeInOutRouter = Router();
timeInOutRouter.use(json());

timeInOutRouter.get('/health', (req, res) => {
    res.status(200).send({status: 'UP'});
});

timeInOutRouter.post('/time-in', handleTimeInRequest);
timeInOutRouter.post('/time-out', handleTimeOutRequest);
timeInOutRouter.post('/lunch-break', handleLunchBreakRequest);
timeInOutRouter.post('/end-lunch-break', handleEndLunchBreakRequest);
timeInOutRouter.get('/activity', handleGetActivityRequest);

export { 
    timeInOutRouter
};