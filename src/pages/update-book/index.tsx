import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'

import { GET_BOOK } from '../../graphql/queries'
import { UPDATE_BOOK } from '../../graphql/mutations'
import { type FormData } from '../../types'
import BookForm from '../../components/book-form'

import './styles.scss'

const UpdateBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    description: ''
  })

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id }
  })

  const [updateBookMutation] = useMutation(UPDATE_BOOK)

  const handleSubmit = async (
    e: React.FormEvent,
    formData: FormData
  ): Promise<void> => {
    e.preventDefault()

    await updateBookMutation({
      variables: {
        id,
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

  useEffect(() => {
    if (data?.getBook) {
      const { title, author, description } = data.getBook
      setFormData({
        title,
        author,
        description
      })
    }
  }, [data])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.error('Error fetching book:', error)
    return <p>Error fetching book data</p>
  }

  return (
    <Container className='update-book-page' maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        Update Book
      </Typography>
      {data.getBook && (
        <BookForm
          title={formData.title}
          author={formData.author}
          description={formData.description}
          handleSubmit={handleSubmit}
          buttonText='Update Book'
        />
      )}
    </Container>
  )
}

export default UpdateBookPage
