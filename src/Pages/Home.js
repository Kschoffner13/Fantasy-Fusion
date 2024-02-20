import { Button } from "@aws-amplify/ui-react";
import logo from "../images/logo.png";
import { getRosterSettings } from "../Backend_functions/getRosterSettings";
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

      <Button onClick={getRosterSettings}>
        Click me to get a fanstay league
      </Button>
    </header>
  );
};

export default Home;
