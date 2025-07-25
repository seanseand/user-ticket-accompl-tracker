import express from 'express';
import { handleFormSubmission } from '../controller/accomplishment-form-controller.js';

const accomplishmentFormRouter = express.Router();
accomplishmentFormRouter.use(express.json());

accomplishmentFormRouter.get('/health', (req, res) => {
    res.status(200).send({status: 'UP'});
});
accomplishmentFormRouter.post('/submit', handleFormSubmission);
export { accomplishmentFormRouter };