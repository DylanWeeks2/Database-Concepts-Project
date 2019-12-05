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

    // addRide(time, children, driver, address, notes) {
        
    //     const rides = new Ride(localStorage.getItem("userId"), time, new Date(),
    //         this.state.account.children.find(y => y.id == children).id, this.state.account.children.find(y => y.id == children).name,
    //         this.state.account.children.find(y => y.id == children).health,
    //         address,
    //         notes,
    //         this.state.drivers.find(y => y.id == driver).id,
    //         this.state.drivers.find(y => y.id == driver).name);
    //     this.repo.addRide(localStorage.getItem("userId"), rides)
    //         .then()    
    //     // this.setState(prevState => {
    //     //     prevState.rides.push(rides);
    //     //     return prevState;
    //     // })
    // }
    state = {
        modalVisible: false,
        account: new ParentUser(100100, "sing.song@yahoo.com", "2145559874", "56322 League lakes blvd.", "45567 coit rd bldg 512", "Billie Joel",
            [
                (new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100)),
                (new Child("Billy Maze", 3, "Constellar Academy for the musically Gifted", "Peanut Allergy", "MIKEy", "watermelonsNICe44", 200101))
            ], "dietorock12", "MuSiCMaN"
        ),
        rides: [
            new Ride(0, new Date('December 17, 2019 13:24:00'), new Date('December 17, 2019 14:30:00'), 0, "John Elton", "5555 saint peters St.", "4444 johnpaul Rd.", "going to drama practice", 300102, "John Delaney", new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100)),
            new Ride(1, new Date('December 17, 2019 16:45:00'), new Date('December 17, 2019 17:00:00'), 0, "John Elton", "4444 johnpaul Rd.", "5555 saint peters St.", "drop him off with his teacher", 300101, "Kingston Khan", new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100))
        ],
        pastRides: [
            new Ride(2, new Date('October 5, 2019 08:00:00'), new Date('October 5, 2019 09:00:00'), 0, "John Elton", "9999 Deep Blue Rd.", "7612 Cornell Ave", "Kid's got a birthday party but I'm working", 300100, "Sylvester Stalone",new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100)),
            new Ride(3, new Date('October 7, 2019 07:00:00'), new Date('October 7, 2019 07:30:00'), 0, "Billy Maze", "55few55 St.", "4444few Rd.", "Get him to school", 300102, "John Delaney", new Child("Billy Maze", 3, "Constellar Academy for the musically Gifted", "Peanut Allergy", "MIKEy", "watermelonsNICe44", 200101))
        ],
        drivers: [
            new DriverUser(300101, "Kingston Khan", "M", "I'm driving to help finance my masters in astrophysics'", "KHAAAAN@gmail.com", 2145556666, "Chevy", "equinox", 2009, "silver", "7M5E99", 3, "Slightly Used", "cupholder", "bucky", "pass"),
            new DriverUser(300100, "Sylvester Stalone", "M", "I LOVE KIDS", "pucnhout344@yahoo.com", 2145896326, "Ford", "fiesta", 2019, "Black", "CKR890", 5, "Like New", "Aux cords to play ur fav. tunes", "bucky", "pass"),
            new DriverUser(300102, "John Delaney", "M", "I guarantee 0 interaction with my ride-ees", "jd777@gmail.com", 2189856546, "Chevy", "equinox", 2009, "silver", "7M5E99", 4, "Heavily Used", "", "bucky", "pass")
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
        
        //to do : this call doesn't work because the date-times aren't formatted correctly (we think)
//        debugger;
        // this.repo.addRide(localStorage.getItem("userId"), rides)
        //     .then(resp => alert(resp))
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
    componentDidMount() {
        this.repo.getParentWithChildren(localStorage.getItem("userId"))
            .then(parent => {
                if(parent.id) {
                    debugger;
                    this.setState({account: parent});
                }
                else {
                    this.repo.getParent(localStorage.getItem("userId"))
                        .then(parent => this.setState({account: parent}))
                }
            });
        this.repo.getRides(localStorage.getItem("userId")) //TODO:: handle current rides vs. Past rides-
            .then(rides => this.setState({ activeRides: rides.activeRides, pastRides: rides.pastRides }));
    }

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