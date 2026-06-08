export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        status: String!
        genre: String
        personalRating: Int
        notes: [Note!]
    }
    type Note {
        id: ID!
        content: String!
        game: Game!
    }
    type Query {
        games: [Game]
        game(id: ID!): Game
    }
    type Mutation {
        addGame(game: AddGameInput!): Game
        deleteGame(id: ID!): Game
        updateGame(id: ID!, edits: EditGameInput!): Game
        addNote(note: AddNoteInput!): Note
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
        status: String!
        genre: String
        personalRating: Int
    }
    input EditGameInput {
        title: String
        platform: [String!]
        status: String
        genre: String
        personalRating: Int
    }
    input AddNoteInput {
        content: String!
        gameId: ID!
    }
`