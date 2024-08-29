import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { graphQLfunction } from './functions/graphQLfunction/resource'

defineBackend({
  auth,
  data,
  graphQLfunction
});
