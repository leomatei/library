import React, { useContext } from 'react'
import { TableCell, TableRow } from '@mui/material'

import { ModalContext } from '../../custom-hooks/modalContextProvider'
import { type BookDOM } from '../../types'
import EditSVG from '../../assets/svgs/edit.svg'
import DeleteSVG from '../../assets/svgs/delete.svg'

import './styles.scss'

const BookRow: React.FC<BookDOM> = ({ bookId, title, author, description }) => {
  const { setShowModal, setSelectedBook, setModalType } =
    useContext(ModalContext)

  const handleShowModal = (modalType: string): void => {
    setSelectedBook({ id: bookId, title, author, description })
    setModalType(modalType)
    setShowModal(true)
  }

  return (
    <TableRow className='book-row' key={bookId}>
      <TableCell>
        <a href={`/book/${bookId}`}>
          <img width={'20px'} height={'20px'} src={EditSVG} />
        </a>
      </TableCell>
      <TableCell>
        <div
          onClick={() => {
            handleShowModal('DELETE')
          }}
        >
          <img width={'20px'} height={'20px'} src={DeleteSVG} />
        </div>
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{author}</TableCell>
      <TableCell
        className='book-row__description'
        onClick={() => {
          handleShowModal('DETAILS')
        }}
      >
        {description}
      </TableCell>
    </TableRow>
  )
}

export default BookRow
