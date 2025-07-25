import express from 'express'
import { auth } from '../middleware/auth';
import { logParser } from '../fileParser';
import { getById, getByTimestamp } from '../serivces/publicService';

const publicRouter = express();
publicRouter.use(auth);

publicRouter.get('/logs', getByTimestamp);

publicRouter.get('/logs/:uuid', getById);

export default publicRouter;