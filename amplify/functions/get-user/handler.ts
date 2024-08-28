// import { generateClient } from 'aws-amplify/data'
import type { Schema } from "../../data/resource"
// import { Amplify } from "aws-amplify";
// import outputs from "../../../amplify_outputs.json";

//@ts-ignore
import { executeQuery } from './query';

// Amplify.configure(outputs);
// const client = generateClient<Schema>()


export const handler: Schema["getUser"]["functionHandler"] = async (event) => {
  // // arguments typed from `.arguments()`
  const { id } = event.arguments

  const result = await executeQuery(event)
  console.log("get-user finished!", id);


  // const res = await client.models.Todo.create({
  //   content: "MY NEW CONTENT",
  //   isDone: false
  // })

  // console.log("create result", res);

  // return { id, name: 'Tom' }
  return result;
}