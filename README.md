Features

List incidents with pagination, search, and filter by severity/status.

View incident details, edit status, owner, and summary.

Create new incidents with validation.

REST API with structured endpoints.

Backend powered by Prisma ORM with PostgreSQL.


Tech Stack

Frontend: React, React Hooks

Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Prisma


Setup & Run Instructions

Prerequisites
PostgreSQL (running and accessible)

npm or yarn

Backend

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Setup environment variables: create a .env file with:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
PORT=4000

Generate Prisma client:

npx prisma generate

Apply database migrations:

npx prisma migrate dev --name init


Start backend server:

npm run dev

Backend runs at: http://localhost:4000

Frontend

Navigate to the frontend directory:

cd frontend


Install dependencies:

npm install


Start frontend development server:

npm start

Frontend runs at: http://localhost:3000

Make sure the backend is running at http://localhost:4000/api/incidents



| Method | Endpoint             | Description                                                                      | Request Body                                     |
| ------ | -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
| GET    | `/api/incidents`     | Get list of incidents (supports `page`, `limit`, `search`, `severity`, `status`) | N/A                                              |
| GET    | `/api/incidents/:id` | Get a single incident by ID                                                      | N/A                                              |
| POST   | `/api/incidents`     | Create a new incident                                                            | `{ title, service, severity, owner?, summary? }` |
| PATCH  | `/api/incidents/:id` | Update an existing incident                                                      | `{ status?, owner?, summary? }`                  |




Design Decision  and Tradeoff


Pagination & Filtering:

Backend handles pagination and filtering via query parameters.

Tradeoff: No infinite scroll; page-based navigation is simpler and faster to implement.

Data Fetching:

Used fetch API for simplicity.

Tradeoff: No caching; could use React Query or SWR for better UX in production.

Validation:

Used Zod on backend to ensure API data consistency.

Tradeoff: Frontend lacks form-level validation beyond required fields; can be improved.

Prisma ORM:

Provides type safety and easy migrations
