import React from 'react';
import '../../../styles/main.css';
import '../IndividualEvent/IndividualEvent.css';
import AuthService from '../../../services/AuthService';

class RSVPButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleRSVP = this.handleRSVP.bind(this);
    this.Auth = new AuthService();
  }

  handleButtonStyling() {
    this.props.resetButtonStyling(this.props.response);
  }

  handleRSVP() {
    let userId = this.Auth.getProfile().id;

    let eventId = this.props.eventId;
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}/rsvps`;

    const options = {
      method: 'PUT',
      body: JSON.stringify({
        userId: userId,
        response: this.props.response
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default'
    }

    fetch(apiURL, options)
      .then((response) => {
        this.handleButtonStyling();
      });
  }

  render() {
    return (
      <div className={`${this.props.className} horizontalMargin10px borderRadius5px
      rsvpButton`} onClick={this.handleRSVP}>
        {this.props.response}
      </div>
    )
  }
}

export default RSVPButton;
