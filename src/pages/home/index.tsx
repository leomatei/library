import React, { type JSX } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { useQuery } from '@apollo/client'

import BookRow from '../../components/custom-table-row/'
import { GET_BOOKS } from '../../graphql/queries'
import { type Book } from '../../types'

import './styles.scss'

const MainPage: React.FC = (): JSX.Element => {
  const { data, error, loading } = useQuery(GET_BOOKS)
  const books: Book[] = data?.getBooks || []

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <div>Error loading books</div>
  }
  return (
    <div className='main-page-container'>
      <h1>My Personal Library</h1>
      <TableContainer component={Paper} className='table-container'>
        <Table className='custom-table'>
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <BookRow
                key={book.id}
                bookId={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='custom-button'>
        <a href='/new-book'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='12' y1='5' x2='12' y2='19'></line>
            <line x1='5' y1='12' x2='19' y2='12'></line>
          </svg>
          Add new book
        </a>
      </div>
    </div>
  )
}

export default MainPage
