import express from 'express';
import { handleGetAccomplishments, handleFormSubmission, handleUpdateAccomplishment } from '../controller/accomplishment-logs-controller.js';

//Middleware import
import {requireRoleOrOwnership } from '../middleware/jwt-middleware.js'

const accomplishmentFormRouter = express.Router();
accomplishmentFormRouter.use(express.json());

accomplishmentFormRouter.get('/health', (req, res) => {
    res.status(200).send({status: 'UP'});
});
accomplishmentFormRouter.post('/submit', handleFormSubmission);
accomplishmentFormRouter.get('/form', requireRoleOrOwnership('admin'), handleGetAccomplishments);
accomplishmentFormRouter.post('/form', requireRoleOrOwnership('admin'), handleUpdateAccomplishment);


export { accomplishmentFormRouter };