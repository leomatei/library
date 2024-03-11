import React, { useState } from 'react'
import { TableCell, TableRow } from '@mui/material'
import './style.scss'

interface Book {
  bookId: string
  title: string
  author: string
  description: string
}

const BookRow: React.FC<Book> = ({ bookId, title, author, description }) => {
  const [descriptionToShow, setDescriptionToShow] = useState(
    description.slice(0, 30)
  )
  console.log(bookId)

  return (
    <TableRow className='book-row' key={bookId}>
      <TableCell>
        <a href={`/book/${bookId}`}>
          <svg
            className='feather feather-edit'
            fill='#2196f3'
            height='20'
            stroke='#FFF'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
          </svg>
        </a>
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{author}</TableCell>
      <TableCell>
        {
          <>
            {descriptionToShow}
            {descriptionToShow.length < description.length && (
              <button
                onClick={() => {
                  setDescriptionToShow(description)
                }}
              >
                Show More
              </button>
            )}
          </>
        }
      </TableCell>
    </TableRow>
  )
}

export default BookRow
