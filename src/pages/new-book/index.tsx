import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  TextField,
  TextareaAutosize,
  Button,
  Typography
} from '@mui/material'

import { useMutation } from '@apollo/client'

import { CREATE_BOOK } from '../../graphql/mutations'

import './styles.scss'

interface FormData {
  title: string
  author: string
  description: string
}

const CreateBookPage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    description: ''
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

  const [createBookMutation] = useMutation(CREATE_BOOK)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    await createBookMutation({
      variables: {
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

  return (
    <Container className='create-new-book-page' maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        Create a New Book
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

        <TextareaAutosize
          id='description'
          name='description'
          aria-label='Description'
          placeholder='Description'
          minRows={3}
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 16, resize: 'vertical' }}
          required
        />

        <Button type='submit' variant='contained' color='primary'>
          Create Book
        </Button>
      </form>
    </Container>
  )
}

export default CreateBookPage
