import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/google-login');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          })
        } catch (error) {
          Auth.logout();
          this.props.history.replace('/');
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        )
      } else return null;
    }
  }
}
