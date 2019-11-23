import React, { Component } from 'react';
import { Phone, Ride } from '../../models'
import { DriveList } from './DriveList'
export class DriverDashboard extends React.Component {
    state = {
        activeRides: [
            new Ride(0, 1, "3:53PM", 0, "Charlie", "123 Wall st.", "456 dest ln.", "nothing special", 0, "Todd"),
            new Ride(1, 2, "3:53PM", 0, "Natalie", "123 Wall st.", "456 dest ln.", "nothing special", 0, "Todd")
        ]
    }

    cancelRide(id) {
        //change for things here
        console.log(id);
        console.log(this.state.rides);
        this.setState({activeRides: this.state.activeRides.filter(x => {return x.id !== id})});
    }

    render() {
        return (
            <>
                <div className="row header-box" style={{margin: "2% 0%"}}>
                    <h1 id="row-h1">Rides</h1>   
                </div>  
                <DriveList activeRides={this.state.activeRides}
                onRideCanceled={y => this.cancelRide(y)} />
            </>
        );
    }
}