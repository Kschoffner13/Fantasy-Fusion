import { Button } from "@aws-amplify/ui-react";
import logo from "../images/logo.png";
import FL from "../Backend_functions/getRosterSettings";
import { useState } from "react";
import FLAccessor from "../Backend_functions/FLAccessor";
import DraftAccessor from "../Backend_functions/DraftAccessor";

import { fetchUserAttributes } from "aws-amplify/auth";
const Home = () => {
  // testing this
  const [FL, setFL] = useState(
    new FLAccessor("3c4d45b8-20e1-702a-9302-09873f8e9c8a")
  );
  const [D, setD] = useState(
    new DraftAccessor("cc3d83c9-c7d4-4a1f-99df-3081e4f6c231")
  );

  // function for testing the FLAccessor
  const testDraft = async () => {
    const response = await D.getDraftDate();
    console.log(response);
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
    </header>
  );
};

export default Home;
