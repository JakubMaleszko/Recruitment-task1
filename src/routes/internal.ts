import express from "express"
import { auth, requireAdmin } from "../middleware/auth";
import { Permission } from "../types";
import { randomUUID } from "crypto";
import User from '../models/userModel'

const internalRouter = express();
internalRouter.use(auth);
internalRouter.use(requireAdmin);

internalRouter.post('/users', async (req, res) => {
    const username = req.body.username;
    const permissions: Permission[] = req.body.permissions;
    const uuid = randomUUID();
    try {
        const user = await User.insertOne({
            username,
            token: uuid,
            permissions
        });
        if (user) {
            return res.status(200).json({ username: user.username, token: user.token, permissions: user.permissions });
        }
    } catch (err) {
        console.log("Error on adding user:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

)

export default internalRouter;