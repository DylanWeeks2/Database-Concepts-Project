import React, { Component } from 'react';
import { Accident, Service, Availability, Car, DriverUser } from '../../models';
//import { Service } from '../../models/Service';
//import { Availability } from "../../models/Availability";
//import { Car } from '../../models/Car';
import AddAccident from './models/AddAccident';
import AddService from './models/AddService';
import AddAvailability from './models/AddAvailability';
import UpdateDriver from './models/UpdateDriver';
import { Repo } from '../../api/repo';


//TODO: Make this a className instead of a function because it has to handle adding accidents and changing profile information
export class DriverProfile extends React.Component {

    repo = new Repo();
    state = {
        id: 0,
        name: "",
        gender: "",
        bio: "",
        email: "",
        phone: "",
        car: new Car("Ford", "F-150", 2019, "grey", "H33", 4, "Like new", "Aux port, Cup holders"),
        accidents: [],
        services: [],
        availabilities: []
    }

    AddAccident(driverId, date, severity, type, description) {
        var accident = new Accident(parseInt(localStorage.getItem("userId")), date, severity, type, description);
        console.log("new accident", accident);
        this.repo.addAccident(accident);
        this.setState(prevState => {
            prevState.accidents.push(accident);
            return prevState;
        })
    }

    AddService(driverId, date, type, description) {
        var service = new Service(parseInt(localStorage.getItem("userId")), date, type, description);
        console.log("new service", service);
        this.repo.addService(service);
        this.setState(prevState => {
            prevState.services.push(service);
            return prevState;
        })
    }

    AddAvailability(driverId, date, start, end) {
        let availability = new Availability(parseInt(localStorage.getItem("userId")), date, start, end);

        console.log("new availability", availability);
        this.repo.addAvailability(availability);
        this.setState(prevState => {
            prevState.availabilities.push(availability);
            return prevState;
        })
    }

    UpdateDriver(name, gender, bio, email, phone, make, model, year, color, license, numSeats, condition, ammenities) {
        let user = new DriverUser(this.state.id, name, gender, bio, email, phone, make, model, year, color, license, numSeats, condition, ammenities);
        this.repo.updateDriver(user);
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
        });
    }

    render() {
        return (
            <>

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
                                        <tr key={i}className="table-dark">
                                            <td className="text-center">{new Date((accident.date)).toISOString().slice(0,10).replace(/-/g,"/")}</td>
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
                                        <tr key={i} className="table-dark">
                                            <td className="text-center">{`${new Date((service.date)).toISOString().slice(0,10).replace(/-/g,"/")}`}</td>
                                            <td className="text-center">{`${service.type}`}</td>
                                            <td className="text-center">{`${service.descr}`}</td>
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
                                    this.state.availabilities.map((avail, i) =>
                                        <tr key={i} className="table-dark">
                                            <td className="text-center">{new Date((avail.date)).toISOString().slice(0,10).replace(/-/g,"/")}</td>
                                            <td className="text-center">{new Date(avail.start.toString()).toLocaleTimeString()}</td>
                                            <td className="text-center">{new Date(avail.end.toString()).toLocaleTimeString()}</td>
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

        componentDidMount() {
            debugger;
            let userId = parseInt(localStorage.getItem("userId"));
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
            this.repo.getServices(userId).then(services => {
                    this.setState(prevState => {
                        prevState.services = [];
                        let service_list = [];
                        services.data.map(service => {
                            service_list.push(new Service(service.driverId, new Date(service.date), service.type, service.descr));
                        });
                        prevState.services = prevState.services.concat(service_list);
                        return prevState;
                    });
            });
            this.repo.getAccidents(userId).then(accidents => {
                this.setState(prevState => {
                    prevState.accidents = [];
                    let service_list = [];
                    accidents.data.map(accident => {
                        service_list.push(new Accident(accident.driverId, new Date(accident.date), accident.severity, accident.type, accident.descr));
                    });
                    prevState.accidents = prevState.accidents.concat(service_list);
                    return prevState;
                });
        });
        this.repo.getAvailabilities(userId).then(availabilities => {
            this.setState(prevState => {
                prevState.availabilities = [];
                let service_list = [];
                availabilities.data.map(availability => {
                    service_list.push(new Availability(availability.driverId, new Date(availability.date), new Date(availability.start), new Date(availability.end)));
                });
                prevState.availabilities = prevState.availabilities.concat(service_list);
                debugger;
                return prevState;
            });
    });

        }
}