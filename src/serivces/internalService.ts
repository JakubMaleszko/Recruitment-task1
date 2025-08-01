import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { Permission } from "../types";
import User from '../models/userModel'
import { error } from "console";

export const addUser = async (req: Request, res: Response) => {
    const username = req.body.username;
    const permissions: Permission[] = req.body.permissions;
    if (!username || !permissions) return res.status(400).json({ error: 'username and permissions are required' });
    const uuid = randomUUID();
    try {
        const user = await User.create({
            username,
            token: uuid,
            permissions
        });
        if (user) {
            return res.status(201).json({ username: user.username, token: user.token, permissions: user.permissions });
        }
    } catch (err) {
        console.log("Error on adding user:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}