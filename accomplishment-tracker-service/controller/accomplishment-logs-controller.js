import redisClient from "../util/redis-util.js";
import { getCurrentDateTime } from "./time-log-controller.js";
import { getCurrentActivity } from "../util/time-log-cache-utility.js";
import { TimeLogNotFoundError } from "../error/time-log-cache-error.js";

//DAL Imports 
import { saveTimeLog } from "../dal/time-logs-dal.js";
import { saveAccomplishment, getAccomplishment, updateAccomplishment } from "../dal/accomplishment-logs-dal.js";
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

        console.log("Time logs retrieved from cache:", timeLogs);
        await saveTimeLog(userId, currentDateTime.date, timeLogs); // Save time log to the database
        await saveAccomplishment(userId, currentDateTime.date, formData); // Save form data to the database

        return res.status(200).send({ message: 'Form submitted successfully', formData, timeLogs });
    }catch(error) {
        if(error instanceof TimeLogNotFoundError){
            return res.status(404).send({ error: error.message });
        }
        console.log(error)
        return res.status(500).send({ error: 'Internal server error' });
    }
}

async function handleGetAccomplishments(req,res) {
    const currentUserId = req.user.userId;
    const { userId, date } = req.query;

    const accomplishment = await getAccomplishment(userId, date)
    console.log(accomplishment)
    return res.status(200).send({accomplishmentLogs: accomplishment})
}

async function handleUpdateAccomplishment(req, res){
    const currentUserId = req.user.userId
    const { userId, date } = req.query
    const { updatedData } = req.body

    try{
        await updateAccomplishment(userId, date, updatedData)
    }catch(error) {
        console.log(error)
        res.status(500).send({message:"Error saving updates, please try again"})
    }

    res.status(200).send({message:"saved successfully"})
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
        console.log(formData.status)
        console.log(formData.percentageOfActivity)
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

export { handleFormSubmission, handleGetAccomplishments, handleUpdateAccomplishment };