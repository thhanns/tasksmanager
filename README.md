# TaskFlow - Task Manager

A full-stack task management application where users can register, log in, and manage their personal tasks with a clean dashboard interface.

## Features

- **User Authentication** - Register and log in with JWT-based sessions
- **Task CRUD** - Create, read, update, and delete tasks
- **Task Statuses** - Organize tasks as To Do, In Progress, or Done
- **Search & Filter** - Find tasks by keyword or filter by status
- **Pagination** - Browse through tasks page by page
- **Stats Dashboard** - See task counts at a glance
- **Responsive Design** - Works on desktop and mobile
- **Secure** - Passwords hashed with bcrypt, protected routes, input validation

## Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React, TailwindCSS, Vite |
| Backend  | Node.js, Express      |
| Database | MongoDB (Mongoose)    |
| Auth     | JWT + bcrypt          |

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & app configuration
│   │   ├── controllers/     # Route handlers (auth, tasks)
│   │   ├── middleware/      # Auth guard & error handler
│   │   ├── models/          # User & Task schemas
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # Token generation helper
│   │   └── server.js        # Express app entry point
│   ├── .env                 # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/      # Sidebar, TaskCard, TaskForm, etc.
    │   ├── context/         # AuthContext (global auth state)
    │   ├── hooks/           # useTasks (data fetching hook)
    │   ├── pages/           # Login, Register, Dashboard
    │   ├── services/        # Axios API client
    │   ├── App.jsx          # Route definitions
    │   └── main.jsx         # React entry point
    ├── index.html
    └── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A MongoDB database (free tier on [MongoDB Atlas](https://www.mongodb.com/atlas) works great)

### 1. Clone the repository

```bash
git clone (https://github.com/thhanns/tasksmanager)
cd task-manager
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_string_here
JWT_EXPIRE=7d
NODE_ENV=development
```

> Replace `<username>` and `<password>` with your MongoDB Atlas credentials.
> Generate a random JWT secret with: `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`

Start the backend:

```bash
npm run dev
```

The API will run at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:3000`.

### 4. Use the app

1. Open **http://localhost:3000** in your browser
2. Click **"Create one"** to register a new account
3. Start creating and managing your tasks

## API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication

| Method | Endpoint      | Description         | Auth Required |
| ------ | ------------- | ------------------- | ------------- |
| POST   | /auth/register | Create a new account | No            |
| POST   | /auth/login    | Log in, get JWT token | No            |
| GET    | /auth/me       | Get current user info | Yes           |

### Tasks

| Method | Endpoint    | Description                | Auth Required |
| ------ | ----------- | -------------------------- | ------------- |
| GET    | /tasks      | List tasks (with filters)  | Yes           |
| POST   | /tasks      | Create a new task          | Yes           |
| GET    | /tasks/:id  | Get a single task          | Yes           |
| PUT    | /tasks/:id  | Update a task              | Yes           |
| DELETE | /tasks/:id  | Delete a task              | Yes           |
| GET    | /tasks/stats | Get task count by status  | Yes           |

### Query Parameters for GET /tasks

| Param  | Type   | Description                         |
| ------ | ------ | ----------------------------------- |
| status | string | Filter by `todo`, `in-progress`, or `done` |
| search | string | Search title and description        |
| page   | number | Page number (default: 1)            |
| limit  | number | Items per page (default: 10)        |
| sort   | string | Sort field (default: `-createdAt`)  |

### Example Requests

**Register:**
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Create Task:**
```json
POST /tasks
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "Finish project",
  "description": "Complete the README and deploy",
  "status": "todo"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "672a1b...",
    "title": "Finish project",
    "description": "Complete the README and deploy",
    "status": "todo",
    "createdAt": "2026-05-06T..."
  }
}
```

## Security

- Passwords hashed with **bcrypt** (12 salt rounds)
- **JWT** authentication with configurable expiry
- **Rate limiting** - 100 requests per 15 minutes per IP
- **Input validation** on all endpoints via express-validator
- **MongoDB injection prevention** via express-mongo-sanitize
- **HTTP security headers** via Helmet
- Users can only access **their own tasks**

## Deployment

### Backend - Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables (MONGODB_URI, JWT_SECRET, etc.)

### Frontend - Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Set root directory to `frontend`
4. Framework: Vite
5. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`
6. Update `src/services/api.js` to use:
   ```js
   const API_BASE = import.meta.env.VITE_API_URL || '/api';
   ```

## License

MIT
