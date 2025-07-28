import redisClient from './redis-util.js';
import { TimeLogCacheError, TimeLogSaveError, TimeLogNotFoundError } from '../error/time-log-cache-error.js';

async function getCurrentActivity(userId, date) {
  try {
    const activity = await redisClient.get(`time-log:${userId}:${date}`);
    if (!activity) {
        throw new TimeLogNotFoundError(userId, date);
    }
    return JSON.parse(activity);
  } catch (error) {
    if (error instanceof TimeLogNotFoundError) {
        throw error; // Re-throw specific errors as-is
    }
    console.error("Error retrieving current activity:", error);
    throw new TimeLogCacheError(`Failed to retrieve activity for user ${userId} on ${date}: ${error.message}`);
  }
}

async function setCurrentActivity(userId, date, activity) {
    try {
        await redisClient.set(`time-log:${userId}:${date}`, JSON.stringify(activity));
        await redisClient.expire(`time-log:${userId}:${date}`, 60 * 60 * 24 * 2); // 2 days expiration
    } catch (error) {
        console.error("Error saving current activity:", error);
        throw new TimeLogSaveError(userId, date, error);
    }
}

export {
    getCurrentActivity,
    setCurrentActivity
};