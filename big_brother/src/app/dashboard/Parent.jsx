import React from 'react';
import { Ride, Child, ParentUser, DriverUser } from "../../models";
//import { Child } from "../../models/Child";
import  AddRide from "./AddRide";
import "./table.css"
//import { ParentUser } from '../../models/ParentUser';
import { RideItem } from './RideItem';
import { Rating } from './rating';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//const globalizeLocalizer = localizer(globalize)


export class ParentDashboard extends React.Component {

    cancelRide(id) {
        //changels for things here
        console.log(id);
        console.log(this.state.rides);
        this.setState({ rides: this.state.rides.filter(x => { return x.id !== id }) });
    }

    addRide(time, children, driver, address, notes) {
        const rides =  new Ride(Math.random(), time, new Date(), 
            this.state.account.children.find(y => y.id == children).id, this.state.account.children.find(y => y.id == children).name,
            this.state.account.children.find(y => y.id == children).health,
            address,
            notes,
            this.state.drivers.find(y => y.id == driver).id,
            this.state.drivers.find(y => y.id == driver).name);
        this.setState(prevState => {
            prevState.rides.push(rides);
            return prevState;
        })
    }
    state = {
        modalVisible: false,
        account: new ParentUser(1, "test@test.gmail", "1234567890", "1234 test rd", "45567 test rd", "Joe Mama",
        [
            (new Child("Ben Dover", 2, "Good School", "Water Allergy", "xXx_BENDOVER69", 0)),
            (new Child("Mike Hawk", 3, "BEst School", "Pain Allergy", "MIKE", 1))
        ]
        ),
        rides: [
            new Ride(0, new Date(), new Date(), 0, "Ben Dover", "5555 St.", "4444 Rd.", "This kid is fucking dope", 0, "Sofa King")
        ],
        pastRides: [
            new Ride(1, new Date(), new Date(), 0, "Ben DICK", "55few55 St.", "4444few Rd.", "This kidfew is fucking dope", 0, "Sofafew King")
        ],
        drivers: [
            new DriverUser(1, "Buck", "Chevy", 2009)
        ]
    }
    toggleModel() {
        this.state.modalVisible
            ? this.setState({
                modalVisible: false
            })
            : this.setState({ modalVisible: true });
    };

    render() {
        return (
            <>
                <div className="row header-box">
                    <h1 className="" id="row-h1">Rides</h1>
                    <AddRide children={this.state.account.children} drivers={this.state.drivers} submitRide={(time, children, driver, address, notes) => this.addRide(time, children, driver, address, notes)} />
                </div>
                {
                    this.state.rides.map(x =>
                        <RideItem
                            ride={x}
                            onRideCanceled={y => this.cancelRide(y)}
                        />

                    )
                }
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