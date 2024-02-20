import { Button } from "@aws-amplify/ui-react";
import logo from "../images/logo.png";
import FL from "../Backend_functions/getRosterSettings";
import { useState } from "react";
import FLAccessor from "../Backend_functions/FLAccessor";

import { fetchUserAttributes } from "aws-amplify/auth";
const Home = () => {
  // testing this
  const [FL, setFL] = useState(
    new FLAccessor("3c4d45b8-20e1-702a-9302-09873f8e9c8a")
  );

  // function for testing the FLAccessor
  const testFL = async () => {
    console.log("testFL");
    const testData = {
      Name: "gay gay gay",
      Properties: JSON.stringify({
        property1: "Property Value 3",
        property2: "Property Value 4",
      }),
      DraftDate: new Date().toISOString(),
      TradeDeadline: new Date().toISOString(),
      PlayoffStartDate: new Date().toISOString(),
      PlayoffTeams: 6,
      PlayoffMatchupLength: 3,
      WeeklyPickups: 4,
      VetoVoteEnabled: false,
      Schedule: JSON.stringify({
        week1: "Schedule for Week 3",
        week2: "Schedule for Week 4",
      }),
    };

    const s = await FL.updateFantasyLeague(
      "67fd5a98-510e-4f92-8f52-512028c79bec",
      testData
    );
    const i = await FL.getFantasyLeagues();
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

      <Button onClick={testFL}>Click me to get a fanstay league</Button>
    </header>
  );
};

export default Home;
