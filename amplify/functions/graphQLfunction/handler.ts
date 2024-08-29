import { Amplify } from "aws-amplify";
import { generateClient } from 'aws-amplify/data'

import type { Schema } from "../../data/resource"
import outputs from "../../../amplify_outputs.json";

Amplify.configure(outputs);
const client = generateClient<Schema>()
let counter = 0

export const handler: Schema["graphQLfunction"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments
  // return typed from `.returns()`

  const aktuellesDatum = new Date();
  console.log(aktuellesDatum.toISOString());

  const res = await client.models.Todo.create(
    {
      content: 'MY NEW TODO: ' + aktuellesDatum,
      topic: "MY TOPIC: " + ++counter
    })

  console.log("created TODO:", res)

  return `Hello, ${name}!`
}