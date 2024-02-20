// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Draft, Team, FantasyLeague } = initSchema(schema);

export {
  Draft,
  Team,
  FantasyLeague
};