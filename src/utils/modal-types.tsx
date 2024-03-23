import React from 'react'
import { Typography } from '@mui/material'

import { type Book } from '../types'

export const MODAL_TYPES = {
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
