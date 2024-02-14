import { gql } from '../services/graphql.service'

export const UploadFile = gql`
mutation UploadFile($caseNumber: String!, $caseType: String!, $file: Upload!) {
  uploadFile(caseNumber: $caseNumber, caseType: $caseType, file: $file) {
    file {
      id
      caseNumber
      caseType
      mimeType
      size
      url
      userId
    }
  }
}

`
