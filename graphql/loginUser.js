import { gql } from '../services/graphql.service'


export const LoginUser = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        cellphone
        type
        verified
        email
      }
      token
      errors {
        field
        message
      }
    }
  }
`
