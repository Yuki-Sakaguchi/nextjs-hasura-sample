import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: FC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS)

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

  console.log(data)

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
