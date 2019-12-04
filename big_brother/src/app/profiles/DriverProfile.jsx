import React, { Component } from 'react';
import { Accident, Service, Availability, Car } from '../../models';
//import { Service } from '../../models/Service';
//import { Availability } from "../../models/Availability";
//import { Car } from '../../models/Car';
import AddAccident from './models/AddAccident';
import AddService from './models/AddService';
import AddAvailability from './models/AddAvailability';
import UpdateDriver from './models/UpdateDriver';
import { Link } from 'react-router-dom';


//TODO: Make this a className instead of a function because it has to handle adding accidents and changing profile information
export class DriverProfile extends React.Component {
    state = {
        name: "",
        gender: "",
        bio: "",
        email: "",
        phone: "",
        car: new Car("Ford", "F-150", 2019, "grey", "H33", 4, "Like new", "Aux port, Cup holders"),
        accidents: [],
        services: [],
        availability: []
    }

    AddAccident(driverId, date, severity, type, description) {
        var accident = new Accident(driverId, date, severity, type, description);
        this.setState(prevState => {
            prevState.accidents.push(accident);
            return prevState;
        })
    }

    AddService(driverId, date, type, description) {
        var accident = new Service(driverId, date, type, description);
        this.setState(prevState => {
            prevState.services.push(accident);
            return prevState;
        })
    }

    AddAvailability(driverId, date, start, end) {
        let availability = new Availability(driverId, date, start.toString(), end.toString());
        this.setState(prevState => {
            prevState.availability.push(availability);
            return prevState;
        })
    }

    UpdateDriver(name, gender, bio, email, phone, make, model, year, color, license, numSeats, condition, ammenities) {
        this.setState(prevState => {
            prevState.name = name;
            prevState.gender = gender;
            prevState.bio = bio;
            prevState.email = email;
            prevState.phone = phone;
            prevState.car.make = make;
            prevState.car.model = model;
            prevState.car.year = year;
            prevState.car.color = color;
            prevState.car.license = license;
            prevState.car.numSeats = numSeats;
            prevState.car.condition = condition;
            prevState.car.ammenities = ammenities;
            return prevState;
        })
    }

    render() {
        return (
            <>
                <div className="row header-box">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/driver`} id="driverProfile">{this.state.account.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{`${this.state.profile.name}'s Rides`}</li>
                        </ol>
                    </nav>
                </div>
                <div style={{ margin: "5em" }}>
                    <h1 style={{ margin: "auto", borderradius: "5em" }} className="jumbotron jumbotron-fluid bg-info text-white w-50">Profile Information</h1>
                    <ul className="list-group">
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Name</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.name}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-secondary"> Gender</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.gender}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Bio</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.bio}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-envelope p-3 text-white text-center bg-secondary"> Email</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.email}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-phone p-3 text-white text-center bg-info"> Phone Number</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.phone}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> Car Make</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.make}</li>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> Car Model</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.model}</li>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> Car Year</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.year}</li>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> Car Color</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.color}</li>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> License Plate</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.license}</li>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> Number Seats</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.numSeats}</li>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> Ammenities</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.ammenities}</li>
                            <li className="glyphicon glyphicon-road list-group-item p-3 text-white text-center bg-secondary"> Current Condition</li>
                            <li className="list-group-item p-3 text-black text-center">{this.state.car.condition}</li>
                        </div>
                    </ul>
                    <div className="p-3 bg-info text-white text-center" style={{ margin: "1% 15%" }}> Accident History
            <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center"> Date </th>
                                    <th className="text-center"> Severity </th>
                                    <th className="text-center"> Type </th>
                                    <th className="text-center"> Description </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.accidents.map((accident, i) =>
                                        <tr className="table-dark">
                                            <td className="text-center">{accident.date}</td>
                                            <td className="text-center">{accident.severity}</td>
                                            <td className="text-center">{accident.type}</td>
                                            <td className="text-center">{accident.descr}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <AddAccident submitAccident={(driverId, date, severity, type, description) => this.AddAccident(driverId, date, severity, type, description)} />
                    </div>

                    <div className="p-3 bg-secondary text-white text-center" style={{ margin: "1% 15%" }}> Service History
            <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center"> Date </th>
                                    <th className="text-center"> Type </th>
                                    <th className="text-center"> Description </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.services.map((service, i) =>
                                        <tr className="table-dark">
                                            <td className="text-center">{service.date}</td>
                                            <td className="text-center">{service.type}</td>
                                            <td className="text-center">{service.descr}}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex flex-row-reverse">
                        <AddService submitService={(driverId, date, type, description) => this.AddService(driverId, date, type, description)} />
                    </div>

                    <div className="p-3 bg-info text-white text-center" style={{ margin: "1% 15%" }}>Availability
            <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">Start</th>
                                    <th className="text-center">End</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.availability.map((avail, i) =>
                                        <tr className="table-dark">
                                            <td className="text-center">{avail.date}</td>
                                            <td className="text-center">{new Date(avail.start).toLocaleTimeString()}</td>
                                            <td className="text-center">{new Date(avail.end).toLocaleTimeString()}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <AddAvailability submitAvailability={(driverId, date, start, end) => this.AddAvailability(driverId, date, start, end)} />
                    </div>

                    <div className="d-flex flex-row-reverse">
                        <UpdateDriver driver={this.state} updateDriver={(name, gender, bio, email, phone, make, model, year, color, license, numSeats, condition, amenities) => this.UpdateDriver(name, gender, bio, email, phone, make, model, year, color, license, numSeats, condition, amenities)} />
                    </div>

                    <div className="col col-mg-8 resetPassword">
                        <h3>Change Password</h3>
                        <form>
                            <div className="form-group">
                                <input type="password" className="form-control" id="newPassword" />
                            </div>
                            <div className="input-group-append">
                                <button className="resetButton btn btn-danger">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}