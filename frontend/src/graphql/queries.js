import { gql } from "@apollo/client"

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
      status
      genre
      personalRating
    }
  }
`

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      title
      platform
      status
      genre
      personalRating
      notes {
        id
        content
      }
    }
  }
`