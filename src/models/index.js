// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Team, FantasyLeague } = initSchema(schema);

export {
  Team,
  FantasyLeague
};