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
        <div style={{margin: "5em"}}>
        <h1 style={{margin: "auto", borderradius: "5em"}} class="jumbotron jumbotron-fluid bg-info text-white w-50">Profile Information</h1>
            <ul class="list-group">
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Name</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.name}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-secondary"> Gender</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.gender}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Bio</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.bio}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-envelope p-3 text-white text-center bg-secondary"> Email</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.email}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-phone p-3 text-white text-center bg-info"> Phone Number</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.phone}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> Car Make</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.make}</li>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> Car Model</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.model}</li>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> Car Year</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.year}</li>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> Car Color</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.color}</li>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> License Plate</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.license}</li>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> Number Seats</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.numSeats}</li>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> Ammenities</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.ammenities}</li>
            <li class="list-group-item p-3 text-white text-center bg-secondary"> Current Condition</li>
            <li class="list-group-item p-3 text-black text-center">{this.state.car.condition}</li>
            </div>
            </ul>
            <div class="p-3 bg-info text-white text-center" style={{margin: "1% 15%"}}> Accident History
            <table class="table">
                <thead class="table-dark">
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
                            <tr class="table-dark">
                                <td>{accident.date}</td>
                                <td>{accident.severity}</td>
                                <td>{accident.type}</td>
                                <td>{accident.descr}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
            <div class="d-flex flex-row-reverse">
            <button class="btn btn-primary p-2" style={{margin: "1% 15% 1% 1%"}}>Add an Accident</button>
            </div>

            <div class="p-3 bg-secondary text-white text-center" style={{margin: "1% 15%"}}> Service History
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th> Date </th>
                        <th> Type </th>
                        <th> Description </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.services.map((service, i) =>
                            <tr class="table-dark">
                                <td>{service.date}</td>
                                <td>{service.type}</td>
                                <td>{service.descr}}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>

            <div class="d-flex flex-row-reverse">
            <button class="btn btn-primary p-2" style={{margin: "1% 15% 1% 1%"}}>Add to Service History</button>
            </div>

            <div class="d-flex flex-row-reverse">
            <button class="btn btn-info p-2" style={{margin: "1% 15% 1% 1%"}}>Update My Information</button>
            </div>

            <div className="col col-mg-8 resetPassword">
                <h3>Change Password</h3>
                <form>
                    <div class="form-group">
                        <input type="password" className="form-control" id="newPassword" />
                    </div>
                    <div className="input-group-append">
                        <button className="resetButton" class="btn btn-danger">Reset</button>
                    </div>
                </form>
            </div>
        </div>
        </>
        );
    }
}