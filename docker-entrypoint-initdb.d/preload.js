db = db.getSiblingDB('task1');

db.users.insertMany([
  {
    "username": "admin",
    "token": "320ca9c4-ed20-4f09-bcb8-9b34b976b501",
    "permissions": [],
    "isAdmin": true
  },
  {
    "username": "fizzbuzz",
    "token": "a5c9700a-684e-11ea-bc55-0242ac130003",
    "permissions": ["read"]
  },
  {
    "username": "foobar",
    "token": "a5c973fc-684e-11ea-bc55-0242ac130003",
    "permissions": ["read", "create"]
  }
]);