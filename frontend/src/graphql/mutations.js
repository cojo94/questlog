import { gql } from "@apollo/client"

export const ADD_GAME = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      id
      title
      platform
      status
      genre
      personalRating
    }
  }
`

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`

export const UPDATE_GAME = gql`
  mutation UpdateGame($id: ID!, $edits: EditGameInput!) {
    updateGame(id: $id, edits: $edits) {
      id
      title
      platform
      status
      genre
      personalRating
    }
  }
`

export const ADD_NOTE = gql`
  mutation AddNote($note: AddNoteInput!) {
    addNote(note: $note) {
      id
      content
      game {
        id
        title
      }
    }
  }
`