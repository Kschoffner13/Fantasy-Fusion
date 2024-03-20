import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { signOut } from "aws-amplify/auth";
import { Button } from "@aws-amplify/ui-react";
import {
  Authenticator,
  Text,
  useTheme,
  ThemeProvider,
  View,
  Image,
  Heading,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import TeamAccessor from "../Accessors/TeamAccessor";
import "./customAWS.css";

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

const theme = {
  tokens: {
    colors: {
      brand: {
        primary: {
          10: "black",
          20: "black",
          40: "black",
          60: "black",
          80: "black",
          90: "black",
          100: "black",
        },
      },
    },
  },
};

const Home = () => {
  const {
    tokens: { colors },
  } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Authenticator.Provider>
        <Authenticator
          components={{
            SignIn: (props) => (
              <Authenticator.SignIn {...props} className="custSI" />
            ),
          }}
        >
          <header className="App-header">
            <img src={logo} alt="logo" />
            <h1>Fantasy Fusion</h1>
            <p>
              Ever think one ball wasn't enough. Now is your oppurtunity to
              enjoy all the balls you could ever wish for
            </p>
            <Button onClick={handleSignOut} to="/">
              Sign Out
            </Button>
            <NavLink to="/abc/draft">DRAFT</NavLink>
            <NavLink to="/abc/def">TEAM</NavLink>
            <NavLink to="/abc/matchup">MATCHUP</NavLink>
            <Button onClick={test}>test</Button>
          </header>
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
};

export default Home;
