import React, { Component } from 'react';
import {Accident} from '../../Accident'
import {Service} from '../../Service'

//TODO: Make this a class instead of a function because it has to handle adding accidents and changing profile information
export const DriverProfile = (props) => (
    <>
        <h1>Profile Information</h1>
        <div>Name: {props.name}</div>
        <div>Gender: {props.gender}</div>
        <div>Bio: {props.bio}</div>
        <div>Email: {props.email}</div>
        <div> Phone Number: {props.phone}</div>
        <div> Car Make: {props.car.make}</div>
        <div> Car Model: {props.car.model}</div>
        <div> Car Year: {props.car.year}</div>
        <div> Car Color: {props.car.color}</div>
        <div> License Plate: {props.car.license}</div>
        <div> Number Seats: {props.car.numSeats}</div>

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
                        props.accidents.map((accident, i) => 
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
                        props.services.map((service, i) =>
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

        <div>Current Condition: {props.car.condition}</div>
        <div>
            <h4>Ammenities</h4>
            <p>{props.car.ammenitie}</p>
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