import React from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom'; // To set path and route to component.

import AuthService from '../../services/AuthService';
import './NavBar.css';

const menuIcon = require('../../assets/menu-icon.png');
const bluLogo = require('../../assets/blu-logo.png');

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthService();
    }

    successGoogle = async (response) => {
        let success = await this.Auth.signIn(response.accessToken,
            response.profileObj);
        if (success) {
            let profile = this.Auth.getProfile();
            this.props.login(profile);
        }
    };

    render() {
        var profilePicture;
        if (this.props.loggedIn) {
            profilePicture = 
                <img src={this.props.user.profilePicture}
                alt="Profile Pic"className="profilePicture"/>

            googleSignIn = null;
        } else {
            profilePicture = null;

            var googleSignIn = <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign In"
                className="googleLoginButton"
                icon={false}
                onSuccess={this.successGoogle}
                scope='https://www.googleapis.com/auth/calendar'
            />
        }

        return (
            <header className="displayFlex flexAlignCenter flexSpaceBetween
            horizontalPadding15px">
                <img src={menuIcon} onClick={this.props.openSidebar}
                    id="menuIcon" alt="Menu Icon"/>
                <Link to='/'>
                    <img src={bluLogo} id="bluIcon" alt="BLU Icon"/>
                </Link>
                {profilePicture}
                {googleSignIn}
            </header>
        )
    }
}

export default NavBar;
