// import { response, Response } from "express";
// import { logParser } from "../fileParser";
// import { getById, getByTimestamp } from "../serivces/publicService";
// import { json } from "stream/consumers";


// jest.mock('../fileParser');

// const mockLog = {
//   uuid: '698ae6e0-5e31-40cb-9197-730ef2af90c5',
//   time: '2020-07-25T12:00:00.000Z',
//   type: 'info',
//   message: 'Mocked log'
// };
// (logParser as jest.Mock).mockReturnValue([mockLog]);

// type MockRequest = {
//   query?: {
//     from?: string;
//     to?: string;
//   },
//   params?: {
//     uuid?: string;
//   };
// }

// describe("getByTimestamp", () => {
//   let mockRequest: MockRequest;
//   let mockResponse: Partial<Response>;
//   let jsonSpy: jest.Mock;
//   let statusSpy: jest.Mock;
//   beforeEach(() => {
//     jest.clearAllMocks();
//     jsonSpy = jest.fn();
//     statusSpy = jest.fn().mockReturnThis();
//     mockResponse = {
//       status: statusSpy,
//       json: jsonSpy,
//     };
//     mockRequest = {
//       query: {}
//     }
//   });

//   it("Should respond with code 200 with valid request", () => {
//     mockRequest.query = { from: '2000-01-02T12:00:00Z', to: '2050-01-02T12:00:00Z' };
//     getByTimestamp(mockRequest as any, mockResponse as any);
//     expect(statusSpy).toHaveBeenCalledWith(200);
//     expect(jsonSpy).toHaveBeenCalledWith([mockLog]);
//   });
//   it("Should respond with code 400, no from query", () => {
//     mockRequest.query = { to: '2050-01-02T12:00:00Z' };
//     getByTimestamp(mockRequest as any, mockResponse as any);
//     expect(statusSpy).toHaveBeenCalledWith(400);
//   });
//   it("Should respond with code 400, no to query", () => {
//     mockRequest.query = { from: '2000-01-02T12:00:00Z' };
//     getByTimestamp(mockRequest as any, mockResponse as any);
//     expect(statusSpy).toHaveBeenCalledWith(400);
//   });
//   it("Should respond with code 400, no parameters", () => {
//     mockRequest.query = {};
//     getByTimestamp(mockRequest as any, mockResponse as any);
//     expect(statusSpy).toHaveBeenCalledWith(400);
//   });

// });


// describe("getById", () => {
//   let mockRequest: MockRequest;
//   let mockResponse: Partial<Response>;
//   let jsonSpy: jest.Mock;
//   let statusSpy: jest.Mock;
//   beforeEach(() => {
//     jest.clearAllMocks();
//     jsonSpy = jest.fn();
//     statusSpy = jest.fn().mockReturnThis();
//     mockResponse = {
//       status: statusSpy,
//       json: jsonSpy,
//     };
//     mockRequest = {
//       params: {}
//     }
//   });

//   it("Should respond with code 200 with valid request", () => {
//     mockRequest.params = {'uuid': '698ae6e0-5e31-40cb-9197-730ef2af90c5'}
//     getById(mockRequest as any, mockResponse as any);
//     expect(statusSpy).toHaveBeenCalledWith(200);
//     expect(jsonSpy).toHaveBeenCalledWith(mockLog);
//   });
//   it("Should respond with code 404, no posts", () => {
//     mockRequest.params = {'uuid': '123ce6e0-5e31-27cb-1497-730ef2af63a7'};
//     (logParser as jest.Mock).mockImplementationOnce(() => {});
//     getById(mockRequest as any, mockResponse as any);
//     expect(statusSpy).toHaveBeenCalledWith(404);
//   });
//     it("Should respond with code 400, no uuid", () => {
//     getById(mockRequest as any, mockResponse as any);
//     expect(statusSpy).toHaveBeenCalledWith(400);
//   });

// })