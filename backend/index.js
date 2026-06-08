import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import prisma from "./prismaClient.js";

const resolvers = {
    Query: {
        games: async () => {
            return await prisma.game.findMany()
        },
        game: async (_, { id }) => {
            return await prisma.game.findUnique({
                where: { id }
            })
        }
    },
    Game: {
        notes: async (parent) => {
            return await prisma.note.findMany({
                where: { gameId: parent.id }
            })
        }
    },
    Note: {
        game: async (parent) => {
            return await prisma.game.findUnique({
                where: { id: parent.gameId }
            })
        }
    },

    Mutation: {
        deleteGame: async (_, { id }) => {
            return await prisma.game.delete({
                where: { id }
            })
        },
        addGame: async (_, args) => {
            return await prisma.game.create({
                data: {
                    ...args.game
                }
            })
        },
        updateGame: async (_, args) => {
            return await prisma.game.update({
                where: { id: args.id },
                data: { ...args.edits }
            })
        },
        addNote: async (_, args) => {
            return await prisma.note.create({
                data: {
                    ...args.note
                }
            })
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
