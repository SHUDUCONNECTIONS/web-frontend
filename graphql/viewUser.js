import { gql } from '../services/graphql.service'

export const  ViewProfile = gql`
query User($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      cellphone
      type
      verified
      email
    }
  }
  `
