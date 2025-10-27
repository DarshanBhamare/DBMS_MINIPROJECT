# COVID-19 Vaccination Slot Booking System

A Node.js + Express + MongoDB backend API for managing COVID-19 vaccination slot bookings.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete vaccination slots
- **Data Validation**: Comprehensive input validation for all fields
- **Duplicate Prevention**: Prevents double booking of the same time slot
- **MongoDB Integration**: Robust database operations with Mongoose
- **Error Handling**: Proper error responses and status codes
- **CORS Support**: Cross-origin resource sharing enabled

## API Endpoints

All endpoints are prefixed with `/api/slots`

### GET /
Get all booked vaccination slots

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "age": 35,
      "gender": "Male",
      "vaccineType": "Covaxin",
      "date": "2024-01-15T00:00:00.000Z",
      "time": "10:00 AM",
      "center": "City Hospital",
      "createdAt": "2024-01-10T10:30:00.000Z",
      "updatedAt": "2024-01-10T10:30:00.000Z"
    }
  ]
}
```

### POST /
Book a new vaccination slot

**Request Body:**
```json
{
  "name": "Jane Smith",
  "age": 28,
  "gender": "Female",
  "vaccineType": "Covishield",
  "date": "2024-01-20",
  "time": "02:00 PM",
  "center": "Community Health Center"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Slot booked successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "name": "Jane Smith",
    "age": 28,
    "gender": "Female",
    "vaccineType": "Covishield",
    "date": "2024-01-20T00:00:00.000Z",
    "time": "02:00 PM",
    "center": "Community Health Center",
    "createdAt": "2024-01-10T10:35:00.000Z",
    "updatedAt": "2024-01-10T10:35:00.000Z"
  }
}
```

### PUT /:id
Update an existing vaccination slot

**Request Body:** (Same as POST)
**Response:** (Same as POST with updated data)

### DELETE /:id
Cancel a vaccination slot

**Response:**
```json
{
  "success": true,
  "message": "Slot cancelled successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "name": "Jane Smith",
    "age": 28,
    "gender": "Female",
    "vaccineType": "Covishield",
    "date": "2024-01-20T00:00:00.000Z",
    "time": "02:00 PM",
    "center": "Community Health Center",
    "createdAt": "2024-01-10T10:35:00.000Z",
    "updatedAt": "2024-01-10T10:35:00.000Z"
  }
}
```

## Data Schema

Each vaccination slot contains the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Person's full name (max 100 chars) |
| `age` | Number | Yes | Person's age (1-120) |
| `gender` | String | Yes | Gender: "Male", "Female", or "Other" |
| `vaccineType` | String | Yes | Type of vaccine (max 50 chars) |
| `date` | String | Yes | Vaccination date (ISO format) |
| `time` | String | Yes | Slot time in "HH:MM AM/PM" format |
| `center` | String | Yes | Vaccination center name (max 100 chars) |

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Make sure MongoDB is running on `mongodb://localhost:27017`
   - The database name will be `covid-vaccination-booking`

4. **Environment Configuration:**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/covid-vaccination-booking
   NODE_ENV=development
   ```

## Running the Application

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your environment variables).

## Testing the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Get All Slots
```bash
curl http://localhost:5000/api/slots
```

### Book a New Slot
```bash
curl -X POST http://localhost:5000/api/slots \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 35,
    "gender": "Male",
    "vaccineType": "Covaxin",
    "date": "2024-01-15",
    "time": "10:00 AM",
    "center": "City Hospital"
  }'
```

### Update a Slot
```bash
curl -X PUT http://localhost:5000/api/slots/SLOT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 36,
    "gender": "Male",
    "vaccineType": "Covaxin",
    "date": "2024-01-16",
    "time": "11:00 AM",
    "center": "City Hospital"
  }'
```

### Cancel a Slot
```bash
curl -X DELETE http://localhost:5000/api/slots/SLOT_ID
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "msg": "Validation error message",
      "param": "fieldName",
      "location": "body"
    }
  ]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Database Indexes

The application creates a unique compound index on `(date, time, center)` to prevent double bookings and improve query performance.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
