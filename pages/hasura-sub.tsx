import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS_LOCAL } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchSub: FC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)

  if (loading) {
    return (
      <Layout title="Hasura fetchPolicy read cache">
        <p>loading...</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Hasura fetchPolicy read cache">
        <p>Error: {error.message}</p>
      </Layout>
    )
  }

  console.log(data)

  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Direct rad out from cache</p>
      {data?.users.map((user) => (
        <p className="my-1" key={user.id}>
          {user.name}
        </p>
      ))}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  )
}

export default FetchSub
