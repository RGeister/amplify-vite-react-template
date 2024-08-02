import { useEffect, useState } from 'react'
import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
// import { AuthUser } from 'aws-amplify/auth'
import { uploadData } from 'aws-amplify/storage'

const client = generateClient<Schema>()

// type AppProps = {
//   signOut?: ((data?: any | undefined) => void) | undefined
//   user?: AuthUser | undefined
// }

// function App () {
//   const authFunc = ({ signOut, user }: AppProps): JSX.Element => {
//     {
//       console.log('user:', user)
//       return <Main signOut={signOut} user={user} />
//     }
//   }

//   return <Authenticator>{authFunc}</Authenticator>
// }

// const Main = ({ signOut, user }: AppProps) => {
//   const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

//   useEffect(() => {
//     client.models.Todo.observeQuery().subscribe({
//       next: data => setTodos([...data.items])
//     })
//   }, [])

//   function createTodo () {
//     client.models.Todo.create({
//       content: window.prompt('Todo content'),
//       isDone: false
//     })
//   }

//   function deleteTodo (id: string) {
//     client.models.Todo.delete({ id })
//   }

//   return (
//     <main>
//       <h1>{user?.signInDetails?.loginId}'s todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map(todo => (
//           <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
//             {todo.content}
//           </li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href='https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates'>
//           Review next step of this tutorial.
//         </a>
//       </div>

//       <button onClick={signOut}>Sign out</button>
//     </main>
//   )
// }

function App () {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: data => setTodos([...data.items])
    })
  }, [])

  function createTodo () {
    client.models.Todo.create({ content: window.prompt('Todo content') })
  }

  function deleteTodo (id: string) {
    client.models.Todo.delete({ id })
  }

  const [file, setFile] = useState()

  const handleChange = (event: any) => {
    setFile(event.target.files[0])
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map(todo => (
              <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
                {todo.content}
              </li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href='https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates'>
              Review next step of this tutorial.
            </a>
          </div>

          <div>
            <input type='file' onChange={handleChange} />
            <button
              onClick={() =>
                uploadData({
                  path: `picture-submissions/${file.name}`,
                  data: file
                })
              }
            >
              Upload
            </button>
          </div>

          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  )
}

export default App
