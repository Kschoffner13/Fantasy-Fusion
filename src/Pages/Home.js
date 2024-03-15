import { Button } from "@aws-amplify/ui-react";
import logo from "../images/logo.png";
import FL from "../Backend_functions/getRosterSettings";
import { useState } from "react";
import FLAccessor from "../Backend_functions/FLAccessor";
import DraftAccessor from "../Backend_functions/DraftAccessor";
import TeamAccesor  from "../Backend_functions/TeamAccessor";

import { fetchUserAttributes } from "aws-amplify/auth";
const Home = () => {
  // testing this
  const [FL, setFL] = useState(
    new FLAccessor("3c4d45b8-20e1-702a-9302-09873f8e9c8a")
  );
  const [D, setD] = useState(
    new DraftAccessor("cc3d83c9-c7d4-4a1f-99df-3081e4f6c231")
  );

  const[T, setT] = useState(
    new TeamAccesor("fa574ee0-da59-48f0-a667-3dbc381993c4", "5cbd45f8-c0c1-709e-6ce6-9af593592236")
  );

  const testTeam = async () => {
    var teamData =  {
      "Name": "Dragons",
      "TotalPointsFor": 1023,
      "TotalPointsAgainst": 978,
      "MatchUpPoints": 150,
      "Wins": 8,
      "Losses": 5,
      "Draws": 0,
      "Roster": "{\"players\":[{\"id\":\"player-101\",\"name\":\"John Doe\"},{\"id\":\"player-102\",\"name\":\"Jane Smith\"}]}",
      "PlayerList": "{\"players\":[\"player-101\",\"player-102\",\"player-103\"]}",
      "Lineup": "{\"starters\":[\"player-101\",\"player-102\"],\"bench\":[\"player-103\"]}"
    }

    var updateData = {
      "Name": "Moose-Avi",
      "TotalPointsFor": 10123,
      "TotalPointsAgainst": 12412,
      "MatchUpPoints": 1123,
      "Wins": 1,
      "Losses": 4,
      "Draws": 1,
      "Roster": "{\"players\":[{\"id\":\"player-101\",\"name\":\"John Doe\"},{\"id\":\"player-102\",\"name\":\"Jane Smith\"}]}",
      "PlayerList": "{\"players\":[\"player-101\",\"player-102\",\"player-103\"]}",
      "Lineup": "{\"starters\":[\"player-101\",\"player-102\"],\"bench\":[\"player-103\"]}"
    }

    const respone = await T.saveTeam(teamData);
    const i = await T.getTeams();
    const j = await T.updateTeam("a1b2402e-0856-4056-b7b7-535cd1c9b72e", updateData);
    console.log(i);
    const k = await T.getTeamAttribute("a1b2402e-0856-4056-b7b7-535cd1c9b72e", "TotalPointsFor")
    console.log(k);
  };

  // function for testing the FLAccessor
  const testDraft = async () => {
    const response = await D.makePick("messi", "La Liga");
    const i = await D.getDraft();
    console.log(i);
  };

  return (
    <header className="App-header">
      <img src={logo} alt="logo" />
      <h1>Fantasy Fusion</h1>
      <p>
        Ever think one ball wasn't enough. Now is your oppurtunity to enjoy all
        the balls you could ever wish for
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>

      <Button onClick={testDraft}>Click me to get a fanstay league</Button>
      <Button onClick={testTeam}>Click me to get a Team</Button>


    </header>
  );
};

export default Home;
