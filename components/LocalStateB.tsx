import { FC } from 'react'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

/**
 * makeVar で管理している todo の参照と追加
 * @returns
 */
export const LocalStateB: FC = () => {
  const todos = useReactiveVar(todoVar)
  return (
    <>
      {todos?.map((task, index) => (
        <p className="mb-3 y-1" key={index}>
          {task.title}
        </p>
      ))}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </>
  )
}
