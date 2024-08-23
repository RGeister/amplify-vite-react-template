import type { Schema } from "../../data/resource"

//@ts-ignore
import { executeQuery } from './query';

export const handler: Schema["getUser"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { id } = event.arguments
  // return typed from `.returns()`
  const result = await executeQuery(event)
  console.log("get-user finished");
  // return { id, name: 'Tom' }
  return result;
}