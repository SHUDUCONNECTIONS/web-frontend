import { gql } from '../services/graphql.service'

export const RegisterUser = gql`
mutation RegisterUser($firstName: String!,$lastName: String!, $email: String! ,$cellphone:String!, $password:String!, $type:String!) {
  registerUser(firstName: $firstName,lastName: $lastName, email: $email, cellphone: $cellphone, type: $type, password: $password) {
    user {
      id
      firstName
      email
    }
    errors {
      field
      message
    }
  }
}

`
