import { useEffect, useState } from 'react'
import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { Authenticator, Button } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>()

function App () {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: data => {
        console.log('DATA:', data)

        setTodos([...data.items])
      }
    })
  }, [])

  function createTodo () {
    client.models.Todo.create({ content: window.prompt('Todo content') })
  }

  function deleteTodo (id: string) {
    client.models.Todo.delete({ id })
  }

  async function handleFunc () {
    const res = await client.queries.graphQLfunction({ name: "IT'S ME" })
    console.log('RESULT', res)
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>My todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <div>{todo.content}</div>
                <div>{todo.topic}</div>
                <div>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
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

          <button onClick={handleFunc}>Graph QL Function</button>
          <Button onClick={signOut}>Sign out</Button>
        </main>
      )}
    </Authenticator>
  )
}

export default App
