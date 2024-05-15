import React from 'react'
import { Button, Modal, Typography } from '@mui/material'

import { type CustomModalProps } from '../../types'

import './styles.scss'

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  closeText,
  onClose,
  acceptText,
  onAccept,
  title,
  children,
  customClassName
}) => {
  console.log(customClassName)
  return (
    <Modal open={open} onClose={onClose}>
      <div className={`modal ${customClassName}`}>
        <Typography variant='h5' gutterBottom>
          {title}
        </Typography>
        <div>{children}</div>
        <div className='modal__footer'>
          {acceptText?.length && (
            <Button variant='contained' onClick={onAccept} color='primary'>
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
