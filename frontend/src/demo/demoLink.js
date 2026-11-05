import { ApolloLink } from "@apollo/client/link";
import { Observable } from "rxjs";

import { initialGames } from "./demoData";

const STORAGE_KEY = "questlog-demo-games";

const loadGames = () => {
    const storedGames = localStorage.getItem(STORAGE_KEY);

    if (!storedGames) {
        const games = structuredClone(initialGames);
        saveGames(games);
        return games;
    }

    try {
        return JSON.parse(storedGames);
    } catch {
        const games = structuredClone(initialGames);
        saveGames(games);
        return games;
    }
};

const saveGames = (games) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
};

const generateId = () => crypto.randomUUID();

export const demoLink = new ApolloLink((operation) => {
    return new Observable((observer) => {
        const { operationName, variables } = operation;
        const games = loadGames();

        try {
            switch (operationName) {
                // QUERIES

                case "GetGames": {
                    const result = games.map(({ notes, ...game }) => ({
                        ...game,
                        __typename: "Game"
                    }));

                    observer.next({
                        data: { games: result }
                    });

                    break;
                }

                case "GetGame": {
                    const game = games.find(
                        (game) => game.id === variables.id
                    );

                    observer.next({
                        data: {
                            game: game
                                ? {
                                    ...game,
                                    __typename: "Game",
                                    notes: (game.notes ?? []).map(note => ({
                                        ...note,
                                        __typename: "Note"
                                    }))
                                }
                                : null
                        }
                    });

                    break;
                }

                // GAME MUTATIONS

                case "AddGame": {
                    const newGame = {
                        id: generateId(),
                        ...variables.game,
                        notes: []
                    };

                    games.push(newGame);
                    saveGames(games);

                    observer.next({
                        data: {
                            addGame: {
                                ...newGame,
                                __typename: "Game"
                            }
                        }
                    });

                    break;
                }

                case "DeleteGame": {
                    const index = games.findIndex(
                        (game) => game.id === variables.id
                    );

                    const deletedGame = index !== -1
                        ? games.splice(index, 1)[0]
                        : null;

                    if (deletedGame) {
                        saveGames(games);
                    }

                    observer.next({
                        data: {
                            deleteGame: deletedGame
                                ? { id: deletedGame.id, __typename: "Game" }
                                : null
                        }
                    });

                    break;
                }

                case "UpdateGame": {
                    const game = games.find(
                        (game) => game.id === variables.id
                    );

                    if (!game) {
                        throw new Error("Game not found");
                    }

                    Object.assign(game, variables.edits);
                    saveGames(games);

                    observer.next({
                        data: {
                            updateGame: {
                                ...game,
                                __typename: "Game"
                            }
                        }
                    });

                    break;
                }

                // NOTE MUTATIONS

                case "AddNote": {
                    const game = games.find(
                        (game) => game.id === variables.note.gameId
                    );

                    if (!game) {
                        throw new Error("Game not found");
                    }

                    const newNote = {
                        id: generateId(),
                        content: variables.note.content
                    };

                    game.notes.push(newNote);
                    saveGames(games);

                    observer.next({
                        data: {
                            addNote: {
                                ...newNote,
                                game: {
                                    id: game.id,
                                    title: game.title,
                                    __typename: "Game"
                                },
                                __typename: "Note"
                            }
                        }
                    });

                    break;
                }

                case "DeleteNote": {
                    let deletedNote = null;
                    let parentGame = null;

                    for (const game of games) {
                        const index = game.notes.findIndex(
                            (note) => note.id === variables.id
                        );

                        if (index !== -1) {
                            [deletedNote] = game.notes.splice(index, 1);
                            parentGame = game;
                            break;
                        }
                    }

                    if (deletedNote) {
                        saveGames(games);
                    }

                    observer.next({
                        data: {
                            deleteNote: deletedNote
                                ? {
                                    id: deletedNote.id,
                                    __typename: "Note"
                                }
                                : null
                        }
                    });

                    break;
                }

                case "UpdateNote": {
                    let note = null;
                    let parentGame = null;

                    for (const game of games) {
                        note = game.notes.find(
                            (note) => note.id === variables.id
                        );

                        if (note) {
                            parentGame = game;
                            break;
                        }
                    }

                    if (!note) {
                        throw new Error("Note not found");
                    }

                    Object.assign(note, variables.edits);
                    saveGames(games);

                    observer.next({
                        data: {
                            updateNote: {
                                ...note,
                                game: {
                                    id: parentGame.id,
                                    title: parentGame.title,
                                    __typename: "Game"
                                },
                                __typename: "Note"
                            }
                        }
                    });

                    break;
                }

                default:
                    throw new Error(
                        `Unsupported demo operation: ${operationName}`
                    );
            }

            observer.complete();

        } catch (error) {
            observer.error(error);
        }
    });
});