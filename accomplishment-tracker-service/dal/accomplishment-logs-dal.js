import { getDB } from "../util/db-connection.js";

//FIXME: This isn't ideal, using mongoose would be better than these raw queries, this current approach doesn't guarantee data integrity
// but for now, this is a quick fix to get the service running

async function saveAccomplishment(userId, date, accomplishmentData) {
    const db = getDB();
    const collection = db.collection('accomplishmentTracker');
    
    if (!userId || !date || !accomplishmentData) {
        throw new Error('User ID, date, and accomplishment data are required');
    }
    
    try {
        const result = await collection.updateOne(
            { userId: userId },
            { 
                $set: { 
                    [`dates.${date}.accomplishmentLog`]: accomplishmentData
                }
            },
            { upsert: true }
        );
        return result;
    } catch (error) {
        console.error('Error saving accomplishment:', error);
        throw error;
    }
}

async function updateAccomplishment(userId, date, updatedData) {
    const db = getDB();
    const collection = db.collection('accomplishmentTracker');
    
    if (!userId || !date || !updatedData) {
        throw new Error('User ID, date, and updated data are required');
    }
    
    try {
        const result = await collection.updateOne(
            { userId: userId },
            { 
                $set: { 
                    [`dates.${date}.accomplishmentLog`]: updatedData
                }
            }
        );
        
        if (result.matchedCount === 0) {
            throw new Error(`No accomplishment found for user ${userId} on date ${date}`);
        }
        
        return result;
    } catch (error) {
        console.error('Error updating accomplishment:', error);
        throw error;
    }
}

export { saveAccomplishment, updateAccomplishment};