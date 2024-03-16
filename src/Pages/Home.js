import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { signOut } from "aws-amplify/auth";
import { Button } from "@aws-amplify/ui-react";
import TeamAccessor from "../Accessors/TeamAccessor";
async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

async function test() {
  const teamAccessor = new TeamAccessor("123456", "123456");

  const response = await teamAccessor.getUsersTeams();
  console.log(response);
}

const Home = () => {
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
      <Button onClick={handleSignOut}>Sign Out</Button>
      <NavLink to="/abc/draft">DRAFT</NavLink>
      <NavLink to="/abc/def">TEAM</NavLink>
      <NavLink to="/abc/matchup">MATCHUP</NavLink>
      <Button onClick={test}>test</Button>
    </header>
  );
};

export default Home;
