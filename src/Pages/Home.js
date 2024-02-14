import logo from "../images/logo.png";
const Home = () => {
    return (
        <header className="App-header">
            <img src={logo} alt="logo" />
            <h1>Fantasy Fusion</h1>
            <p>
                Ever think one ball wasn't enough. Now is your oppurtunity to
                enjoy all the balls you could ever wish for
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    );
};

export default Home;
