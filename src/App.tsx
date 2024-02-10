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
import useSWR from 'swr'
import axios from 'axios'

import BookRow from './components/custom-table-row/'

interface Book {
  id: string
  title: string
  author: string
  description: string
}

const fetcher = async (url: string): Promise<Book[]> => {
  const response = await axios.get(url)
  return response.data
}

const MainPage: React.FC = (): ReactNode => {
  const { data: books, error } = useSWR<Book[]>(
    ' http://localhost:3001/books',
    fetcher
  )
  console.log(books, error)

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
