import redisClient from "../util/redis-util.js"

async function handleTimeInRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    const timeLogs = {
        timeIn: currentDateTime.time,
    }

    //add time log to cache
    try{
        await redisClient.hSet(`time-log:${userId}:${currentDateTime.date}`, JSON.stringify(timeLogs));
        await redisClient.setEx(`time-log:${userId}:${currentDateTime.date}`, JSON.stringify(timeLogs), 60 * 60 * 24 * 2); // Set expiration to 2 days
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
        await redisClient.hSet(`time-log:${userId}:${currentDateTime.date}`, JSON.stringify(timeLogs));
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

function handleEndLunchBreakRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    try{
        const timeLogs = getCurrentActivity(userId, currentDateTime.date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No lunch break record found for today' });
        }

        timeLogs.lunchBreakEnd = currentDateTime.time;
        redisClient.hSet(`time-log:${userId}:${currentDateTime.date}`, JSON.stringify(timeLogs));
        return res.status(200).send({ message: 'Lunch break ended successfully', timeLogs });
    } catch (error) {
        console.error('Error ending lunch break:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

function handleGetActivityRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    try{
        const timeLogs = getCurrentActivity(userId, currentDateTime.date);
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

async function getCurrentActivity(userId, date) {
    try{
        const activity = await redisClient.hGet(`time-log:${userId}:${date}`);
        if (!activity) {
            throw new Error('No activity found for the given date');
        }
        return JSON.parse(activity);
    }catch (error) {
        console.error('Error retrieving current activity:', error);
        throw new Error('Failed to retrieve current activity'); // Should throw an object of type Error (for code improvement)
    }

}

export {
    handleTimeInRequest,
    handleTimeOutRequest,
    handleLunchBreakRequest,
    handleEndLunchBreakRequest,
    handleGetActivityRequest
}