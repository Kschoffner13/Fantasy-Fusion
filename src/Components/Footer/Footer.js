import "./style.css";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-left">
                <div className="footer-left-top">
                    <img src={logo}></img>
                    <div>
                        <h3>Fantasy Fusion</h3>
                        <p>Enhancing Your Ball Experience Since '24</p>
                    </div>
                </div>
                <p>Fantasy Fusion &reg;</p>
            </div>
            <div className="footer-right">
                <NavLink>Home</NavLink>
                <NavLink>Account</NavLink>
                <NavLink>How To Play</NavLink>
                <NavLink>FAQs</NavLink>
                <NavLink>Get In Touch</NavLink>
            </div>
        </footer>
    );
};

export default Footer;
