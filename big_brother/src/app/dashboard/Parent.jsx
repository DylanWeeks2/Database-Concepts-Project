import React from 'react';
import { Ride, Child, ParentUser, DriverUser } from "../../models";
//import { Child } from "../../models/Child";
import AddRide from "./AddRide";
import "./table.css"
//import { ParentUser } from '../../models/ParentUser';
import { RideItem } from './RideItem';
import { Rating } from './rating';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Repo } from '../../api/repo';
import { Link } from 'react-router-dom'
//const globalizeLocalizer = localizer(globalize)


export class ParentDashboard extends React.Component {
    repo = new Repo();

    addRide(time, children, driver, address, notes) {
        const rides = new Ride(localStorage.getItem("userId"), time, new Date(),
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
                (new Child("Ben Dover", 2, "Good School", "Water Allergy", "xXx_BENDOVER69", "pass", 0)),
                (new Child("Mike Hawk", 3, "BEst School", "Pain Allergy", "MIKE", "pass", 1))
            ], "pass", "user"
        ),
        rides: [
            new Ride(0, new Date(), new Date(), 0, "Ben Dover", "5555 St.", "4444 Rd.", "This kid is fucking dope", 0, "Sofa King")
        ],
        pastRides: [
            new Ride(1, new Date(), new Date(), 0, "Ben DICK", "55few55 St.", "4444few Rd.", "This kidfew is fucking dope", 0, "Sofafew King")
        ],
        drivers: [
            new DriverUser(1, "Buck", "M", "I am cool", "buck@yahoo.com", 2145556666, "Chevy", "equinox", 2009, "silver", "BiteMe", 3, "decent", "cupholder", "bucky", "pass")
        ]
    }

    cancelRide(id) {
        //to do: call to DB
        /*this.repo.cancelParentRide(id);*/
        this.setState({ rides: this.state.rides.filter(x => { return x.id !== id }) });
    }

    addRide(time, children, driver, address, notes) {
        let kid = this.state.account.children.find(y => y.id == children);
        let driver1 = this.state.drivers.find(y => y.id == driver);
        const rides =  new Ride(localStorage.getItem("userId"), time, new Date(), 
            kid.id, kid.name,
            kid.health,
            address,
            notes,
            driver1.id,
            driver1.name);
        
        //to do : call to DB
        /*this.repo.addRide(rides);*/
        this.setState(prevState => {
            prevState.rides.push(rides);
            return prevState;
        })
    }
    
    toggleModel() {
        this.state.modalVisible
            ? this.setState({
                modalVisible: false
            })
            : this.setState({ modalVisible: true });
    };

    //waiting for call from DB
    /*componentDidMount() {
        this.repo.getParentWithChildren(localStorage.getItem("userId"))
            .then(parent => this.setState({account: parent}));
        this.repo.getRidesForParent(localStorage.getItem("userId")) //TODO:: handle current rides vs. Past rides-
            .then(rides => this.setState({ activeRides: rides.activeRides, pastRides: rides.pastRides }));
    }*/

    render() {
        return (
            <>
                <div className="row header-box">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/parent/profile`} id="join">{this.state.account.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Add a Ride</li>
                        </ol>
                    </nav>
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
                    <h1>Your Ride History</h1>
                    <ul className="list-group">
                        {
                            this.state.pastRides.map((x, i) =>
                                <li key={i} className="list-group-item">
                                    <div className="card">
                                        <div className="card-header" id="displayHeader">
                                            <div className="row mt-2 mb-2">
                                                <div className="col-2">
                                                    <label htmlFor="rating">Rating:</label>
                                                </div>
                                                <div className="col-3">
                                                    <select
                                                        name="rating"
                                                        id="rating"
                                                        className="form-control"
                                                        value={this.state.rating}
                                                        onChange={e => this.setState({ rating: e.target.value })}>
                                                        <option></option>
                                                        <option value="1">1 star</option>
                                                        <option value="2">2 stars</option>
                                                        <option value="3">3 stars</option>
                                                        <option value="4">4 stars</option>
                                                        <option value="5">5 stars</option>
                                                    </select>
                                                </div>
                                                <div className="col-4" id="rating">
                                                    <br />
                                                    <Rating value={this.state.rating} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" id="reviewCard">
                                            <span value={x.driverName}> </span>
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