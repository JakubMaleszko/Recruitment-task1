import { logParser } from '../fileParser';
import { auth, requireAdmin } from '../middleware/auth';
import request from 'supertest';
import { app } from '../app';
import { NextFunction } from 'express';
import mongoose from 'mongoose';


const mockLog = {
    uuid: '698ae6e0-5e31-40cb-9197-730ef2af90c5',
    time: '2020-07-25T12:00:00.000Z',
    type: 'info',
    message: 'Mocked log'
};

jest.mock('../fileParser', () => ({
  logParser: jest.fn(),
}));
(logParser as jest.Mock).mockReturnValue([mockLog]);
jest.mock('../middleware/auth', () => {
    const originalModule = jest.requireActual('../middleware/auth');
    return {
        ...originalModule,
        auth: (req: Request, res: Response, next: NextFunction) => {
            (req as any).user = {
                username: "admin",
                token: "320ca9c4-ed20-4f09-bcb8-9b34b976b501",
                permissions: [],
                isAdmin: true,
            };
            next();
        }
    };
});

describe('Public service', () => {
describe("GET /public/logs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should respond with 200 and logs when valid timestamps are provided", async () => {
        const res = await request(app).get('/public/logs')
            .query({
                from: '2000-01-02T12:00:00Z',
                to: '2050-01-02T12:00:00Z'
            });

        expect(res.status).toBe(200);
        expect(res.body).toEqual([mockLog]);
    });

    it("should respond with 400, from is missing", async () => {
        const res = await request(app).get('/public/logs')
            .query({ to: '2050-01-02T12:00:00Z' });

        expect(res.status).toBe(400);
    });

    it("should respond with 400, to is missing", async () => {
        const res = await request(app).get('/public/logs')
            .query({ from: '2000-01-02T12:00:00Z' });

        expect(res.status).toBe(400);
    });
});

describe("GET /logs/:uuid", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (logParser as jest.Mock).mockReturnValue([mockLog]);
    });

    it("should respond with 200 when valid uuid is provided", async () => {
        const res = await request(app).get(`/public/logs/${mockLog.uuid}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockLog);
    });

    it("should respond with 404 when log is not found", async () => {
        (logParser as jest.Mock).mockReturnValueOnce(undefined);
        const res = await request(app).get('/public/logs/invalid-uuid');
        expect(res.status).toBe(404);
    });

    it("should respond with 400 when uuid is missing (invalid route)", async () => {
        const res = await request(app).get('/public/logs/');
        expect(res.status).toBe(400); // Route mismatch
    });
});
afterAll(() => {
    mongoose.connection.close();
})
});
