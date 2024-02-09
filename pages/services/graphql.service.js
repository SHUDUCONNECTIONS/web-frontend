
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://2cba-41-116-114-32.ngrok-free.app/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  cache: new InMemoryCache({ addTypename: false }),

  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) return console.log('GrahQL Errors:', graphQLErrors);
  },
});
export { client, gql };

//https://sea-lion-app-j3oyi.ondigitalocean.app/graphql
//https://1571-41-116-87-198.ngrok-free.app/graphql
//https://2cba-41-116-114-32.ngrok-free.app/graphql