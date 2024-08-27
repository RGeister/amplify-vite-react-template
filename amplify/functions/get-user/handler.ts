import { generateClient } from 'aws-amplify/data'
import type { Schema } from "../../data/resource"


//@ts-ignore
import { executeQuery } from './query';

const client = generateClient<Schema>()

export const handler: Schema["getUser"]["functionHandler"] = async (event) => {
  // // arguments typed from `.arguments()`
  const { id } = event.arguments
  // // return typed from `.returns()`
  // const result = await executeQuery(event)
  // console.log("get-user finished");


  client.models.Todo.create({
    content: "MY NEW CONTENT",
    isDone: false
  })


  return { id, name: 'Tom' }
  // return result;
}