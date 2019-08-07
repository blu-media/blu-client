import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../../../styles/main.css';
import './Calendar.css';

class Calendar extends React.Component {
    render() {
        return (
          <div>
            <Container>
                    <Row className="borderTopGrey1px borderBottomGrey1px
                    rowHeight displayFlex flexAlignCenter noVerticalPadding
                    flexSpaceBetween horizontalPadding15px">
                        <Col className="textAlignCenter">S</Col>
                        <Col className="textAlignCenter">M</Col>
                        <Col className="textAlignCenter">T</Col>
                        <Col className="textAlignCenter">W</Col>
                        <Col className="textAlignCenter">T</Col>
                        <Col className="textAlignCenter">F</Col>
                        <Col className="textAlignCenter">S</Col>
                    </Row>


                    <Row className="horizontalPadding15px rowHeight rowBody
                    displayFlex flexAlignCenter flexSpaceBetween">
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>1</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>2</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>3</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>4</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>5</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>6</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>7</Col>                    
                    </Row>

                    <Row className="horizontalPadding15px rowHeight rowBody
                    displayFlex flexAlignCenter flexSpaceBetween">
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>1</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>2</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>3</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>4</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>5</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>6</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>7</Col>                    
                    </Row>

                    <Row className="horizontalPadding15px rowHeight rowBody
                    displayFlex flexAlignCenter flexSpaceBetween">
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>1</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>2</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>3</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>4</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>5</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>6</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>7</Col>                    
                    </Row>

                    <Row className="horizontalPadding15px rowHeight rowBody
                    displayFlex flexAlignCenter flexSpaceBetween">
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>1</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>2</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>3</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>4</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>5</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>6</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>7</Col>                    
                    </Row>

                    <Row id="lastCalendarRow" className="horizontalPadding15px rowHeight rowBody
                    displayFlex flexAlignCenter flexSpaceBetween">
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>1</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>2</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>3</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>4</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>5</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>6</Col>
                        <Col className="textAlignCenter" onClick={(e) => this.props.displayEvents(e)}>7</Col>                    
                    </Row>
                </Container>
          </div>
        )
    };
};

export default Calendar;
