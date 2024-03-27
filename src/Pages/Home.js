import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { signOut } from "aws-amplify/auth";
import { Button } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import TeamAccessor from "../Accessors/TeamAccessor";
import FLAccessor from "../Accessors/FLAccessor";
import inviteClass from "../Accessors/InviteClass";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccessVerification from "../Helpers/AccessVerification";
import MainHeader from "../Components/MainHeader/MainHeader";

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

async function test() {
  const FLA = new FLAccessor("3c4d45b8-20e1-702a-9302-09873f8e9c8a");

  const sch = await FLA.makeSchedule("086ff1a8-ebe7-4eaa-8f4d-522afc082bba", new Date(2024, 1, 15), new Date(2024, 2, 22));

  await FLA.updateFantasyLeague("086ff1a8-ebe7-4eaa-8f4d-522afc082bba", { Schedule: sch });

}

async function test2() {
  const I = new inviteClass();
  const response = await I.sendInvite("kschoffner@gmail.com");
  console.log(response);
}

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
    </header>
  );
};

export default Home;
