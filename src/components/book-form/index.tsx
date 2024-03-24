import React, { useEffect, useState } from 'react'
import { TextField, TextareaAutosize, Button } from '@mui/material'
import { type FormData, type BookFormProps } from '../../types'
import './styles.scss'

const BookForm: React.FC<BookFormProps> = ({
  title = '',
  author = '',
  description = '',
  handleSubmit,
  buttonText
}) => {
  const [formData, setFormData] = useState<FormData>({
    title,
    author,
    description
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

  useEffect(() => {
    setFormData({
      title,
      author,
      description
    })
  }, [title, author, description])
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={async (e) => {
          await handleSubmit(e, formData)
        }}
      >
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
          {buttonText}
        </Button>
      </form>
    </>
  )
}

export default BookForm
