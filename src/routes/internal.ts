import express from "express"
import { auth, requireAdmin } from "../middleware/auth";
import { Permission } from "../types";
import { randomUUID } from "crypto";
import User from '../models/userModel'
import { addUser } from "../serivces/internalService";

const internalRouter = express();
internalRouter.use(auth);
internalRouter.use(requireAdmin);

internalRouter.post('/users', addUser);

export default internalRouter;