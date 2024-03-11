import { gql } from '@apollo/client'
export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      id
      title
      author
      description
    }
  }
`
export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      author
      description
    }
  }
`
