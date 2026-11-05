# 🎮 QuestLog

QuestLog is a personal game-tracking application inspired by RPG progression systems. Users can manage their gaming backlog, track progress, write personal notes, earn XP, and view statistics about their gaming habits.

Built as a full-stack application using React, GraphQL, Apollo Client, Apollo Server, Prisma, and PostgreSQL.

## Live Demo

🔗 [QuestLog Live Demo](https://questlog-cyan.vercel.app)

QuestLog is publicly available in **Demo Mode**, allowing visitors to explore the application without creating an account or setting up a backend.

The frontend is hosted on Vercel. Demo data is stored locally in the visitor's browser using LocalStorage.

## Features

### Game Management

- Add new games
- Edit existing games
- Delete games
- Track game status:
  - Not Started
  - Playing
  - Completed
- Assign genres
- Track supported platforms
- Add personal ratings

### Quest Notes

- Add notes to any game
- Edit existing notes
- Delete notes
- Persist notes alongside their associated games

### Progression System

- Earn XP based on game progress
- Character-style level progression
- Visual progression overview

### Statistics

- Total games tracked
- Completed games
- Currently playing games
- Not started games
- Favorite genre

## Tech Stack

### Frontend

- React
- Vite
- Apollo Client
- React Router

### Backend

- Node.js
- Apollo Server
- GraphQL
- Prisma ORM

### Database

- PostgreSQL

### Deployment

- Frontend: Deployed on Vercel
- Demo Mode: Uses LocalStorage for browser-based persistence
- Fullstack Mode: Can be configured to use the GraphQL backend and PostgreSQL database

## Application Modes

QuestLog supports two modes: Demo Mode and Fullstack Mode.

### Demo Mode

The public demo runs entirely in the browser without requiring a backend or database.

- Uses a custom Apollo Link to handle GraphQL operations locally.
- Stores game data and notes in browser LocalStorage.
- Includes predefined example games.
- Changes persist between visits in the same browser.

Demo Mode does not provide user accounts, cloud storage, or synchronization between devices. Data is stored separately in each visitor's browser.

### Fullstack Mode

The original full-stack implementation uses a GraphQL API and PostgreSQL database.

- Apollo Client communicates with the GraphQL API.
- Apollo Server handles queries and mutations.
- Prisma manages database access.
- PostgreSQL stores games and notes.

## Architecture

### Demo Mode

```text
React Application
       ↓
Apollo Client
       ↓
Custom Apollo Link
       ↓
LocalStorage
```

### Fullstack Mode

```text
React Application
       ↓
Apollo Client
       ↓
GraphQL API (Apollo Server)
       ↓
Prisma ORM
       ↓
PostgreSQL Database
```

## Project Structure

```text
questlog/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── graphql/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── demo/
│   ├── vercel.json
│   └── package.json
│
└── backend/
    ├── prisma/
    │   └── schema.prisma
    ├── prismaClient.js
    ├── prisma.config.ts
    ├── schema.js
    ├── index.js
    └── package.json
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/cojo94/questlog.git
cd questlog
```

## Running Demo Mode Locally

Demo Mode requires only the frontend and does not need a running backend or database.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
VITE_DEMO_MODE=true
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Running Fullstack Mode Locally

### Backend Setup

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

Run database migrations:

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

### Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
VITE_DEMO_MODE=false
VITE_GRAPHQL_API_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Current Functionality

### Home Page

- Browse all tracked games
- Search games
- Filter by platform and status
- Add, edit, and delete games
- View progression summary

### Game Details

- View detailed game information
- View XP rewards
- Add, edit, and delete quest notes

### Statistics Page

- View game library statistics
- Track completion progress
- Analyze favorite genres

## Future Improvements

### Planned

- Milestones system
- Achievement system
- User authentication
- Enhanced RPG-style progression

### Nice to Have

- Game cover artwork
- Advanced statistics
- Improved mobile responsiveness
- Achievement badges
- Additional customization options

## Screenshots

Coming soon.

## Author

cojo94