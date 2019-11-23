import React from 'react';
import {Card, Button } from 'react-bootstrap';
import "../../App.css"
import Info  from "./modals/Info";
import { Modal } from 'react-bootstrap';

export class RideItem extends React.Component {
    toggleModal = () => {
        this.state.modalVisible
          ? this.setState({
            modalVisible: false
          })
          : this.setState({ modalVisible: true });
      };

      cancelRide = () => {
          this.props.onRideCanceled(this.props.ride.id);
      }
    state = {
        modalVisible: false
    }

    render () {

        return (
        <Card className="boot-card">

        <Card.Body className="clearfix">
            <Card.Title className="card-title">{this.props.ride.date.toLocaleString('default', { month: 'long' }) }  {this.props.ride.date.getDate()}, {this.props.ride.date.getFullYear()} 
            <span className="float-right">Driver: {this.props.ride.driverName}</span> <br></br>
            <span>Child: {this.props.ride.childName}</span>
            </Card.Title>
            <Card.Text>

            </Card.Text>
            <Info  ride = {this.props.ride}/>
            <Button variant="danger" id="cancel-btn" onClick={() => this.cancelRide()}>Cancel Ride</Button>
        </Card.Body>
        </Card>
        );
    }
}
export default RideItem;