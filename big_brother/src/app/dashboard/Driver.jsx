import React, { Component } from 'react';
import { Phone, Ride } from '../../Ride'
import { DriveList } from './DriveList'
export class DriverDashboard extends React.Component {
    state = {
        activeRides: [
            new Ride(1, "3:53PM", 0, "Charlie", "123 Wall st.", "456 dest ln.", "nothing special"),
            new Ride(2, "3:53PM", 0, "Natalie", "123 Wall st.", "456 dest ln.", "nothing special")
        ]
    }

    render() {
        return (
            <>
                <DriveList activeRides={this.state.activeRides} />
            </>
        );
    }
}