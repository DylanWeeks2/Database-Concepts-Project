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
            new Ride(0, new Date('December 17, 2019 13:24:00'), new Date('December 17, 2019 14:30:00'), 0, "John Elton", "5555 saint peters St.", "4444 johnpaul Rd.", "going to drama practice", 300102, "John Delaney", new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100)),
            new Ride(1, new Date('December 17, 2019 16:45:00'), new Date('December 17, 2019 17:00:00'), 0, "John Elton", "4444 johnpaul Rd.", "5555 saint peters St.", "drop him off with his teacher", 300101, "Kingston Khan", new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100))
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