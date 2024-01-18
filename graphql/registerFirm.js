
import { gql } from '../services/graphql.service';

export const FirmCreate = gql`
  mutation CreateFirm(
    $name: String!
    $placeId: String!

  ) {
    createFirm(
      name: $name
      placeId: $placeId

    ) {
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
`;
