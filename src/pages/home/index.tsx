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
import cx from 'classnames'

import ErrorPage from './error'

import { ModalContext } from '../../custom-hooks/modalContextProvider'
import BookRow from '../../components/custom-table-row/'
import { GET_BOOKS } from '../../graphql/queries'
import { type Book } from '../../types'
import ModalDelete from '../../components/modal-delete'
import ModalDetailsBook from '../../components/modal-book-details'

import { HEADER_COLUMNS } from '../../constants/constants'

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
    return <ErrorPage />
  }

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalContent />
      <div className='main-page-container'>
        <div className='button-container'>
          <div className='custom-button add-book-button-holder'>
            <a href='/new-book'>
              <p>Add new book</p>
            </a>
          </div>
        </div>
        <TableContainer component={Paper} className='table-container'>
          <Table className='custom-table'>
            <TableHead className='custom-table__header'>
              <TableRow>
                {HEADER_COLUMNS.map((column, index) => {
                  return (
                    <TableCell
                      key={index}
                      className={`custom-table__header__cell ${column.type}`}
                    >
                      <div
                        className={cx(
                          'custom-table__header__cell__random-wrapper',
                          `random-wrapper-${index}`,
                          'box',
                          `box-${index}`
                        )}
                      >
                        <div className={cx('lid', `lid-${index}`)}></div>
                        <p>
                          {column.column}
                          {column.icon && (
                            <img
                              src={column.icon}
                              width='16'
                              height='16'
                              title='Click on description of a book to see all the details'
                            />
                          )}
                        </p>
                      </div>
                    </TableCell>
                  )
                })}
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
        <div className='table-footer'>
          <div className='trapezium'></div>
          <div className='trapezium'></div>
        </div>
      </div>
    </ModalContext.Provider>
  )
}

export default MainPage
