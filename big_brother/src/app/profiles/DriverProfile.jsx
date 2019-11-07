import React, { Component } from 'react';
import { Accident } from '../../Accident'
import { Service } from '../../Service'
import { Car } from '../../Car'

//TODO: Make this a class instead of a function because it has to handle adding accidents and changing profile information
export class DriverProfile extends React.Component {
    state = {
        name: "",
        gender: "",
        bio: "",
        email: "",
        phone: "",
        car: new Car("Ford", "F-150", 2019, "grey", "H33", 4, "Like new", "Aux port, Cup holders"),
        accidents: [],
        services: []
    }

    render() {
        return (
        <>
            <h1>Profile Information</h1>
            <div>Name: {this.state.name}</div>
            <div>Gender: {this.state.gender}</div>
            <div>Bio: {this.state.bio}</div>
            <div>Email: {this.state.email}</div>
            <div> Phone Number: {this.state.phone}</div>
            <div> Car Make: {this.state.car.make}</div>
            <div> Car Model: {this.state.car.model}</div>
            <div> Car Year: {this.state.car.year}</div>
            <div> Car Color: {this.state.car.color}</div>
            <div> License Plate: {this.state.car.license}</div>
            <div> Number Seats: {this.state.car.numSeats}</div>

            <div> Accident History
            <table>
                <thead>
                    <tr>
                        <th> Date </th>
                        <th> Severity </th>
                        <th> Type </th>
                        <th> Description </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.accidents.map((accident, i) =>
                            <tr>
                                <td>{accident.date}</td>
                                <td>{accident.severity}</td>
                                <td>{accident.type}</td>
                                <td>{accident.descr}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button>Add an Accident</button>
            </div>

            <div> Service History
            <table>
                <thead>
                    <tr>
                        <th> Date </th>
                        <th> Type </th>
                        <th> Description </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.services.map((service, i) =>
                            <tr>
                                <td>{service.date}</td>
                                <td>{service.type}</td>
                                <td>{service.descr}}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button>Add to Service History</button>
            </div>

            <div>Current Condition: {this.state.car.condition}</div>
            <div>
                <h4>Ammenities</h4>
                <p>{this.state.car.ammenities}</p>
            </div>

            <button>Update My Information</button>

            <div className="col col-mg-8 resetPassword">
                <h3>Change Password</h3>
                <form>
                    <div class="form-group">
                        <input type="password" className="form-control" id="newPassword" />
                    </div>
                    <div className="input-group-append">
                        <button className="resetButton">Reset</button>
                    </div>
                </form>
            </div>
        </>
        );
    }
}