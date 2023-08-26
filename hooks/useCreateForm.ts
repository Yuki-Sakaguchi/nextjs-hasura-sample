import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries/queries'
import { CreateUserMutation } from '../types/generated/graphql'

export const useCreateForm = () => {
  const [text, setText] = useState('')
  const [usename, setUsename] = useState('')

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

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsename(e.target.value)
  }, [])

  const printMsg = useCallback(() => {
    console.log('hello')
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await insert_users_one({
          variables: {
            name: usename,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      setUsename('')
    },
    [usename]
  )

  return {
    text,
    usename,
    handleSubmit,
    usernameChange,
    printMsg,
    handleTextChange,
  }
}
