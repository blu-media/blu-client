import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Calendar from './Calendar/Calendar.jsx';
import DateService from '../../services/DateService';

import withAuth from '../Auth/withAuth';
import '../../styles/main.css';
import './Events.css';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          events: [],
          timelineHeight: 0
        };

        this.dateService = new DateService();

        this.currentMonth = React.createRef();
        this.currentYear = React.createRef();
        this.timeline = React.createRef();

        this.displayEventsOnDay = this.displayEventsOnDay.bind(this);
      }
    
    displayEventsOnDay(event) {
        let month = this.currentMonth.current.innerText;
        let year = this.currentYear.current.innerText;
        let day = event.target.innerText;

        let date = new Date(`${month} ${day}, ${year}`);

        let startTimeUTC = date.toISOString();

        let endTime = moment(startTimeUTC).add(1, 'day').subtract(1, 'second');
        let endTimeUTC = endTime.utc().format();

        const searchQuery = `${process.env.REACT_APP_SERVER_URL}/api/events/search?` + 
            `startTime=${startTimeUTC}&endTime=${endTimeUTC}`

        axios
            .get(searchQuery)
            .then((res) => {
                this.setState({ events: res.data});
                this.updateTimelineHeight();
            });
    }

    updateTimelineHeight() {
        let lastCalendarRow = document.getElementById('lastCalendarRow');
        let timelineHeight = window.outerHeight -
            (lastCalendarRow.offsetTop + lastCalendarRow.offsetHeight)
        
        if (this.state.events.length > 0 && timelineHeight !== this.state.timelineHeight) {
            this.setState({ timelineHeight: timelineHeight });
        }
    }

    render() {
        var events;

        if (this.state.events.length > 0) {
            events = this.state.events.map((event) => {
                let linkURL = `/events/${event.id}`;
                let startTime = this.dateService.getTime(event.startTime);
                let endTime = this.dateService.getTime(event.endTime);
                return (
                    <Link to={linkURL} params={{eventId: event.id}} key={event.id}
                    className="displayFlex fontSize12px noDecoration
                        negativeTimelineMarginLeft verticalMargin15px">
                        <div className="displayFlex flexAlignCenter">
                            <div className="widthMaxContent colorDarkGrey
                            textAlignRight dateTextWidth">{startTime}</div>
                            <div className="timelineCircle circle"></div>
                        </div>
                        
                        <div className="timelineMarginRight bgGrey1 colorDarkGrey
                        eventTimelineSize borderRadius10px flexCenter flexAlignCenter
                        horizontalPadding15px">
                            <div className="displayFlex flexColumn flexAlignCenter">
                                <div className="widthMaxContent">{event.name}</div>
                                <div className="widthMaxContent">{event.location}</div>
                                <div className="widthMaxContent">
                                    {startTime} - {endTime}</div>
                            </div>
                        </div>
                    </Link>
                )
            });
        } else {
            events = <div className="widthMaxContent fontSize12px marginAuto
                marginTop25px">There are no events posted for today.</div>
        }
        
        return (
            <div className="fontFamilyNovecento colorLightGrey">
                <div className="textAlignCenter verticalMargin15px"
                onClick={this.handleClick}>Events</div>

                <div className="flexSpaceBetween fontSize14px
                    horizontalPadding15px">
                    <div className="flexCenter">
                        <div ref={this.currentMonth} className="horizontalMargin2px">August</div>
                        <div ref={this.currentYear} className="horizontalMargin2px">2019</div>
                    </div>

                    <div className="flexCenter">
                        <div className="horizontalMargin15px">Left</div>
                        <div className="horizontalMargin15px">Right</div>
                    </div>
                </div>

                <Calendar displayEvents={this.displayEventsOnDay} />

                <div ref={this.timeline}
                className={`${this.state.events.length > 0 ? "timeline" : ""}
                verticalPadding15px`} style={{height: this.state.timelineHeight}}>
                    {events}
                </div>
            </div>
        )
    };
};

export default withAuth(Events);
