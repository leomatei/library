import React from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import MainPage from './pages/home'
import CreateBookPage from './pages/new-book'
import client from './client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/new-book',
    element: <CreateBookPage />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
