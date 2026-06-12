# 🎮 QuestLog

QuestLog is a personal game-tracking application inspired by RPG progression systems. Users can manage their gaming backlog, track progress, write personal notes, earn XP, and view statistics about their gaming habits.

Built as a fullstack application using React, GraphQL, Apollo, Prisma, and PostgreSQL.

---

## Features

### Game Management

* Add new games
* Edit existing games
* Delete games
* Track game status

  * Not Started
  * Playing
  * Completed
* Assign genres
* Track supported platforms
* Personal rating support

### Quest Notes

* Add notes to any game
* Edit existing notes
* Delete notes
* Store notes in PostgreSQL

### Progression System

* Earn XP based on game progress
* Character-style level progression
* Visual progression overview

### Statistics

* Total games tracked
* Completed games
* Currently playing games
* Not started games
* Favorite genre

---

## Tech Stack

### Frontend

* React
* React Router
* Apollo Client
* Vite

### Backend

* Node.js
* Apollo Server
* GraphQL

### Database

* PostgreSQL
* Prisma ORM

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── graphql/
│   ├── hooks/
│   ├── utils/
│   └── styles/
│
backend/
├── prisma/
│   └── schema.prisma
├── prismaClient.js
├── prisma.config.ts
├── schema.js
├── index.js
└── package.json
```

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

GraphQL endpoint:

```text
http://localhost:4000
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Current Functionality

### Home Page

* Browse all tracked games
* Search games
* Filter by platform and status
* Add, edit, and delete games
* View progression summary

### Game Details

* View detailed game information
* View XP rewards
* Add, edit, and delete quest notes

### Statistics Page

* View game library statistics
* Track completion progress
* Analyze favorite genres

---

## Future Improvements

### Planned

* Milestones system
* Achievement system
* User authentication
* Enhanced RPG-style progression

### Nice to Have

* Game cover artwork
* Advanced statistics
* Improved mobile responsiveness
* Achievement badges
* Additional customization options

---

## Screenshots

Coming soon.

---

## Author

cojo94
