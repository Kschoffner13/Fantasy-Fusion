import { DataStore } from "aws-amplify";
import { FantasyLeague } from "../models";

// pass in the league id
async function getRosterSettings() {
  const response = await DataStore.query(FantasyLeague);
  console.log(response);
}

export { getRosterSettings };
