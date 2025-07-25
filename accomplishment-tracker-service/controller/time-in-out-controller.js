import redisClient from "../util/redis-util.js"
import { getCurrentActivity, setCurrentActivity} from "../util/time-log-cache-utility.js";

async function handleTimeInRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    const timeLogs = {
        timeIn: currentDateTime.time,
    }

    //add time log to cache
    try{
        await setCurrentActivity(userId, currentDateTime.date, timeLogs);
        return res.status(200).send({ message: 'Time in recorded successfully', timeLogs });
    } catch (error) {
        console.error('Error saving time log:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

async function handleTimeOutRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();
    
    try{
        const timeLogs = await getCurrentActivity(userId, currentDateTime.date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No time in record found for today' });
        }

        timeLogs.timeOut = currentDateTime.time;
        await setCurrentActivity(userId, currentDateTime.date, timeLogs);
        return res.status(200).send({ message: 'Time out recorded successfully', timeLogs });
    } catch (error) {
        console.error('Error updating time log:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

function handleLunchBreakRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    try{
        const timeLogs = getCurrentActivity(userId, currentDateTime.date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No time in record found for today' });
        }

        timeLogs.lunchBreakStart = currentDateTime.time;
        redisClient.hSet(`time-log:${userId}:${currentDateTime.date}`, JSON.stringify(timeLogs));
        return res.status(200).send({ message: 'Lunch break started successfully', timeLogs });
    } catch (error) {
        console.error('Error starting lunch break:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

async function handleEndLunchBreakRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    try{
        const timeLogs = await getCurrentActivity(userId, currentDateTime.date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No lunch break record found for today' });
        }

        timeLogs.lunchBreakEnd = currentDateTime.time;
        await setCurrentActivity(userId, currentDateTime.date, timeLogs);
        return res.status(200).send({ message: 'Lunch break ended successfully', timeLogs });
    } catch (error) {
        console.error('Error ending lunch break:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

async function handleGetActivityRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    try{
        const timeLogs = await getCurrentActivity(userId, currentDateTime.date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No activity record found for today' });
        }
        return res.status(200).send({ message: 'Activity retrieved successfully', timeLogs });
    } catch (error) {
        console.error('Error retrieving activity:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

// Helper functions
function getCurrentDateTime() {
    const now = new Date();
    return {
        date: now.toISOString().split('T')[0],
        time: now.toISOString().split('T')[1].split('.')[0]
    };
}


export {
    handleTimeInRequest,
    handleTimeOutRequest,
    handleLunchBreakRequest,
    handleEndLunchBreakRequest,
    handleGetActivityRequest,
    getCurrentDateTime
}