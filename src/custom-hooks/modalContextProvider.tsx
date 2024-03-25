import { createContext } from 'react'
import { type ModalContextProps } from '../types'

export const ModalContext = createContext<ModalContextProps>({
  showModal: false,
  selectedBook: null,
  modalType: null,
  setShowModal: () => {},
  setSelectedBook: () => {},
  setModalType: () => {}
})
