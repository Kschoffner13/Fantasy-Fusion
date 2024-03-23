import "../Styles/accountPage.css";
import MainHeader from "../Components/MainHeader/MainHeader.js";
import Footer from "../Components/Footer/Footer.js";
import React, { useState } from 'react';

const AccountPage = () => {
    const [selectedField, setSelectedField] = useState('username');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    
    const handleFieldChange = (field) => {
        setSelectedField(field);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleProfilePictureChange = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Submit the updated information to the server
        // For demonstration purposes, we're just logging the values here
        console.log('Selected Field:', selectedField);
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Profile Picture:', profilePicture);
    };

    return (
        <div className="account-page">
            <MainHeader />
            <div className="update-account-container">
                <h2>Update Account Information</h2>
                <div className="field-selection-buttons">
                    <button onClick={() => handleFieldChange('username')} className="button-59">Change Username</button>
                    <button onClick={() => handleFieldChange('email')} className="button-59">Change Email</button>
                    <button onClick={() => handleFieldChange('password')} className="button-59">Change Password</button>
                    <button onClick={() => handleFieldChange('profilePicture')} className="button-59">Change Profile Picture</button>
                </div>
                {selectedField && (
                    <form onSubmit={handleSubmit} className="update-account-form">
                        {selectedField === 'username' && (
                            <label className="form-label">
                                New Username:
                                <input type="text" value={username} onChange={handleUsernameChange} className="form-input" />
                            </label>
                        )}
                        {selectedField === 'email' && (
                            <label className="form-label">
                                New Email:
                                <input type="email" value={email} onChange={handleEmailChange} className="form-input" />
                            </label>
                        )}
                        {selectedField === 'password' && (
                            <label className="form-label">
                                New Password:
                                <input type="password" value={password} onChange={handlePasswordChange} className="form-input" />
                            </label>
                        )}
                        {selectedField === 'profilePicture' && (
                            <label className="form-label">
                                New Profile Picture:
                                <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="form-input" />
                                {profilePicture && <img src={profilePicture} alt="Profile" className="profile-picture" />}
                            </label>
                )}
                        <button type="submit" className="button-59" id="submit-button">Update</button>
                    </form>
                )}
            </div>
            <Footer />
        </ div>
    );
};

export default AccountPage;
