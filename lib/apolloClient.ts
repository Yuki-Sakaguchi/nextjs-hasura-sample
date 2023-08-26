import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

/**
 * Apollo Client のインスタンスを生成する
 */
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // windowがないのはサーバー側の時
    link: new HttpLink({
      uri: 'https://creative-woodcock-50.hasura.app/v1/graphql', // hasuraのコンソールから持ってくる
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
    }),
    cache: new InMemoryCache(),
  })
}

/**
 * Apollo Client のインスタンスを取得する
 * サーバーサイドは常に新しいものを返し、クライアントサイドは初回のみ生成して二度目以降は前回生成したものを使い回す
 * @param initialState
 * @returns
 */
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // SSG か SSR などのサーバーサイドの処理の時は新しいクライアントのインスタンスが生成されるのでそれを返す
  if (typeof window === 'undefined') return _apolloClient

  // クライアント側の場合には同じインスタンスを使いまわしたいので変数に保存しておく
  // これにより次に呼び出したときにインスタンス生成をスキップする
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
