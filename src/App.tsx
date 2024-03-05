import React, { type ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { useQuery, gql } from '@apollo/client'

import BookRow from './components/custom-table-row/'

interface Book {
  id: string
  title: string
  author: string
  description: string
}

const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      id
      title
      author
      description
    }
  }
`

const MainPage: React.FC = (): ReactNode => {
  const { data, error } = useQuery(GET_BOOKS)
  const books: Book[] = data?.getBooks || []

  if (error) {
    return <div>Error loading books</div>
  }

  return (
    <div>
      <h1>My Personal Library</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <BookRow
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default MainPage
