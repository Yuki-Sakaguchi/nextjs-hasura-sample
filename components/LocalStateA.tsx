import { ChangeEvent, FormEvent, useState, FC } from 'react'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

/**
 * makeVar で管理している todo の参照と追加
 * @returns
 */
export const LocalStateA: FC = () => {
  const [input, setInput] = useState('')
  const todos = useReactiveVar(todoVar)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    todoVar([...todoVar(), { title: input }])
    setInput('')
  }

  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => (
        <p className="mb-3 y-1" key={index}>
          {task.title}
        </p>
      ))}
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New taks?"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button
          disabled={!input}
          type="submit"
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
        >
          Add new state
        </button>
      </form>
      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  )
}
