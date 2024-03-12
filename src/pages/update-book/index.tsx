import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, TextField, Button, Typography } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'

import { GET_BOOK } from '../../graphql/queries'
import { UPDATE_BOOK } from '../../graphql/mutations'
import { type FormData } from '../../types'

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const [updateBookMutation] = useMutation(UPDATE_BOOK)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    await updateBookMutation({
      variables: {
        id,
        input: {
          title: formData.title,
          author: formData.author,
          description: formData.description
        }
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
        title: title || '',
        author: author || '',
        description: description || ''
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
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id='title'
          name='title'
          label='Title'
          variant='outlined'
          margin='normal'
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          id='author'
          name='author'
          label='Author'
          variant='outlined'
          margin='normal'
          value={formData.author}
          onChange={handleChange}
          required
        />
        <textarea
          id='description'
          name='description'
          aria-label='Description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          style={{ marginBottom: 16, resize: 'vertical' }}
          required
        />

        <Button type='submit' variant='contained' color='primary'>
          Update Book
        </Button>
      </form>
    </Container>
  )
}

export default UpdateBookPage
