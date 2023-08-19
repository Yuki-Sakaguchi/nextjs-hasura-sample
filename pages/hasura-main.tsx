import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: FC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
    // fetchPolicy: 'cache-first', // デフォルトはこれ。キャッシュがあればそれを取得し、なければサーバーから取得しに行く。頻繁に更新されるものはあまり良くない
    // fetchPolicy: 'network-only', // 常にサーバーから取得してくる。キャッシュにはデータを保存するので頻繁にデータが更新されたり、リアルタイムにデータを更新したい時はこれが良い
    fetchPolicy: 'cache-and-network', // 大体これが推奨！ 常にサーバーサイドから取得してくるが、キャッシュが存在すれば最初にそれを表示しておく。サーバーから取得が終わったらデータがそれで更新される。注意としてはキャッシュがあってもなくても loading フラグは true になっちゃうので、loading で表示を切り分けていると意味がなくなるかもしれない。loading && data とかにするといいかも
    // fetchPolicy: 'no-cache', // サーバーから取得してくるがキャッシュに保存しない。axiosとかでデータを取得してくるのと同じイメージ。キャッシュがあったとしてももちろん使わない
  })

  console.log(data)

  if (loading) {
    return (
      <Layout title="Hasura fetchPolicy">
        <p>loading...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  }

  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {data?.users.map((user) => (
        <p className="my-1" key={user.id}>
          {user.name}
        </p>
      ))}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}

export default FetchMain
