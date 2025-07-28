import { Router, json } from 'express';

import { 
    handleTimeInRequest, 
    handleTimeOutRequest, 
    handleLunchBreakRequest, 
    handleEndLunchBreakRequest, 
    handleGetActivityRequest ,
    handleGetTimeLogsByUserId,
    handleGetAllTimeLogs
} from '../controller/time-log-controller.js';
import { allowedRoles, requireRoleOrOwnership } from '../middleware/jwt-middleware.js';


const timeInOutRouter = Router();
timeInOutRouter.use(json());

timeInOutRouter.get('/health', (req, res) => {
    res.status(200).send({status: 'UP'});
});

//time-in-out routes
timeInOutRouter.post('/time-in', handleTimeInRequest);
timeInOutRouter.post('/time-out', handleTimeOutRequest);
timeInOutRouter.post('/lunch-break', handleLunchBreakRequest);
timeInOutRouter.post('/end-lunch-break', handleEndLunchBreakRequest);
timeInOutRouter.get('/activity', handleGetActivityRequest);

// Time Log Routes
timeInOutRouter.get('/timelogs', allowedRoles('admin'), handleGetAllTimeLogs);
timeInOutRouter.get('/timelogs/:userId', requireRoleOrOwnership('admin'), handleGetTimeLogsByUserId);


export { 
    timeInOutRouter
};