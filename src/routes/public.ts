import express from 'express'
import User from '../models/userModel'

const router = express();

router.get('/logs', async (req, res) => {
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    const token = req.header("authorization-token");

    // Request validation
    if (!from || !to) {
        return res.status(400).send('Invalid request: "from" and "to" query parameters are required.');
    }
    try {
        const user = User.findOne({token});
        if(!user) {
            return res.status(401).send('User not found');
        }
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).send("Internal server error");
    }

    return res.status(200).send();
});

export default router;