import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource';
import { getUser } from './functions/get-user/resource';

defineBackend({
  auth,
  data,
  sayHello,
  getUser
});
