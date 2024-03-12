import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      title
      author
      description
    }
  }
`
export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $input: BookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      author
      description
    }
  }
`

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`
