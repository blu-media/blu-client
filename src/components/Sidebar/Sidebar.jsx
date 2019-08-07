import React from 'react';
import { Link } from 'react-router-dom'; // To set path and route to component.

import '../../styles/main.css';
import './Sidebar.css';

import AuthService from '../../services/AuthService';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {
    return (
      <div className="positionAbsolute topLeft fullWidthAndHeight
        bgGreyTransparent zIndex1000"
        onClick={(e) => this.props.closeSidebar(e, false)}>
          <div id="sidebar" className="width75P fullHeight bgWhite displayFlex
          flexColumn flexSpaceBetween">
            
            <div className="displayFlex flexColumn">
              <Link to='/' className="colorBlack noDecoration
              verticalPadding15px sidebarLink textAlignCenter"
              onClick={(e) => this.props.closeSidebar(e)}>
                Home
              </Link>

              <Link to='/events' className="colorBlack noDecoration
              verticalPadding15px sidebarLink textAlignCenter"
              onClick={(e) => this.props.closeSidebar(e)}>
                Events
              </Link>

              <Link to='/organizations' className="colorBlack noDecoration
              verticalPadding15px sidebarLink textAlignCenter"
              onClick={(e) => this.props.closeSidebar(e)}>
                Organizations
              </Link>
            </div>
            
            { this.props.loggedIn ? 
              <div className="textAlignCenter padding15px logoutBorderTop"
              onClick={this.props.logout}>
                Log Out
              </div> :
              null
            }
          </div>
      </div>
    )
  };
};

export default Sidebar; 
