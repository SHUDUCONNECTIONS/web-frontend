
import { gql } from '../pages/services/graphql.service'

export const RegisterUser = gql`
mutation RegisterUser($firstName: String!, $lastName: String!, $email: String!, $cellphone: String!, $password: String!, $type: String!) {
  registerUser(firstName: $firstName, lastName: $lastName, email: $email, cellphone: $cellphone, password: $password, type: $type) {
    user {
      id
      firstName
      lastName
      cellphone
      type
      verified
      email
    }
    errors {
      field
      message
    }
  }
}
`
