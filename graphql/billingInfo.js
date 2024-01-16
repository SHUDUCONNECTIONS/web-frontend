import { gql } from '../services/graphql.service'

export const  GetBillingInfo = gql`
query GetBillingInfo($getBillingInfoId: ID!) {
  getBillingInfo(id: $getBillingInfoId) {
    price
    rideFee
    totalCount
    planType
  }
}

`










