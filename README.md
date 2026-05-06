# Ethar.ai — Team Task Manager

A full-stack ClickUp-inspired project and task management application built as a company assignment.

## 🚀 Live Demo
> [https://ethar-web.vercel.app](https://ethar-web.vercel.app) *(replace with your deployed URL)*

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, NextAuth.js, TypeScript, CSS Modules |
| Backend | Express.js 5, TypeScript, Prisma ORM |
| Database | PostgreSQL (Production) / SQLite (Development) |
| Auth | JWT + NextAuth Credentials Provider |
| Validation | Zod |
| Deployment | Vercel (Frontend) + Railway (Backend + DB) |

## 🔑 Key Features

- ✅ **Authentication** — Signup, Login with JWT sessions
- ✅ **Role-Based Access** — Admin and Member roles
- ✅ **Projects** — Create and manage projects (Admin only)
- ✅ **Tasks** — Create, assign, and track tasks
- ✅ **Kanban Board** — Visual task board (TODO / IN PROGRESS / REVIEW / DONE)
- ✅ **Dashboard** — Stats overview with overdue task alerts
- ✅ **Team Management** — Admin can view all team members
- ✅ **Input Validation** — Zod schema validation on all API endpoints

## 📁 Project Structure

```
ethar.ai/
├── ethar-backend/          # Express.js REST API
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API route definitions
│   │   ├── middlewares/    # Auth & validation middleware
│   │   ├── config/         # DB connection
│   │   └── validation/     # Zod schemas
│   └── prisma/             # DB schema & seed
│
└── ethar-web/              # Next.js Frontend
    └── src/app/
        ├── page.tsx        # Dashboard
        ├── login/          # Login page
        ├── signup/         # Signup page
        ├── projects/       # Projects list & create
        ├── tasks/          # Kanban board & create
        └── team/           # Team management (Admin)
```

## ⚙️ Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ethar.ai.git
cd ethar.ai
```

### 2. Backend Setup
```bash
cd ethar-backend
npm install

# Create .env file with:
# DATABASE_URL="file:./dev.db"
# JWT_SECRET="your-secret-key"
# PORT=5000

npx prisma db push
npm run seed
npm run dev
```

### 3. Frontend Setup
```bash
cd ethar-web
npm install

# Create .env.local with:
# NEXTAUTH_SECRET="your-nextauth-secret"
# NEXTAUTH_URL="http://localhost:3000"

npm run dev
```

### 4. Open the App
Visit → **http://localhost:3000**

## 🔑 Default Login Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@ethar.ai` | `admin123` |
| **Member** | `member@ethar.ai` | `member123` |

## 🌐 Deployment

### Backend → Railway
1. Create a Railway project, add a PostgreSQL database plugin
2. Deploy `ethar-backend` — set `DATABASE_URL`, `JWT_SECRET`, `PORT`
3. Run `npx prisma db push` and `npm run seed`

### Frontend → Vercel
1. Import `ethar-web` on Vercel
2. Set `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_API_URL`

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login | Public |
| GET | `/api/projects` | Get all projects | Member |
| POST | `/api/projects` | Create project | Admin only |
| GET | `/api/tasks` | Get my tasks | Member |
| POST | `/api/tasks` | Create task | Member |
| PATCH | `/api/tasks/:id/status` | Update task status | Member |
| GET | `/api/team` | Get team members | Member |

## 👤 Author
**Rudra** — Ethar.ai Assignment Submission
