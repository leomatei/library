import React, { useContext } from 'react'
import { Typography } from '@mui/material'
import { useMutation } from '@apollo/client'
import { DELETE_BOOK } from '../../graphql/mutations'
import { ModalContext } from '../../custom-hooks/modalContextProvider'
import { type ModalDeleteProps } from '../../types'
import CustomModal from '../modal'

const ModalDelete: React.FC<ModalDeleteProps> = ({ deleteCallback }) => {
  const {
    showModal,
    setShowModal,
    selectedBook,
    setSelectedBook,
    setModalType
  } = useContext(ModalContext)

  const [deleteBookMutation] = useMutation(DELETE_BOOK)
  const deleteBook: () => void = () => {
    if (selectedBook) {
      deleteBookMutation({
        variables: { id: selectedBook.id }
      })
        .then(() => {
          setShowModal(false)
          setSelectedBook(null)
          setModalType(null)
          deleteCallback()
        })
        .catch(() => {
          console.log('Something whent wrong!')
        })
    }
  }
  if (!selectedBook) {
    return <></>
  }
  return (
    <CustomModal
      open={showModal}
      title={selectedBook.title}
      acceptText='Delete'
      onAccept={deleteBook}
      closeText='Cancel'
      onClose={() => {
        setShowModal(false)
        setSelectedBook(null)
        setModalType(null)
      }}
    >
      <Typography variant='body1' gutterBottom>
        {`Are you sure you want to delete ${selectedBook.title} by ${selectedBook.author}`}
      </Typography>
    </CustomModal>
  )
}

export default ModalDelete
