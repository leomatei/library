import React from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import MainPage from './pages/home'
import CreateBookPage from './pages/new-book'
import UpdateBookPage from './pages/update-book'
import client from './client'

import './styles.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/new-book',
    element: <CreateBookPage />
  },
  {
    path: '/book/:id',
    element: <UpdateBookPage />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div className='LCP'>
        <h1>My Personal Library</h1>
      </div>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
