import { DataStore } from "@aws-amplify/datastore";
import { FantasyLeague } from "../models";

// this file serves as a template for querying and saving to the database.

// pass in the league id
async function getRosterSettings() {
  const testData = {
    OwnerID: "TestOwnerID2",
    Name: "Test League2",
    Properties: JSON.stringify({
      property1: "Property Value 1",
      property2: "Property Value 2",
    }),
    DraftDate: new Date().toISOString(),
    TradeDeadline: new Date().toISOString(),
    PlayoffStartDate: new Date().toISOString(),
    PlayoffTeams: 8,
    PlayoffMatchupLength: 2,
    WeeklyPickups: 5,
    VetoVoteEnabled: true,
    Schedule: JSON.stringify({
      week1: "Schedule for Week 1",
      week2: "Schedule for Week 2",
    }),
  };
  const message = DataStore.save(new FantasyLeague(testData));

  const response = await DataStore.query(FantasyLeague);
  console.log(response);
}

export { getRosterSettings };
