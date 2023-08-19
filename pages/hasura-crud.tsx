import { FC, useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const HasuraCRUD: FC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  // 更新（自動でキャッシュが更新される）
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)

  // 追加（自動でキャッシュが更新されないので自分で更新する）
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      // 追加したデータが insert_users_one に入っている
      const cacheId = cache.identify(insert_users_one) // 追加したデータを元にキャッシュのIDを取得する
      // users のキャッシュを更新する
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers] // existingUsers に既存のデータが入っているので先頭のデータを足すイメージ
          },
        },
      })
    },
  })

  // 削除（自動でキャッシュが更新されないので自分で更新する）
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            // 既存のデータから削除したデータを除外するイメージ
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  })

  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
    </Layout>
  )
}

export default HasuraCRUD
