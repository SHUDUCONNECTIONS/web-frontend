import { gql } from '../pages/services/graphql.service';



export const UploadFile = gql`
mutation UploadFile($caseNumber: String!, $caseType: String!, $file: Upload!) {
  uploadFile(caseNumber: $caseNumber, caseType: $caseType, file: $file) {
    file {
      id
      caseNumber
      caseType
      size
      url
    }
    errors {
      field
      message
    }
  }
}
`
