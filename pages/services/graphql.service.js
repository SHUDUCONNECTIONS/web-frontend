
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://1571-41-116-87-198.ngrok-free.app/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  cache: new InMemoryCache({ addTypename: false }),

  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) return console.log('GrahQL Errors:', graphQLErrors);
  },
});
export { client, gql };
