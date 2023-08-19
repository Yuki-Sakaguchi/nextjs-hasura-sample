import { FC, useState, FormEvent, ChangeEvent } from 'react'
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
import { UserItem } from '../components/UserItem'

const HasuraCRUD: FC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedUser.id) {
      // idがあれば編集モード
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      setEditedUser({ id: '', name: '' })
    } else {
      // idがなければ追加モード
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      setEditedUser({ id: '', name: '' })
    }
  }

  if (error) {
    return <Layout title="Hasura CRUD">Error: {error.message}</Layout>
  }

  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={editedUser.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>
      {data?.users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          delete_users_by_pk={delete_users_by_pk}
          setEditedUser={setEditedUser}
        />
      ))}
    </Layout>
  )
}

export default HasuraCRUD
