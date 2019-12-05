import React, { Component } from 'react';
import { Phone, Ride, Child } from '../../models'
import { DriveList } from './DriveList'
import { Repo } from '../../api/repo';
import { Link } from 'react-router-dom';
import { Car } from '../../models'

export class DriverDashboard extends React.Component {

    toggleModal = () => {
        this.state.modalVisible
            ? this.setState({
                modalVisible: false
            })
            : this.setState({ modalVisible: true });
    };


    repo = new Repo();

    state = {
        id: 300100,
        name: "John Delaney",
        gender: "Male",
        bio: "I have been driving professionally for over 10 years.",
        email: "jdelaney@gmail.com",
        phone: "860-944-7947",
        car: new Car("Ford", "F-150", 2019, "grey", "66W-H33", 4, "Like new", "Aux port, Cup holders"),
        activeRides: [
            new Ride(0, new Date('December 17, 2019 13:24:00'), new Date('December 17, 2019 14:30:00'), 0, "John Elton", "5555 Saint Peters St.", "4444 Johnpaul Rd.", "going to drama practice", 300102, "John Delaney", new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100)),
            new Ride(0, 1, "3:20PM", 0, "Charlie", "337 North Steele Rd.", "226 King Philip Rd.", "School Run", 0, "John Delaney", new Child("Charlie", 3, "Vial Elementary", "N/A", "toddrox", "asjkdn", 200101)),
            new Ride(1, 2, "3:53PM", 0, "Natalie", "5600 SMU Boulevard", "400 Simsbury Road", "Soccer Practice", 0, "John Delaney", new Child("Natalie", 1, "Brandenburg", "Peanut Allergy", "nattat", "password", 200102)),
        ],
        pastRides: [
            new Ride(0, new Date('December 11, 2019 13:24:00'), new Date('December 11, 2019 14:30:00'), 0, "John Elton", "5555 Saint Peters St.", "4444 Johnpaul Rd.", "going to drama practice", 300102, "John Delaney", new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100)),
        ],
        modalVisible: false
    } 

    cancelRide(id) {
        //change for things here
        debugger;
        this.repo.cancelDriverRide(id);
        console.log(id);
        console.log(this.state.rides);
        this.setState({ activeRides: this.state.activeRides.filter(x => { return x.id !== id }) });
    }

    render() {
        return (
            <>
                {/* <div className="row header-box">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/driver/profile`} id="driverProfile">{}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{`${this.state.name}'s Rides`}</li>
                        </ol>
                    </nav>
                </div> */}
                <div className="row header-box" style={{ margin: "2% 0%" }}>
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

     componentDidMount() {
         let userId = parseInt(localStorage.getItem("userId"));
        debugger;
         this.repo.getRidesDriver(localStorage.getItem("userId"))
         .then(rides => {
             this.setState({activeRides: rides});
         });

         this.repo.getDriver(userId).then(user => {
             let user_ = user.data[0];

             this.setState(prevState => {
                 prevState.id = userId;
                 prevState.name = user_.name;
                 prevState.gender = user_.gender;
                 prevState.bio = user_.bio;
                 prevState.email = user_.email;
                 prevState.phone = user_.phone;
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
         });
    }
}