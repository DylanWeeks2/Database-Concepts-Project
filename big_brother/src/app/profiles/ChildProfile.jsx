import React from "react"
import { Child, DriverUser, Ride } from '../../models'
//import { DriverUser } from '../../models/DriverUser'
//import { Ride } from "../../models/Ride"
import "../dashboard/table.css"
import {Card, Button } from 'react-bootstrap';
import "../../App.css"
import Info  from "../dashboard/modals/Info";
import { Repo } from "../../api/repo";


export class ChildProfile extends React.Component {

    repo = new Repo();

    state = {
        modalVisible: false,
        rides: [
            new Ride(0, new Date(), new Date(), 0, "Ben Dover", "5555 St.", "4444 Rd.", "This kid is fucking dope", 0 , "Sofa King")
        ]
    }

    componentDidMount() {
        this.repo.getRidesChild(localStorage.getItem("userId"))
            .then(rides => this.setState({rides: rides}));
    }

    render () {
        return (
        <>
            <div className="row header-box">
                <h1 id="row-h1">Rides</h1>
            </div>   
                {
                    this.state.rides.map(ride => 
                        <Card className="boot-card">

                        <Card.Body className="clearfix">
                            <Card.Title>{ride.pickup_time.toLocaleString('default', { month: 'long' }) } {ride.pickup_time.getDate()}, {ride.pickup_time.getFullYear()} 
                            <span className="float-right">
                            Driver: {ride.driverName}
                            </span> 
                            </Card.Title>
                            <Card.Text>
                
                            </Card.Text>
                            <Info  ride = {ride}/>
                        </Card.Body>
                        </Card>
                        
                        )
                }
            </>
        );
    };

}