import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { useMutation } from '@apollo/client'

import { CREATE_BOOK } from '../../graphql/mutations'
import { type FormData } from '../../types'
import BookForm from '../../components/book-form'

import './styles.scss'

const CreateBookPage: React.FC = () => {
  const navigate = useNavigate()
  const [createBookMutation] = useMutation(CREATE_BOOK)

  const handleSubmit = async (
    e: React.FormEvent,
    formData: FormData
  ): Promise<void> => {
    e.preventDefault()

    await createBookMutation({
      variables: {
        input: formData
      }
    })
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.error('Error creating book:', error)
      })
  }

  return (
    <Container className='create-new-book-page' maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        Create a New Book
      </Typography>
      <BookForm handleSubmit={handleSubmit} buttonText='Create Book' />
    </Container>
  )
}

export default CreateBookPage
