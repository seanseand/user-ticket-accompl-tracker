import redisClient from "../util/redis-util.js";
import { getCurrentDateTime } from "./time-in-out-controller.js";
import { getCurrentActivity } from "../util/time-log-cache-utility.js";
import { TimeLogNotFoundError } from "../error/time-log-cache-error.js";

//DAL Imports 
import { saveTimeLog } from "../dal/time-logs-dal.js";
import { saveAccomplishmentForm } from "../dal/accomplishment-form-dal.js";
async function handleFormSubmission(req, res) {
    const formData = req.body;
    
    try{
        validateFormData(formData);
    }catch(error) {
        return res.status(400).send({ error: error.message });
    }

    // retrieve time logs from cache
    const userId = req.user.userId;
    const currentDateTime = getCurrentDateTime();
    try {
        const timeLogs = await getCurrentActivity(userId, currentDateTime.date);
        if (!timeLogs) {
            return res.status(404).send({ error: 'No time in record found for today' });
        }

        await saveTimeLog(userId, currentDateTime.date, timeLogs); // Save time log to the database
        await saveAccomplishmentForm(userId, currentDateTime.date, formData); // Save form data to the database

        return res.status(200).send({ message: 'Form submitted successfully', formData, timeLogs });
    }catch(error) {
        if(error instanceof TimeLogNotFoundError){
            return res.status(404).send({ error: error.message });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
}



//TODO: Rework this later to use a more robust validation library, and use custom error classes for better error handling
function validateFormData(formData) {
    if(!formData){
        throw new Error('Form data is required');
    }

    for (const key in formData) {
        if(key == 'percentageOfActivity') {
            continue;
        }
        if (formData[key] === undefined || formData[key] === null) {
            throw new Error(`Field ${key} is required`);
        }
    }

    if (formData.status !== 'Done' && !formData.percentageOfActivity) {
        throw new Error('Percentage of activity is required for non-done status');
    }
}

//Sample JSON
const sampleFormData = {
    "groupName": "Development Team",
    "activityType": "BRTS",
    "module": "LERM",
    "dateAssigned": "2023-10-01",
    "activities": ["Implement new feature", "Fix bugs"],
    "targetEndDate": "2023-10-15",
    "actualEndDate": "2023-10-14",
    "status": "Completed",
    "percentageOfActivity": 100,
    "projectHeads": ["John Doe", "Jane Smith"],
}

export { handleFormSubmission };