import { gql } from "@apollo/client"

export const ADD_GAME = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      id
      title
      platform
      status
      genre
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
    }
  }
`

export const ADD_REVIEW = gql`
  mutation AddReview($review: AddReviewInput!) {
    addReview(review: $review) {
      id
      rating
      content
      author {
        name
      }
    }
  }
`