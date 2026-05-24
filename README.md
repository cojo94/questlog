# 🎮 Games Library

A fullstack game library application built with React, GraphQL, Apollo Client and Apollo Server.

Users can browse games, view game details, create new games, update existing games and delete games through a GraphQL API.

## Features

- View all games
- View individual game details
- Add new games
- Edit existing games
- Delete games
- GraphQL API with Apollo Server
- React Router navigation
- Component-based React architecture

## Tech Stack

### Frontend

- React
- React Router
- Apollo Client
- Vite

### Backend

- Node.js
- Apollo Server
- GraphQL

### Development Tools

- Vite
- Nodemon

### Data Storage

- In-memory database (`_db.js`)

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── AddGameForm.jsx
│   │   ├── GameCard.jsx
│   │   ├── GameList.jsx
│   │   └── Header.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── GameDetails.jsx
│   │   └── EditGame.jsx
│   │
│   ├── graphql/
│   │   ├── queries.js
│   │   └── mutations.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
backend/
├── index.js
├── schema.js
├── _db.js
└── package.json
```

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

## Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The backend uses Nodemon during development to automatically restart the GraphQL server whenever source files change.

GraphQL endpoint:

```text
http://localhost:4000
```

## Frontend

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## GraphQL Operations

### Queries

- `games`
- `game(id)`
- `reviews`
- `review(id)`
- `authors`
- `author(id)`

### Mutations

- `addGame`
- `updateGame`
- `deleteGame`

## Current Functionality

### Home Page

- View all games
- Add new games
- Delete existing games

### Game Details

- View detailed information about a selected game
- View associated reviews

### Edit Game

- Update a game's title
- Update supported platforms

## Learning Goals

This project was created to practice and learn:

- React component architecture
- React Router
- Apollo Client
- Apollo Server
- GraphQL queries and mutations
- CRUD operations
- Frontend/backend integration
- Fullstack JavaScript development

## Future Improvements

- PostgreSQL integration
- User authentication
- Add and manage reviews
- Search and filtering
- Game cover images
- Pagination
- AWS deployment
- DynamoDB experimentation
- Docker support

## Author

Conny J
