import React from "react"
import { Child } from '../../Child'
import { DriverUser } from '../../models/DriverUser'
import { Ride } from "../../Ride"
import "../dashboard/table.css"
import {Card, Button } from 'react-bootstrap';
import "../../App.css"
import Info  from "../dashboard/modals/Info";


export class ChildProfile extends React.Component {
state = {
    modalVisible: false,
    account:
        new Child("Mike Hawk", 3, "BEst School", "Pain Allergy", "MIKE", 1),
    rides: [
        new Ride(0, new Date(), new Date(), 0, "Ben Dover", "5555 St.", "4444 Rd.", "This kid is fucking dope", 0 , "Sofa King")
    ],
    drivers: [
        new DriverUser(1, "Buck", "Chevy", 2009)
    ]
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
                        <Card.Title>{ride.date.toLocaleString('default', { month: 'long' }) } {ride.date.getDate()}, {ride.date.getFullYear()} 
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