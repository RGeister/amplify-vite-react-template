<<<<<<< HEAD
import type { Schema } from '../../data/resource'

export const handler: Schema['sayHello']['functionHandler'] = async (event: any) => {
=======
import type { Schema } from "../../data/resource"

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
>>>>>>> dev
  // arguments typed from `.arguments()`
  const { name } = event.arguments
  // return typed from `.returns()`
  return `Hello, ${name}!`
<<<<<<< HEAD
}
=======
}
>>>>>>> dev
