# Recruitment-task1

This application uses the following technologies:
-  `Node.js`
-  `Yarn`
-  `Jest` – for testing
-  `Docker` and `Docker Compose` – for containerization
-  `MongoDB` – db
---

  

## Required Environment Variables

  

Before running the application, make sure to set the following environment variables:

  

-  `PORT` – the port your application will run on
-  `MONGODB_URI` – the URI for your [MongoDB](https://www.mongodb.com/) instance
-  `LOGS_PATH` – the path where logs are stored

  

---

  

## Installing Dependencies

  

If you're running the app locally:

  

```bash
yarn  install
```

## Running the application

To build use:
```bash
yarn  build
```

To build and run:

```bash
yarn  start
```
To run in watch mode :

```bash
yarn  dev
```

## Testing application

To run tests locally use:

```bash
yarn  test
```

  

## Running with Docker

Build and start the full environment:

```bash
docker  compose  up  --build
```

Run tests inside the application container:

```bash
docker  compose  run  app  yarn  test
```


##  API Endpoints

### GET `/public/logs?from=...&to=...`

Fetches all logs or a specific range of logs based on timestamp.

**Headers:**
- `authorization-token: UUIDv4`

**Query Parameters:**
- `from` – ISO timestamp (optional)
- `to` – ISO timestamp (optional)
- 
**Returns**
- `uuid` - log identifier
- `time` - log timestamp
- `type` - type of log ( info | warn | error )
- `message` - log message
---

### GET `/public/logs/:uuid`
Fetches a single log entry by its UUID.

**Headers:**
- `authorization-token: UUIDv4`

**Path Parameters:**
- `uuid` - identifier of log 

**Returns:**
- `time` - time in ISO format
- `type` - type of log ( info | warn | error )
- `message` - log message
---
### POST /internal/users
Allows an administrator to create a new non-admin user with specified permissions.

**Headers:**
- `authorization-token: UUIDv4`

**Request Body:**
```json
{
  "username": "Username",
  "permissions": ["read", "create"]
}
```
**Returns:**
- `username` 
- `token` - UUID token for authorization
- `permission` - User permissions