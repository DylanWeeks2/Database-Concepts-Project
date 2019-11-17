import React, { Component } from 'react';
import { Accident } from '../../Accident'
import { Service } from '../../Service'
import { Car } from '../../Car'


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
        services: []
    }

    render() {
        return (
        <>
        <div style={{margin: "5em"}}>
        <h1 style={{margin: "auto", borderradius: "5em"}} className="jumbotron jumbotron-fluid bg-info text-white w-50">Profile Information</h1>
            <ul className="list-group">
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Name</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.name}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-secondary"> Gender</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.gender}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Bio</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.bio}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-envelope p-3 text-white text-center bg-secondary"> Email</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.email}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-phone p-3 text-white text-center bg-info"> Phone Number</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.phone}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> Car Make</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.make}</li>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> Car Model</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.model}</li>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> Car Year</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.year}</li>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> Car Color</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.color}</li>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> License Plate</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.license}</li>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> Number Seats</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.numSeats}</li>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> Ammenities</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.ammenities}</li>
            <li className="list-group-item p-3 text-white text-center bg-secondary"> Current Condition</li>
            <li className="list-group-item p-3 text-black text-center">{this.state.car.condition}</li>
            </div>
            </ul>
            <div className="p-3 bg-info text-white text-center" style={{margin: "1% 15%"}}> Accident History
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
            <button className="btn btn-primary p-2" style={{margin: "1% 15% 1% 1%"}}>Add an Accident</button>
            </div>

            <div className="p-3 bg-secondary text-white text-center" style={{margin: "1% 15%"}}> Service History
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
            <button className="btn btn-primary p-2" style={{margin: "1% 15% 1% 1%"}}>Add to Service History</button>
            </div>

            <div className="d-flex flex-row-reverse">
            <button className="btn btn-info p-2" style={{margin: "1% 15% 1% 1%"}}>Update My Information</button>
            </div>

            <div className="col col-mg-8 resetPassword">
                <h3>Change Password</h3>
                <form>
                    <div className="form-group">
                        <input type="password" className="form-control" id="newPassword" />
                    </div>
                    <div className="input-group-append">
                        <button className="resetButton" className="btn btn-danger">Reset</button>
                    </div>
                </form>
            </div>
        </div>
        </>
        );
    }
}