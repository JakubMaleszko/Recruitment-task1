import express from 'express'
import path from 'path';
import { auth } from '../middleware/auth';
import { logParser } from '../fileParser';

const router = express();
const filePath = path.join(__dirname, '..', '..', 'data', 'events.log');

router.get('/logs', auth, async (req, res) => {
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    let response;
    // Request validation
    if (!from || !to) {
        return res.status(400).send({ error: 'Invalid request: "from" and "to" query parameters are required.' });
    }
    const fromDate = new Date(from);
    const toDate = new Date(to);
    response = logParser(filePath, { from: fromDate, to: toDate });
    if (!response) {
        return res.status(404).send('Log not found');
    }
    return res.status(200).send(response);
});

router.get('/logs/:uuid', auth, async (req, res) => {
    const { uuid } = req.params;
    let response;
    // Request validation
    if (!uuid) {
        return res.status(400).send('Invalid request: "uuid" query parameter is required.');
    }

    response = logParser(filePath, { uuid });
    if (!response) {
        return res.status(404).send('Log not found');
    }

    return res.status(200).send(response[0]);
});

export default router;