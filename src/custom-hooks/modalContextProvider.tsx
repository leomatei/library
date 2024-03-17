import type React from 'react'
import { createContext } from 'react'
import { type Book } from '../types'

interface ModalContextProps {
  showModal: boolean
  selectedBook: Book | null
  modalType: string | null
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>
  setModalType: React.Dispatch<React.SetStateAction<string | null>>
}

export const ModalContext = createContext<ModalContextProps>({
  showModal: false,
  selectedBook: null,
  modalType: null,
  setShowModal: () => {},
  setSelectedBook: () => {},
  setModalType: () => {}
})
