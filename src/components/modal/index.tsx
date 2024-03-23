import React, { type ReactNode } from 'react'
import { Button, Modal, Typography } from '@mui/material'

import './styles.scss'

interface CustomModalProps {
  open: boolean
  closeText: string
  onClose: () => void
  acceptText: string
  onAccept: () => void
  title: string
  children: ReactNode
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  closeText,
  onClose,
  acceptText,
  onAccept,
  title,
  children
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='modal'>
        <Typography variant='h5' gutterBottom>
          {title}
        </Typography>
        <div>{children}</div>
        <div className='modal__footer'>
          {acceptText?.length && (
            <Button
              variant='contained'
              onClick={onAccept}
              color='primary'
              style={{ marginRight: '10px' }}
            >
              {acceptText}
            </Button>
          )}
          <Button variant='contained' onClick={onClose} color='secondary'>
            {closeText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CustomModal
