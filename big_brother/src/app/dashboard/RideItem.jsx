import React from 'react';
import {Card, Button } from 'react-bootstrap';
import "../../App.css"
import Info  from "./modals/Info";
import { Accident, Service, Car } from "../../models";
import { Modal } from 'react-bootstrap';
import { Repo } from '../../api/repo';

export class RideItem extends React.Component {
    repo = new Repo()
    toggleModal = () => {
        this.state.modalVisible
          ? this.setState({
            modalVisible: false
          })
          : this.setState({ modalVisible: true });
      };

      cancelRide = () => {
            var answer = prompt("Please type y if you want to cancel the ride", "");
            if(answer != null && (answer==="y" || answer==="Y"))
                this.props.onRideCanceled(this.props.ride.id);
      }
    state = {
        modalVisible: false,
        services: [],
        accidents: [],
        car: null
    }

    render () {

        return (
        <Card className="boot-card">

        <Card.Body className="clearfix">
            <Card.Title className="card-title">{this.props.ride.pickup_time.toLocaleString('default', { month: 'long' }) }  {this.props.ride.pickup_time.getDate()}, {this.props.ride.pickup_time.getFullYear()} 
            <span className="float-right">Driver: {this.props.ride.driverName}</span> <br></br>
            <span>Child: {this.props.ride.childName}</span>
            </Card.Title>
            <Card.Text>

            </Card.Text>
            <Info  ride = {this.props.ride} services={this.state.services} accidents={this.state.accidents} car ={this.state.car}/>
            <Button variant="danger" id="cancel-btn" onClick={() => this.cancelRide()}>Cancel Ride</Button>
        </Card.Body>
        </Card>
        );
    }

    componentDidMount() {
        this.repo.getServices(this.props.ride.driverId).then(services => {
            this.setState(prevState => {
                prevState.services = [];
                let service_list = [];
                if (services && services.length > 0) {
                    services.data.map(service => {
                        service_list.push(new Service(service.driverId, new Date(service.date), service.type, service.descr));
                    });
                    prevState.services = prevState.services.concat(service_list);
                }
                return prevState;
            });
        });
        this.repo.getAccidents(this.props.ride.driverId).then(accidents => {
            this.setState(prevState => {
                prevState.accidents = [];
                let service_list = [];
                if (accidents && accidents.length > 0) {
                    accidents.data.map(accident => {
                        service_list.push(new Accident(accident.driverId, new Date(accident.date), accident.severity, accident.type, accident.descr));
                    });
                    prevState.accidents = prevState.accidents.concat(service_list);
                }
                return prevState;
            });
        });
        this.repo.getDriver(this.props.ride.driverId).then(user => {
            let user_ = user.data[0];
            if (user_ != null) {
                this.setState(prevState => {
                    prevState.car.make = user_.make;
                    prevState.car.model = user_.model;
                    prevState.car.year = user_.year;
                    prevState.car.color = user_.color;
                    prevState.car.license = user_.license;
                    prevState.car.numSeats = user_.numSeats;
                    prevState.car.condition = user_.condition;
                    prevState.car.ammenities = user_.ammenities;
                    return prevState;
                })
            }
        });
    }
}
export default RideItem;