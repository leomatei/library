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

import PlusSVG from '../../assets/svgs/plus.svg'

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

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <div>Error loading books</div>
  }

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalDelete deleteCallback={deleteCallback} />
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
