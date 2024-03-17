import React, { useState, type JSX } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'

import CustomModal from '../../components/modal'
import { ModalContext } from '../../custom-hooks/modalContextProvider'
import BookRow from '../../components/custom-table-row/'
import { GET_BOOKS } from '../../graphql/queries'
import { DELETE_BOOK } from '../../graphql/mutations'
import { type Book } from '../../types'

import './styles.scss'

const MODAL_TYPES = {
  DELETE: {
    body: (book: Book) => (
      <>
        <Typography variant='body1' gutterBottom>
          {`Are you sure you want to delete ${book.title} by ${book.author}`}
        </Typography>
      </>
    )
  }
}

const MainPage: React.FC = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [modalType, setModalType] = useState<string | null>(null)
  const contextValue = {
    showModal,
    setShowModal,
    selectedBook,
    setSelectedBook,
    modalType,
    setModalType
  }
  const [deleteBookMutation] = useMutation(DELETE_BOOK)
  const { data, error, loading, refetch } = useQuery(GET_BOOKS)
  const deleteBook: () => void = () => {
    if (selectedBook) {
      deleteBookMutation({
        variables: { id: selectedBook.id }
      })
        .then(() => {
          setShowModal(false)
          setSelectedBook(null)
          setModalType(null)
          void refetch()
        })
        .catch(() => {
          console.log('Something whent wrong!')
        })
    }
  }
  const books: Book[] = data?.getBooks || []

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <div>Error loading books</div>
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {showModal && selectedBook && modalType && modalType in MODAL_TYPES && (
        <CustomModal
          open={showModal}
          title={`delete ${selectedBook.title}`}
          acceptText='Delete'
          onAccept={deleteBook}
          closeText='Cancel'
          onClose={() => {
            setShowModal(false)
          }}
        >
          {MODAL_TYPES[modalType as keyof typeof MODAL_TYPES].body(
            selectedBook
          )}
        </CustomModal>
      )}
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
    </ModalContext.Provider>
  )
}

export default MainPage
