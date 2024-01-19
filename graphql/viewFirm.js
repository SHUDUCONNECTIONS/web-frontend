import { gql } from '../pages/services/graphql.service'

export const  ViewFirm = gql`
query Firm($firmId: ID!) {
  firm(id: $firmId) {
    name
    placeId
  }
}
  `
