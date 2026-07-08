# 📚 SPK Wiki

A modern personal knowledge management system built with **Next.js**, **Express.js**, and **MongoDB**.

SPK Wiki helps you create, organize, and manage articles, documentation, notes, and learning resources in one place.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* Secure password hashing
* User roles (Admin / Editor / User)
* Profile management
* Account settings

### 📖 Wiki Management

* Create articles
* Edit articles
* Delete articles
* View articles
* Categories
* Tags
* Favorites
* Search functionality

### 📊 Dashboard

* Overview statistics
* Recent articles
* Favorite articles
* Activity tracking
* Quick actions

### 👤 User Profile

* Avatar support
* Bio information
* Account status
* User statistics

### 🎨 UI Features

* Responsive design
* Modern dashboard layout
* Tailwind CSS styling
* Dark mode support (planned)

---

# 🛠️ Tech Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT Authentication
* bcrypt password hashing

---

# 📂 Project Structure

```
spk/
│
├── client/                 # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
│
├── server/                 # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/samlothphearak/spkwiki.git

cd spkwiki
```

---

# Backend Setup

Go to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Server runs:

```
http://localhost:5000
```

---

# Frontend Setup

Go to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs:

```
http://localhost:3000
```

---

# 🔌 API Routes

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

## Wiki

```
GET      /api/wiki
GET      /api/wiki/:id
POST     /api/wiki
PUT      /api/wiki/:id
DELETE   /api/wiki/:id
```

---

# 📸 Screenshots

(Add screenshots here)

```
Coming soon...
```

---

# 🗺️ Roadmap

## Completed

* [x] Project setup
* [x] Express server
* [x] MongoDB integration
* [x] Authentication system
* [x] Dashboard UI
* [x] Profile page

## Planned

* [ ] Markdown editor
* [ ] Image upload
* [ ] Article version history
* [ ] Comments system
* [ ] Full-text search
* [ ] Notifications
* [ ] Dark mode

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Samloth Phearak**

Management Information System Student

Built with ❤️ using Next.js + Express + MongoDB

```
```
