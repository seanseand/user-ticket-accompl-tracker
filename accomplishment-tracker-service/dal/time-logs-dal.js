import {getDB} from '../util/mongo-util.js';

//FIXME: This isn't ideal, using mongoose would be better than these raw queries, this current approach doesn't guarantee data integrity
// but for now, this is a quick fix to get the service running

async function getTimeLogsByUserId(userId, date = null) {
    const db = getDB();
    const collection = db.collection('accomplishmentTracker');
    if (!userId) {
        throw new Error('User ID is required to fetch time logs');
    }
    try {
        const userDoc = await collection.findOne({ userId: userId }, {projection: { _id: 0 }});
        if (!userDoc) {
            throw new Error(`No time logs found for user ${userId}`);
        }
        
        if (date) {
            // Return specific date's time log
            // NOTE: Technically this returns a accomplishment logs as well
            const dateLog = userDoc.dates?.[date];
            if (!dateLog) {
                throw new Error(`No time logs found for user ${userId} on date ${date}`);
            }
            return dateLog;
        }
        
        // Return all dates for the user
        return userDoc.dates || {};
    } catch (error) {
        console.error('Error fetching time logs:', error);
        throw error;
    }
}

async function getAllTimeLogs() {
    const db = getDB();
    const collection = db.collection('accomplishmentTracker');
    
    try {
        // Use aggregation to extract only timeLogs
        const pipeline = [
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    timeLogs: {
                        $objectToArray: "$dates"
                    }
                }
            },
            {
                $unwind: "$timeLogs"
            },
            {
                $project: {
                    userId: 1,
                    date: "$timeLogs.k",
                    timeLogs: "$timeLogs.v.timeLogs"
                }
            },
            {
                $match: {
                    timeLogs: { $exists: true }
                }
            }
        ];
        
        const allTimeLogs = await collection.aggregate(pipeline).toArray();
        return allTimeLogs;
    } catch (error) {
        console.error('Error fetching all time logs:', error);
        throw error;
    }
}

async function saveTimeLog(userId, date, timeLog) {
    const db = getDB();
    const collection = db.collection('accomplishmentTracker');

    try {
        console.log("Saving...")
        const result = await collection.updateOne(
            { userId: userId }, // Find by userId only
            { 
                $set: { 
                    [`dates.${date}.timeLogs`]: timeLog // Set the entire timeLog object for this date
                }
            },
            { upsert: true },
            { projection: { _id: 0 } }
        );
        return result;
    } catch (error) {
        console.error('Error saving time log:', error);
        throw error;
    }
}

async function updateTimeLogField(userId, date, fieldName, fieldValue) {
    const db = getDB();
    const collection = db.collection('accomplishmentTracker');

    try {
        const result = await collection.updateOne(
            { userId: userId },
            { 
                $set: { 
                    [`dates.${date}.timeLogs.${fieldName}`]: fieldValue 
                }
            },
            { upsert: true },
            { projection: { _id: 0 } }
        );
        return result;
    } catch (error) {
        console.error('Error updating time log field:', error);
        throw error;
    }
}

export { getTimeLogsByUserId, getAllTimeLogs, saveTimeLog, updateTimeLogField };