// client.ts
import {
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject
} from '@apollo/client'

const client = new ApolloClient<NormalizedCacheObject>({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache()
})

export default client
