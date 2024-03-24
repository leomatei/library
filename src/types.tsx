import type React from 'react'
import { type ReactNode } from 'react'

export interface Book {
  id: string
  title: string
  author: string
  description: string
}
export interface BookDOM {
  bookId: string
  title: string
  author: string
  description: string
}

export interface FormData {
  title: string
  author: string
  description: string
}

export interface CustomModalProps {
  open: boolean
  closeText: string
  onClose: () => void
  acceptText: string
  onAccept: () => void
  title: string
  children: ReactNode
}

export interface BookFormProps {
  title?: string
  author?: string
  description?: string
  handleSubmit: (e: React.FormEvent, formData: FormData) => Promise<void>
  buttonText: string
}

export interface ModalContextProps {
  showModal: boolean
  selectedBook: Book | null
  modalType: string | null
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>
  setModalType: React.Dispatch<React.SetStateAction<string | null>>
}

export interface ModalValuesProps {
  title: string
  body: React.ReactNode
  acceptText: string
  closeText: string
}
