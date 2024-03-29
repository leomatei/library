import React, { useState, type JSX } from 'react'
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

import { ModalContext } from '../../custom-hooks/modalContextProvider'
import BookRow from '../../components/custom-table-row/'
import { GET_BOOKS } from '../../graphql/queries'
import { type Book } from '../../types'
import ModalDelete from '../../components/modal-delete'
import ModalDetailsBook from '../../components/modal-book-details'

import PlusSVG from '../../assets/svgs/plus.svg'
import RefreshSVG from '../../assets/svgs/refresh.svg'

import './styles.scss'

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
  const { data, error, loading, refetch } = useQuery(GET_BOOKS)
  const deleteCallback: () => void = () => {
    void refetch()
  }
  const books: Book[] = data?.getBooks || []

  const ModalContent: React.FC = () => {
    if (modalType) {
      switch (modalType) {
        case 'DELETE':
          return <ModalDelete deleteCallback={deleteCallback} />
        case 'DETAILS':
          return <ModalDetailsBook />
        default:
          return <></>
      }
    }
    return <></>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <div className='error'>
        <p>
          Error loading books.
          <br /> Try refreshing the page up to three times. The Postgres DB on
          Vercel stops after 5 minutes of inactivity.
        </p>
        <img
          width='40px'
          height='40px'
          src={RefreshSVG}
          onClick={() => {
            window.location.reload()
          }}
        />
      </div>
    )
  }

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalContent />
      <div className='main-page-container'>
        <h1>My Personal Library</h1>
        <div className='custom-button add-book-button-holder'>
          <a href='/new-book'>
            <img width={'20px'} height={'20px'} src={PlusSVG} />
            Add new book
          </a>
        </div>
        <TableContainer component={Paper} className='table-container'>
          <Table className='custom-table'>
            <TableHead className='custom-table__header'>
              <TableRow>
                <TableCell className='custom-table__header__cell edit'>
                  Edit
                </TableCell>
                <TableCell className='custom-table__header__cell delete'>
                  Delete
                </TableCell>
                <TableCell className='custom-table__header__cell text'>
                  Title
                </TableCell>
                <TableCell className='custom-table__header__cell text'>
                  Author
                </TableCell>
                <TableCell className='custom-table__header__cell text'>
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='custom-table__body'>
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
      </div>
    </ModalContext.Provider>
  )
}

export default MainPage
