import { useState } from 'react'
import './App.css'
import { gql } from "@apollo/client"
import { useQuery, useMutation } from "@apollo/client/react"
import GameCard from './components/GameCard'
import AddGameForm from './components/AddGameForm'
import GameList from './components/GameList'

const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
    }
  }
`

const ADD_GAME = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      id
      title
      platform
    }
  }
`

const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_GAMES)
  const [addGame] = useMutation(ADD_GAME)
  const [deleteGame] = useMutation(DELETE_GAME)

  const handleAddGame = ({ title, platform }) => {
    addGame({
      variables: {
        game: {
          title,
          platform: platform.split(",").map(p => p.trim())
        }
      },
      refetchQueries: [{ query: GET_GAMES }]
    })
  }

  const handleDelete = (id) => {
    deleteGame({
      variables: { id },
      refetchQueries: [{ query: GET_GAMES }]
    })
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error.message}</h2>

  return (
    <div className="container">
      <h1>🎮 Games Library</h1>
      <p>{data.games.length} games in the library</p>

      <AddGameForm onAdd={handleAddGame} />

      <GameList games={data.games} onDelete={handleDelete} />
    </div>
  )
}

export default App
