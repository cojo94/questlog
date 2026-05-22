import { gql } from "@apollo/client"

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
    }
  }
`

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      title
      platform
      reviews {
        id
        rating
        content
      }
    }
  }
`