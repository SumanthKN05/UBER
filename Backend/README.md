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
    "lastname": "string"   // minimum 2 characters
  },
  "email": "string",      // valid email format
  "password": "string"    // minimum 6 characters
}
```

### Validation Rules
- `fullname.firstname`: Must be at least 5 characters long (max 30 characters)
- `fullname.lastname`: Must be at least 2 characters long (max 30 characters)
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

## Login User
Endpoint to authenticate and login an existing user.

### Endpoint
```
POST /users/login
```

### Request Body
```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Validation Rules
- `email`: Must be a valid email format
- `password`: Must be at least 6 characters long

### Responses

#### Success Response
**Code**: `200 OK`

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

#### Error Responses

**Code**: `400 Bad Request`
- When validation fails

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

**Code**: `401 Unauthorized`
- When email/password combination is invalid

**Response Body**:
```json
{
  "message": "Invalid email or password"
}
```

### Security
- Password comparison is done using bcrypt
- Returns JWT token that expires in 1 hour
- Email and password combination must match database records

## Get User Profile
Endpoint to retrieve the authenticated user's profile.

### Endpoint
```
GET /users/profile
```

### Headers
```
Authorization: Bearer <token>
```

### Responses

#### Success Response
**Code**: `200 OK`

**Response Body**:
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string"
}
```

#### Error Response
**Code**: `401 Unauthorized`
- When no token is provided or token is invalid

**Response Body**:
```json
{
  "message": "No token provided"
}
```

### Security
- Requires valid JWT token in Authorization header
- Token must not be blacklisted

## Logout User
Endpoint to logout the currently authenticated user.

### Endpoint
```
POST /users/logout
```

### Headers
```
Authorization: Bearer <token>
```

### Responses

#### Success Response
**Code**: `200 OK`

**Response Body**:
```json
{
  "message": "Logged out successfully"
}
```

#### Error Response
**Code**: `400 Bad Request`
- When no token is provided

**Response Body**:
```json
{
  "message": "No token provided"
}
```

### Security
- Requires valid JWT token in Authorization header or cookie
- Token is blacklisted after logout
- Clears authentication cookie
- User must be authenticated to access this endpoint

# Captain API Documentation

## Register Captain
Endpoint to register a new captain (driver) in the system.

### Endpoint
```
POST /captains/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string",  // minimum 5 characters
    "lastname": "string"
  },
  "email": "string",       // valid email format
  "password": "string",    // minimum 6 characters
  "vehicle": {
    "color": "string",     // minimum 3 characters
    "plate": "string",     // minimum 3 characters
    "capacity": "number",  // numeric value
    "typeVehicle": "string" // must be "auto", "car", or "motorcycle"
  }
}
```

### Validation Rules
- `fullname.firstname`: Must be at least 5 characters long
- `email`: Must be a valid email format
- `password`: Must be at least 6 characters long
- `vehicle.color`: Must be at least 3 characters long
- `vehicle.plate`: Must be at least 3 characters long
- `vehicle.capacity`: Must be a numeric value
- `vehicle.typeVehicle`: Must be one of: "auto", "car", "motorcycle"

### Responses

#### Success Response
**Code**: `201 Created`

**Response Body**:
```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "typeVehicle": "string"
    }
  },
  "token": "string" // JWT token
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
- Password is hashed before storing
- Returns JWT token for authentication
- Email must be unique in the system
- All fields are required for registration