import { gql } from '../services/graphql.service'

export const EditProfile = gql`
mutation Mutation($updateUserId: ID!, $firstName: String, $lastName: String, $cellphone: String, $type: String, $verified: Boolean, $email: String) {
    updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, cellphone: $cellphone, type: $type, verified: $verified, email: $email) {
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