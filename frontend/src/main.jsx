import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { demoLink } from "./demo/demoLink";


const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL || "http://localhost:4000"
});

const client = new ApolloClient({
  link: isDemoMode ? demoLink : httpLink,
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)