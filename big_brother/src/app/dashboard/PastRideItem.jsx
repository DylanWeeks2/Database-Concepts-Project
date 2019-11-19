//TODO::: Get the Modal to be the review Driver thing instead of what it was before (information)
//        Make sure Driver ids and Child ids are used in all pages necessary

import React from 'react';
import {Card, Button } from 'react-bootstrap';
import "../../App.css"
import Info  from "./modals/Info";
import { Modal } from 'react-bootstrap';

export class PastRideItem extends React.Component {
    toggleModal = () => {
        this.state.modalVisible
          ? this.setState({
            modalVisible: false
          })
          : this.setState({ modalVisible: true });
      };

      rateRide = () => {
          this.props.rateRide(this.props.ride.id);
      }

    state = {
        modalVisible: false
    }

    render () {

        return (
        <Card className="boot-card">

        <Card.Body className="clearfix">
            <Card.Title>{this.props.ride.date.toLocaleString('default', { month: 'long' }) }  {this.props.ride.date.getDate()}, {this.props.ride.date.getFullYear()} <span className="float-right">Driver: {this.props.ride.driverName}</span> </Card.Title>
            <Card.Text>

            </Card.Text>
            <Info  ride = {this.props.ride}/>
            <Button variant="danger" id="review-btn" onClick={() => this.rateRide()}>Rate</Button>
        </Card.Body>
        </Card>
        );
    }
}
export default PastRideItem;