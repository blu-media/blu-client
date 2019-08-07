import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import '../../../styles/main.css';
import './IndividualEvent.css';
import RSVPButton from '../RSVPButton/RSVPButton';
import DateService from '../../../services/DateService';
import AuthService from '../../../services/AuthService';

const flyer = require('../../../assets/flyer.png');

class IndividualEvent extends React.Component {
    constructor(props) {
        super(props);

        this.DateService = new DateService();
        this.fetchEvent = this.fetchEvent.bind(this);
        this.resetButtonStyling = this.resetButtonStyling.bind(this);

        this.Auth = new AuthService();

        this.state = {
            eventId: null,
            event: null,
            rsvpStatus: null,
            user: this.Auth.getProfile()
        }
    }

    resetButtonStyling(response) {
        this.setState({
            rsvpStatus: response
        })
    }

    fetchEvent(eventId) {
        const searchURL = `${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`;
        axios
            .get(searchURL)
            .then((response) => {
                let event = response.data;

                this.setState({
                    event: event
                });

                let userId = this.state.user.id;
                const searchURL = `${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}/rsvps/${userId}`;
                axios
                    .get(searchURL)
                    .then((response) => {
                        let rsvp = response.data;
                        if (rsvp.length > 0) {
                            this.setState({
                                rsvpStatus: rsvp[0].response
                            });
                        }
                    });
            });
    }

    componentWillMount() {
        let eventId = this.props.match.params.eventId;

        this.setState({
            eventId: eventId,
            event: this.fetchEvent(eventId)
        })
    }

    render() {
        let date;
        let startTime;
        let endTime;

        if (this.state.event) {
            date = this.DateService.getDate(this.state.event.startTime);
            startTime = this.DateService.getTime(this.state.event.startTime);
            endTime = this.DateService.getTime(this.state.event.endTime);
        }

        let rsvpGoing = this.state.rsvpStatus === 'Going';
        let rsvpInterested = this.state.rsvpStatus === 'Interested';

        let goingButtonClass = classnames({
            'borderMedOrange1px': !rsvpGoing,
            'colorBluMedOrange': !rsvpGoing,
            'bgMedOrange': rsvpGoing,
            'colorWhite': rsvpGoing
        })

        let interestedButtonClass = classnames({
            'borderMedOrange1px': !rsvpInterested,
            'colorBluMedOrange': !rsvpInterested,
            'bgMedOrange': rsvpInterested,
            'colorWhite': rsvpInterested
        })


        return (
            <div className="displayFlex flexColumn flexAlignCenter fontSize12px">
                <div className="text-center marginBottom10px">EVENTS</div>

                {this.state.event ?
                    <div className="displayFlex flexColumn flexAlignCenter">
                        <div className="displayFlex flexColumn flexAlignCenter marginBottom10px">
                            <div>{this.state.event.name}</div>
                            <div>MALIK Fraternity, Incorporated</div>
                        </div>

                        <img src={flyer} className="flyer marginBottom10px" alt="Event Flyer" />

                        <div className="width75P flexDisplay flexColumn">
                            <div>Date: {date}</div>
                            <div>Time: {startTime} - {endTime}</div>
                            <div>Location: {this.state.event.location}</div>
                            <div>
                                Description: {this.state.event.blurb}
                            </div>
                        </div>

                        <div className="flexCenter marginTop25px">
                            <RSVPButton resetButtonStyling={this.resetButtonStyling}
                                eventId={this.state.eventId} response="Going"
                                className={goingButtonClass}></RSVPButton>
                            <RSVPButton resetButtonStyling={this.resetButtonStyling}
                                eventId={this.state.eventId} response="Interested"
                                className={interestedButtonClass}></RSVPButton>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default IndividualEvent;
