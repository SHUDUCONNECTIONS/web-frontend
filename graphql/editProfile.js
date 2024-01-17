import { gql } from '../services/graphql.service'

export const EditAccount = gql`
mutation UpdateFirm($updateFirmId: ID!, $name: String, $placeId: String) {
    updateFirm(id: $updateFirmId, name: $name, placeId: $placeId) {
      firm {
        
        name
        placeId
      }
      errors {
        field
        message
      }
    }
  }
  `