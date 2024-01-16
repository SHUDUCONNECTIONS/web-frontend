import { gql } from '../services/graphql.service'

export const GetFiles = gql`
query GetFiles($userId: ID!) {
  GetFiles(userId: $userId) {
    id
    caseNumber
    caseType
    mimeType
    size
    url
    userId
  }
}

`
