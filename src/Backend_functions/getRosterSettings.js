import { DataStore } from "@aws-amplify/datastore";
import { FantasyLeague } from "../models";

// pass in the league id
async function getRosterSettings() {
  const message = DataStore.save(
    new FantasyLeague({
      Name: "Test Name",
      UserID: "TestUserID",
      TotalPointsFor: 100,
      TotalPointsAgainst: 50,
      MatchUpPoints: 75,
      Wins: 10,
      Losses: 5,
      Draws: 2,
      Roster: JSON.stringify({
        player1: "Player Name 1",
        player2: "Player Name 2",
      }),
      PlayerList: JSON.stringify({
        player1: "Player Name 1",
        player2: "Player Name 2",
      }),
      Lineup: JSON.stringify({
        player1: "Player Name 1",
        player2: "Player Name 2",
      }),
    })
  );

  const response = await DataStore.query(FantasyLeague);
  console.log(response);
}

export { getRosterSettings };
