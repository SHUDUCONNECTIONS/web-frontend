
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://sea-lion-app-j3oyi.ondigitalocean.app/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  cache: new InMemoryCache({ addTypename: false }),

  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) return console.log('GrahQL Errors:', graphQLErrors);
  },
});
export { client, gql };
