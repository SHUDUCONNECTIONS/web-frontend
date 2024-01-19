import { gql } from '../services/graphql.service'

export const Subscription = gql`
mutation CreateSubscription($subscriptionTypeId: Int!) {
    createSubscription(subscriptionTypeId: $subscriptionTypeId) {
      subscription {
        id
        planName
        startDate
        endDate
        subscriptionTypeId
      } 
      errors {
        field
        message
      }
    }
  } 
  `