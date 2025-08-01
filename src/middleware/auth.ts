import { Request, Response, NextFunction } from 'express'
import User from '../models/userModel'

export async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization-token');
    if (!token) {
        return res.status(401).json({ error: 'Missing authorization-token header' });
    }
    try {
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        (req as any).user = user;
        next();
    } catch (err) {
        console.log("Error on auth:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
    }

    next();
}
