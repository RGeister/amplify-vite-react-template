import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
<<<<<<< HEAD
import { storage } from './storage/resource';
import { sayHello } from './functions/say-hello/resource';
=======
import { sayHello } from './functions/say-hello/resource';
import { getUser } from './functions/get-user/resource';
>>>>>>> dev

defineBackend({
  auth,
  data,
<<<<<<< HEAD
  storage,
  sayHello
=======
  sayHello,
  getUser
>>>>>>> dev
});
