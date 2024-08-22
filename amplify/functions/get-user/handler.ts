import type { Schema } from "../../data/resource"
import AWS from "@aws-sdk/client-athena";
//const s3 = new AWS.S3({});
const athena = new AWS.Athena();


export const handler: Schema["getUser"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { id } = event.arguments
  // return typed from `.returns()`
  return { id, name: 'Tom' }
}