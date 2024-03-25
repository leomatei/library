import React, { useContext } from 'react'
import { Typography } from '@mui/material'
import { ModalContext } from '../../custom-hooks/modalContextProvider'

import CustomModal from '../modal'

const ModalDetailsBook: React.FC = () => {
  const {
    showModal,
    setShowModal,
    selectedBook,
    setSelectedBook,
    setModalType
  } = useContext(ModalContext)

  if (!selectedBook) {
    return <></>
  }
  return (
    <CustomModal
      open={showModal}
      title={`${selectedBook.title} by ${selectedBook.author}`}
      closeText='Close'
      onClose={() => {
        setShowModal(false)
        setSelectedBook(null)
        setModalType(null)
      }}
    >
      <Typography variant='body1' gutterBottom>
        {selectedBook.description}
      </Typography>
    </CustomModal>
  )
}

export default ModalDetailsBook
