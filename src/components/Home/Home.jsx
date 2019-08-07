import React from 'react';
import '../../styles/main.css';

import AuthService from '../../services/AuthService';

class Home extends React.Component {
    constructor() {
        super();
        this.Auth = new AuthService();

        this.logout = this.logout.bind(this);
    }

    logout = () => {
        this.Auth.logout();
    }

    render() {
        return (
            <div>

            </div>
        )
    };
};

export default Home; 
