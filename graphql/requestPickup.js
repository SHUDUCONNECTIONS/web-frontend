import { gql } from '../pages/services/graphql.service'

export const CreateRequest = gql`
mutation Mutation($pickupAddress: String!, $deliveryAddress: String!, $recipientName: String!, $recipientNo: String!, $deliveryState: String!) {
  createRequest(pickupAddress: $pickupAddress, deliveryAddress: $deliveryAddress, recipientName: $recipientName, recipientNo: $recipientNo, deliveryState: $deliveryState) {
    request {
      id
      pickupAddress
      deliveryAddress
      recipientName
      recipientNo
      deliveryState
      rideFee
    }
    errors {
      field
      message
    }
  }
}

`
