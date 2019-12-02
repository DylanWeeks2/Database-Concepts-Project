import React, { Component } from 'react';
import { Phone, Ride } from '../../models'
import { DriveList } from './DriveList'
export class DriverDashboard extends React.Component {
    state = {
        activeRides: [
            new Ride(0, 1, "3:53PM", 0, "Charlie", "123 Wall st.", "456 dest ln.", "nothing special", 0, "Todd"),
            new Ride(0, 2, "3:53PM", 0, "Natalie", "123 Wall st.", "456 dest ln.", "nothing special", 0, "Todd")
        ],
        pastRides: [
            new Ride(2, 4, "3:55PM", 0, "Charfelie", "123 Wfeall st.", "456 defest ln.", "notfehing special", 0, "Tofedd")
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

                <div className="showHistory">
                    <button type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={() => this.setState({ showResults: true })}>View Past Rides</button>
                </div>
                <div className="rideHistory"
                    style={{ "display": this.state.showResults > 0 ? 'block' : 'none' }}>
                    <h1>Ride History</h1>
                    <ul className="list-group">
                        {
                            this.state.pastRides.map((x, i) =>
                                <li key={i} className="list-group-item">
                                    <div className="card">
                                        <div className="card-header" id="displayHeader">
                                            <span value={x.driverName}> </span>
                                        </div>
                                        <div className="card-body" id="reviewCard">
                                            <span className="displayUser">{x.childName}</span>
                                            <span className='displayDate float-right'>{x.pickupAddr}</span>
                                            <br />
                                            <span className="displayComment">{x.destAddr}</span>
                                            <span className="displayDriver">{x.notes}</span>
                                        </div>
                                    </div>
                                </li>)
                        }
                    </ul>
                </div>
            </>
        );
    }
}