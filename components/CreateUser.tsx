import { FC } from 'react'
import { useCreateForm } from '../hooks/useCreateForm'
import { Child } from './Child'

export const CreateUser: FC = () => {
  const {
    text,
    usename,
    handleSubmit,
    usernameChange,
    printMsg,
    handleTextChange,
  } = useCreateForm()

  return (
    <>
      {console.log('create use rendered')}
      <p className="mb-3 font-bold">Custom Hook + useCallback + memo</p>
      <div className="mb-3 flex flex-col justify-center items-center">
        <label>Text</label>
        <input
          type="text"
          value={text}
          className="px-3 py-2 border border-gray-300"
          onChange={handleTextChange}
        />
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label>Username</label>
        <input
          type="text"
          value={usename}
          className="px-3 py-2 border border-gray-300"
          onChange={usernameChange}
          placeholder="New user ?"
        />
        <button
          className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Child printMsg={printMsg} />
    </>
  )
}
