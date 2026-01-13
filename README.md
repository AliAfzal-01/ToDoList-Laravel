ALI AFZAL
0304-4354495
backend:Laravel
https://github.com/AliAfzal-01/ToDoList-NuxtLaravel.git
timeConsumed:3 hours

# Full-Stack Task Management Module

A robust Mini Task Management system built with **Laravel 11** (Backend) and **Nuxt 3** (Frontend).

## 🚀 Features
- **Authentication**: Secure JWT-based login/logout with cookie persistence.
- **Task Management**: Create, Read, Update, and Delete tasks.
- **Filtering**: Filter tasks by status (All, Pending, Completed).
- **Responsive UI**: Premium, dark-mode inspired design.
- **Architecture**: Single Page Application (SPA) with separate API.

---

## 🛠 Prerequisites
Before you begin, ensure you have the following installed on your system:
- **PHP** (v8.2 or higher)
- **Composer** (Dependency Manager for PHP)
- **Node.js** (v18 or higher)
- **NPM** (Node Package Manager)
- **Git**

---

## 📦 Installation Guide

Follow these steps to set up the project on a new machine.

### 1. Backend Setup (Laravel)

Navigate to the backend directory:
```bash
cd task-api
```

**Step 1.1: Install Dependencies**
```bash
composer install
```

**Step 1.2: Environment Setup**
Duplicate the example environment file:
```bash
cp .env.example .env
```

**Step 1.3: Generate Keys**
Generate the application encryption key:
```bash
php artisan key:generate
```
Generate the JWT authentication secret:
```bash
php artisan jwt:secret
```

**Step 1.4: Database Setup**
Set up the SQLite database and seed it with test data:
*(Type 'yes' if asked to create the database file)*
```bash
php artisan migrate --seed
```

**Step 1.5: Start the Server**
Start the backend server on port 8000:
```bash
php artisan serve --port=8000
```
> The API will be available at `http://127.0.0.1:8000/api`. Do not close this terminal.

---

### 2. Frontend Setup (Nuxt 3)

Open a **new terminal** window and navigate to the frontend directory:
```bash
cd task-frontend
```

**Step 2.1: Install Dependencies**
```bash
npm install
```

**Step 2.2: Start Development Server**
Start the frontend application:
```bash
npm run dev
```
> The application will be available at `http://localhost:3000`.

---

## 🔑 Login Credentials

Use the following seeded credentials to log in:

- **Email:** `test@example.com`
- **Password:** `password`

---

## 🐛 Common Troubleshooting

**1. "Target class [AuthController] does not exist" or 500 Error**
If you encounter class loading issues, clear the Laravel caches:
```bash
cd task-api
php artisan optimize:clear
composer dump-autoload
```

**2. "MissingAppKeyException"**
If you see an app key error, run:
```bash
cd task-api
php artisan key:generate
```

**3. Frontend 500 TSConfckParseError**
If the frontend fails to build, try cleaning the cache:
```bash
cd task-frontend
npx nuxi cleanup
npx nuxi prepare
npm run dev
```

---

## 📂 Project Structure

- `task-api/`: Laravel Backend (Controllers, Models, Migrations)
  - `app/Models/User.php`: Implements `JWTSubject`.
  - `routes/api.php`: API routes configuration.
- `task-frontend/`: Nuxt Frontend (Pages, Stores, Composables)
  - `stores/task.store.ts`: Pinia store for task logic.
  - `pages/login.vue`: Login page component.
  - `composables/useApi.ts`: API wrapper.
