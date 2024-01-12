import { gql } from '../services/graphql.service'

export const LoginUser = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      firstName
      lastName
      email
      cellphone
      type
      verified
    }
    token
    errors {
      field
      message
    }
  }
}


`
