import React, { useState } from 'react'
import { TableCell, TableRow } from '@mui/material'

interface Book {
  key: string
  title: string
  author: string
  description: string
}

const BookRow: React.FC<Book> = ({ key, title, author, description }) => {
  const [descriptionToShow, setDescriptionToShow] = useState(
    description.slice(0, 30)
  )

  return (
    <TableRow key={key}>
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
