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
      <TableCell>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='#FFF'
        >
          <path d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z' />
        </svg>
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
