import redisClient from "../util/redis-util.js"
import { getCurrentActivity, setCurrentActivity} from "../util/time-log-cache-utility.js";
import { getAllTimeLogs, getTimeLogsByUserId } from "../dal/time-logs-dal.js";
import { TimeLogSaveError, TimeLogNotFoundError } from "../error/time-log-cache-error.js";

async function handleTimeInRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    const timeLogs = {
        timeIn: currentDateTime.time,
    }
    try{
        const existingActivity = await getCurrentActivity(userId, currentDateTime.date);
        if (existingActivity) {
            return res.status(400).send({ error: 'Time in already recorded for today' });
        }
    }catch (error) {
      if (!(error instanceof TimeLogNotFoundError)) {
            // If the error is not a TimeLogNotFoundError, it means there was an issue checking the existing activity
            console.error("Error checking existing activity:", error);
            return res.status(500).send({ error: "Internal server error" });
      }
      // No existing activity, proceed to set new time in
    }

    //add time log to cache
    try{
        await setCurrentActivity(userId, currentDateTime.date, timeLogs);
        return res.status(200).send({ message: 'Time in recorded successfully', timeLogs });
    } catch (error) {
        if (error instanceof TimeLogSaveError) {
            return res.status(400).send({ error:"Failed to save time log" });
        }
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
        if (error instanceof TimeLogNotFoundError){
            return res.status(404).send({ error: "Time in record not found for today" });
        }
        console.error('Error updating time log:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

async function handleLunchBreakRequest(req, res) {
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();

    try{
        const timeLogs = await getCurrentActivity(userId, currentDateTime.date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No time in record found for today' });
        }
        console.log(timeLogs);
        timeLogs.lunchBreakStart = currentDateTime.time;
        redisClient.set(`time-log:${userId}:${currentDateTime.date}`, JSON.stringify(timeLogs));
        return res.status(200).send({ message: 'Lunch break started successfully', timeLogs });
    } catch (error) {
        if (error instanceof TimeLogNotFoundError) {
            return res.status(404).send({ error: "Time in record not found for today" });
        }
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
        if (error instanceof TimeLogNotFoundError) {
            return res.status(404).send({ error: "Lunch break record not found for today" });
        }
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
        if (error instanceof TimeLogNotFoundError) {
            return res.status(404).send({ error: "Activity not found"});
        }
        console.error('Error retrieving activity:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

function getCurrentDateTime() {
    const now = new Date();
    
    // Get local date and time
    const localDate = now.toLocaleDateString('en-CA',{timeZone: 'Asia/Manila'}); // Returns YYYY-MM-DD format
    const localTime = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Asia/Manila',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }); // Returns HH:MM:SS format
    
    return {
        date: localDate,
        time: localTime
    };
}

async function handleGetTimeLogsByUserId(req, res) {
    const userId = req.params.userId;
    const date = req.query.date || getCurrentDateTime().date;

    try {
        const timeLogs = await getTimeLogsByUserId(userId, date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No time logs found for the specified user and date' });
        }
        return res.status(200).send({ message: 'Time logs retrieved successfully', timeLogs });
    } catch (error) {
        console.error('Error retrieving time logs:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

async function handleGetAllTimeLogs(req, res) {
    try {
        const allTimeLogs = await getAllTimeLogs();
        return res.status(200).send({ message: 'All time logs retrieved successfully', allTimeLogs });
    } catch (error) {
        console.error('Error retrieving all time logs:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}


export {
    handleTimeInRequest,
    handleTimeOutRequest,
    handleLunchBreakRequest,
    handleEndLunchBreakRequest,
    handleGetActivityRequest,
    getCurrentDateTime,
    handleGetAllTimeLogs,
    handleGetTimeLogsByUserId
}