# User Registration API Documentation

## Register User
Endpoint to register a new user in the system.

### Endpoint
```
POST /users/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string", // minimum 5 characters
    "lastname": "string"   // minimum 5 characters
  },
  "email": "string",      // valid email format
  "password": "string"    // minimum 6 characters
}
```

### Validation Rules
- `fullname.firstname`: Must be at least 5 characters long (max 30 characters)
- `fullname.lastname`: Must be at least 5 characters long (max 30 characters)
- `email`: Must be a valid email format
- `password`: Must be at least 6 characters long

### Responses

#### Success Response
**Code**: `201 Created`

**Response Body**:
```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  },
  "token": "string" // JWT token valid for 1 hour
}
```

#### Error Response
**Code**: `400 Bad Request`

**Response Body**:
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Security
- Password is hashed using bcrypt before storing
- Returns JWT token that expires in 1 hour
- Email must be unique in the system