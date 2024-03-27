import "./style.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "@aws-amplify/auth";
import { signOut } from "aws-amplify/auth";

const ProfileHeaderSection = () => {
    const [username, setUsername] = useState("NAME");

    const getUserName = async () => {
        try {
            const username = (await fetchUserAttributes()).preferred_username;
            setUsername(username);
            return <p>username</p>;
        } catch (error) {
            console.log("error getting user", error);
        }
    };

    useEffect(() => {
        getUserName();
    }, []);

    const signout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.log(
                "Failed to log out - You are stuck here forever \nThere are worst places to be"
            );
        }
    };

    return (
        <div className="profile-icon">
            <img src="https://picsum.photos/seed/picsum/75/75" />
            <div className="profile-icon-info">
                <p>{username}</p>
                <NavLink to="/" onClick={signout}>
                    Sign Out
                </NavLink>
            </div>
        </div>
    );
};

export default ProfileHeaderSection;
