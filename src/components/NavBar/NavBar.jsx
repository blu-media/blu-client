import React from 'react';
import { Link } from 'react-router-dom'; // To set path and route to component.
import GoogleLogin from 'react-google-login';

import AuthService from '../../services/AuthService';
import './NavBar.css';

import { ReactComponent as OrgIcon } from '../../assets/org-icon.svg';
import { ReactComponent as OrgIconWhite } from '../../assets/org-icon-white.svg';
import { ReactComponent as MenuIcon } from '../../assets/menu-icon.svg';
// const bluLogo = require('../../assets/blu-logo.png');

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthService();

        this.state = {
            selectedIcon: null
        }

        this.updateIcons = this.updateIcons.bind(this);
    }

    componentWillMount() {
        this.updateIcons()
    }

    updateIcons() {
        setTimeout(() => {
            let location = window.location.href;
            if (location.includes('/organizations')) {
                this.setSelectedIcon('Organizations');
            } else if (location.includes('/events')) {
                this.setSelectedIcon('Events');
            } else {
                this.setSelectedIcon('Home')
            }
        }, 0);
    }

    setSelectedIcon(icon) {
        this.setState({
            selectedIcon: icon
        });
    }

    successGoogle = async (response) => {
        let success = await this.Auth.signIn(response.accessToken,
            response.profileObj);
        if (success) {
            console.log("YER");
            let profile = this.Auth.getProfile();
            this.props.login(profile);
        }
    };

    render() {
        var profilePicture;
        var googleSignIn;

        if (this.props.loggedIn) {
            profilePicture = 
                <img src={this.props.user.profilePicture}
                alt="Profile Pic" className="profilePicture"/>

            googleSignIn = null;
        } else {
            profilePicture = null;

            googleSignIn = <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign In"
                className="googleLoginButton"
                icon={false}
                onSuccess={this.successGoogle}
                scope='https://www.googleapis.com/auth/calendar'
            />
        }

        return (
            <header id="header" className="displayFlex flexAlignCenter flexSpaceBetween
            horizontalPadding15px">
                <MenuIcon id="menuIcon" onClick={this.props.openSidebar}></MenuIcon>
                {/* <img src={menuIcon} onClick={this.props.openSidebar}
                    id="menuIcon" alt="Menu Icon"/> */}
                <div className="displayFlex">
                    <Link to='/events'>
                        { this.state.selectedIcon == 'Events' ?
                            <OrgIconWhite className="orgIcon horizontalMargin15px"></OrgIconWhite>
                            :
                            <OrgIcon className="orgIcon horizontalMargin15px"
                            onClick={this.updateIcons}></OrgIcon>
                        }
                    </Link>

                    <Link to='/'>
                        { this.state.selectedIcon == 'Home' ?
                            <OrgIconWhite className="orgIcon horizontalMargin15px"></OrgIconWhite>
                            :
                            <OrgIcon className="orgIcon horizontalMargin15px"
                            onClick={this.updateIcons}></OrgIcon>
                        }
                    </Link>

                    <Link to='/organizations'>
                        { this.state.selectedIcon == 'Organizations' ?
                            <OrgIconWhite className="orgIcon horizontalMargin15px"></OrgIconWhite>
                            :
                            <OrgIcon className="orgIcon horizontalMargin15px"
                            onClick={this.updateIcons}></OrgIcon>
                        }
                    </Link>
                </div>
                {/* <Link to='/'>
                    <img src={bluLogo} id="bluIcon" alt="BLU Icon"/>
                </Link> */}
                {profilePicture}
                {googleSignIn}
            </header>
        )
    }
}

export default NavBar;
