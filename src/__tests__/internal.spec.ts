import { logParser } from '../fileParser';
import { auth, requireAdmin } from '../middleware/auth';
import request from 'supertest';
import { app } from '../app';
import { NextFunction } from 'express';
import mongoose from 'mongoose';

jest.mock('../models/userModel', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

import User from '../models/userModel'


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
      // your mocked auth here
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

const mockUser = {
  username: 'testuser',
  token: 'some-token',
  permissions: ['read'],
};

(User.create as jest.Mock).mockResolvedValue(mockUser);

describe('POST /internal/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with 201 and created user on valid input', async () => {
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app)
      .post('/internal/users')  // Adjust route as per your router
      .send({
        username: 'testuser',
        permissions: ['read'],
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      username: mockUser.username,
      token: mockUser.token,
      permissions: mockUser.permissions,
    });

    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      token: expect.any(String),  // because your controller generates a UUID
      permissions: ['read'],
    });
  });

  it('should respond with 400 if username is missing', async () => {
    const res = await request(app)
      .post('/internal/users')
      .send({
        permissions: ['read'],
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'username and permissions are required' });
  });

  it('should respond with 400 if permissions are missing', async () => {
    const res = await request(app)
      .post('/internal/users')
      .send({
        username: 'testuser'
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'username and permissions are required' });
  });

  it('should respond with 500 on server error', async () => {
    (User.create as jest.Mock).mockRejectedValue(new Error('DB failure'));

    const res = await request(app)
      .post('/internal/users')
      .send({
        username: 'failuser',
        permissions: ['read'],
      });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });

  afterAll(() => {
    mongoose.connection.close();
  })
});