# Finance Data Processing and Access Control Backend

A modular backend system for a finance dashboard that supports secure authentication, role-based access control, financial record management, and analytical dashboard APIs.

Built as part of a backend engineering assessment.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- dotenv
---

## Features

### Authentication & Authorization
- User registration
- Login with JWT
- Password hashing with bcrypt
- Protected routes
- Role-based access control (RBAC)

### Roles
- **Viewer** → read-only dashboard + records
- **Analyst** → records + insights
- **Admin** → full CRUD + user control

## Access Control Matrix

| Action | Viewer | Analyst | Admin |
|---|---:|---:|---:|
| View Records | ✅ | ✅ | ✅ |
| Create Record | ❌ | ❌ | ✅ |
| Update Record | ❌ | ❌ | ✅ |
| Delete Record | ❌ | ❌ | ✅ |
| Dashboard APIs | ✅ | ✅ | ✅ |

---

## Financial Records
- Create records
- Get all records
- Get record by ID
- Update records
- Delete records
- Filtering by:
  - type
  - category
  - date range
---

## Dashboard APIs
- Total income
- Total expenses
- Net balance
- Category-wise totals
- Monthly trend summaries
- Recent transactions

---

## Validation & Reliability
- Required field validation
- Type validation
- Date validation
- Proper status codes
- Invalid MongoDB ID handling
- 404 handling
- Global error middleware

---

## Folder Structure

```text
finance-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── server.js
├── .env.example
└── README.md
```

---

## Architecture Overview

The backend follows a modular layered architecture:

```text
Routes → Middleware → Controllers → Services → Models → Database
```

### Layers
- **Routes** → define API endpoints.
- **Middleware** → authentication, RBAC, validation, error handling.
- **Controllers** → handle HTTP request/response lifecycle.
- **Services** → contain business logic and database query orchestration.
- **Models** → Mongoose schemas and data constraints.

This separation improves maintainability, scalability, and testability.

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

Create `.env`

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/finance_dashboard
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

### 3. Start MongoDB locally

```bash
brew services start mongodb-community
```

### 4. Run backend

```bash
npm run dev
```

---

## How to Test

Use Thunder Client or Postman.

1. Register or login to get JWT token
2. Add token in request headers:

```text
Authorization: Bearer <JWT_TOKEN>
```

3. Test protected routes and dashboard APIs

## Example Dashboard Response

```json
{
  "success": true,
  "data": {
    "totalIncome": 8000,
    "totalExpenses": 2000,
    "netBalance": 6000
  }
}
```

## API Endpoints

### Auth
```text
POST /api/auth/register
POST /api/auth/login
```

### Records
```text
POST   /api/records
GET    /api/records
GET    /api/records/:id
PATCH  /api/records/:id
DELETE /api/records/:id
```

### Dashboard
```text
GET /api/dashboard/summary
GET /api/dashboard/category-summary
GET /api/dashboard/monthly-trends
GET /api/dashboard/recent-transactions
```

---

## Security
- JWT-based authentication
- bcrypt password hashing
- role-based route restrictions
- centralized validation

---

## Sample Request

### Create Record

```http
POST /api/records
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-01",
  "notes": "April salary"
}
```

### Sample Response

```json
{
  "success": true,
  "message": "Record created successfully"
}
```

## Assumptions & Tradeoffs

- MongoDB is used as a local persistence layer for simplicity
- JWT authentication is stateless
- Role management is implemented through middleware-based RBAC
- Validation is implemented using custom middleware for clarity and extensibility
- Aggregations are performed at the database layer for performance
- The system is designed to be easily deployable with environment-based configuration

## Notes
This backend was designed with modular architecture and separation of concerns using controllers, services, middleware, and models.

## Deployment Notes
The backend is currently configured for local MongoDB.
It can be deployed to platforms like Render or Railway by updating the environment variables.
