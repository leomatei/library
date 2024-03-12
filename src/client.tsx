import {
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject
} from '@apollo/client'

console.log(
  'before initializing gql client',
  process.env.REACT_APP_SERVER_DOMAIN
)

const client = new ApolloClient<NormalizedCacheObject>({
  uri: process.env.REACT_APP_SERVER_DOMAIN,
  cache: new InMemoryCache()
})
console.log('initialised')

export default client
