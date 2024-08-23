// @ts-nocheck
import { useEffect, useState } from 'react'
import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
<<<<<<< HEAD
import { Authenticator, Button } from '@aws-amplify/ui-react'
=======
import {
  Authenticator,
  Badge,
  Button,
  Card,
  Flex,
  Image,
  StepperField,
  Text
} from '@aws-amplify/ui-react'
>>>>>>> dev
import '@aws-amplify/ui-react/styles.css'
import { uploadData, list, downloadData  } from 'aws-amplify/storage'
import ExampleComponent from './ExampleComponent'

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
  const [files, setFiles] = useState([])

  const fetchTodos = async () => {
    const { data: items, errors } = await client.models.Todo.list()
    if (errors) {
      console.log('errors', errors)
    } else {
      console.log('DATA:', items)
    }
    setTodos(items)
  }

  // async function fetchTodos2 () {
  //   const { data: items, errors } = await client.models.Todo.list()
  //   console.log('errors', errors)
  //   setTodos(items)
  // }

  const pollData = () => {
    setTimeout(fetchTodos, 5000)
  }

  useEffect(() => {
    // fetchTodos()

    const sub = client.models.Todo.observeQuery().subscribe({
      next: data => setTodos([...data.items])
    })

<<<<<<< HEAD
    // client.queries.sayHello({
    //   name: 'Amplify'
    // })
=======
    // Subscribe to creation of Todo
    const createSub = client.models.Todo.onCreate().subscribe({
      next: data => console.log('ON CREATE:', data),
      error: error => console.warn(error)
    })

    client.models.Todo.onCreate()

    pollData()

    return () => {
      createSub.unsubscribe()
      sub.unsubscribe()
    }
>>>>>>> dev
  }, [])

  function createTodo () {
    client.models.Todo.create({ content: window.prompt('Todo content') })
  }

  function deleteTodo (id: string) {
    client.models.Todo.delete({ id })
  }

<<<<<<< HEAD
  const [file, setFile] = useState<File>()

  const handleChange = (event: any) => {
    setFile(event.target.files[0])
  }

  const listFiles = async () => {
    const result = await list({
      path: 'picture-submissions/'
      // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
    })
    console.log('FILES:', result)
    setFiles(result)
  }

  const downloadFile = async () => {
    try {
      const downloadResult = await downloadData({
        path: files.items[0].path
      }).result
      const text = await downloadResult.body.text()
      // Alternatively, you can use `downloadResult.body.blob()`
      // or `downloadResult.body.json()` get read body in Blob or JSON format.
      console.log('Succeed: ', text)
    } catch (error) {
      console.log('Error : ', error)
    }
=======
  async function handleSayHello () {
    const result = await client.queries.sayHello({
      name: 'Amplify'
    })
    console.log('say-Hello', result)
  }

  async function handleGetUser () {
    const result = await client.queries.getUser({
      id: 1000
    })
    console.log('get-user', result)
  }

  async function handleUpdate () {
    fetchTodos()
>>>>>>> dev
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
            <Button
              onClick={() =>
                uploadData({
                  path: `picture-submissions/${file?.name}`,
                  data: file
                })
              }
            >
              Upload
            </Button>
            <Button onClick={listFiles}>List Files</Button>
            <Button onClick={downloadFile}>Download File</Button>
          </div>

              <ExampleComponent />
          <button onClick={signOut}>Sign out</button>

          <Card variation='elevated'>
            <Flex alignItems='flex-start'>
              <Image
                src='/amplify-placeholder.svg'
                alt='Amplify'
                width='8rem'
              />
              <Flex direction='column' gap='xs'>
                <Flex>
                  <Badge variation='success'>New</Badge>
                </Flex>
                <Text fontSize='large' fontWeight='semibold'>
                  Product title
                </Text>
                <Text color='font.tertiary'>Product description</Text>
                <Text fontSize='large' color='secondary'>
                  $199.99
                </Text>
                <Flex>
                  <StepperField
                    label='Quantity'
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={1}
                    labelHidden
                  />
                  <Button variation='primary' onClick={handleSayHello}>
                    Say Hello
                  </Button>
                  <Button variation='primary' onClick={handleGetUser}>
                    Get User
                  </Button>

                  <Button variation='primary' onClick={handleUpdate}>
                    Update
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </main>
      )}
    </Authenticator>
  )
}

export default App
