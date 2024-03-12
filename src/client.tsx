import {
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject
} from '@apollo/client'

const client = new ApolloClient<NormalizedCacheObject>({
  uri: process.env.REACT_APP_SERVER_DOMAIN,
  cache: new InMemoryCache()
})

export default client
