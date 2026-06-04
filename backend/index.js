import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import _db from "./_db.js";
import prisma from "./prismaClient.js";

const resolvers = {
    Query: {
        games: async () => {
            return await prisma.game.findMany()
        },
        game(_, args) {
            return _db.games.find((game) => game.id === args.id)
        },
    },
    Game: {
        notes(parent) {
            return _db.notes.filter((n) => n.game_id === parent.id)
        }
    },
    Note: {
        game(parent) {
            return _db.games.find((g) => g.id === parent.game_id)
        }
    },

    Mutation: {
        deleteGame(_, args) {
            _db.games = _db.games.filter((g) => g.id !== args.id)
            return _db.games
        },
        addGame: async (_, args) => {
            const { title, platform, status, genre } = args.game

            return await prisma.game.create({
                data: {
                    title,
                    platform,
                    status,
                    genre
                }
            })
        },
        updateGame(_, args) {
            _db.games = _db.games.map((g) => {
                if (g.id === args.id) {
                    return { ...g, ...args.edits }
                }
                return g
            })
            return _db.games.find((g) => g.id === args.id)
        },
        addNote(_, args) {
            let note = {
                ...args.note,
                id: Math.floor(Math.random() * 10000).toString()
            }
            _db.notes.push(note)
            return note
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server ready at port", 4000);
