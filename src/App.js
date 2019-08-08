// React Imports
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar/NavBar.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Home from './components/Home/Home.jsx';
import Events from './components/Events/Events.jsx';
import Organizations from './components/Organizations/Organizations.jsx';
import IndividualEvent from './components/Events/IndividualEvent/IndividualEvent.jsx';

import './styles/main.css';
import AuthService from './services/AuthService';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();

    this.state = {
      loggedIn: this.Auth.loggedIn(),
      user: this.Auth.getProfile(),
      sidebarOpen: false
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
  }

  login(user) {
    this.setState({
      loggedIn: true,
      user: user
    });
  }

  logout = () => {
    this.Auth.logout();

    this.setState({
      loggedIn: false,
      sidebarOpen: false
    });
  }

  openSidebar() {
    this.setState({
      sidebarOpen: true
    });
  }

  closeSidebar(event, isLink = true) {
    // If click is within the sidebar but not on a link, don't close the sidebar.
    if (!this.checkIfOutsideSidebar(event) && !isLink) return;

    this.setState({
      sidebarOpen: false
    });
  }

  checkIfOutsideSidebar(event) {
    let sidebarElement = document.getElementById('sidebar');

    // Retrieve the rightmost pixel of the sidebar.
    let leftPixel = sidebarElement.offsetLeft;
    let rightPixel = leftPixel + sidebarElement.offsetWidth;

    if (event.clientX > rightPixel) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Router>
        <div className="App fontFamilyNovecento">
          {this.state.sidebarOpen ?
            <Sidebar loggedIn={this.state.loggedIn} logout={this.logout}
              closeSidebar={this.closeSidebar}></Sidebar> :
            null
          }

          <NavBar openSidebar={this.openSidebar} loggedIn={this.state.loggedIn}
            login={this.login} user={this.state.user} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/events" exact component={Events} />
            <Route path="/events/:eventId" exact
              render={(props) => <IndividualEvent {...props} user={this.state.user} />}
            />
            <Route path="/organizations" component={Organizations} />
          </Switch>
        </div>
      </Router>
    )
  };
};

export default App;
