import React, { Component } from 'react';
import { Child } from '../../Child'

export class ParentProfile extends React.Component {
    state = {
        name: "Rando Name",
        email: "rando@rando.com",
        phoneNumber: "9995554444",
        homeAddress: "5 Street Rd Dallas, Tx",
        workAddress: "6 Road St Dallas, Tx",
        children: [new Child("Test", "5", "Test Elementary", "Peanut Allergy", "XxTESTxX")]
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
            <li class="list-group-item glyphicon glyphicon-envelope p-3 text-white text-center bg-secondary"> Email</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.email}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-phone p-3 text-white text-center bg-info"> Phone Number</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.phoneNumber}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-home p-3 text-white text-center bg-secondary"> Home Address</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.homeAddress}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li class="list-group-item glyphicon glyphicon-briefcase p-3 text-white text-center bg-info"> Work</li>
            <li class="list-group-item p-3 text-black text-center"> {this.state.workAddress}</li>
            </div>
            </ul>
            <div class="p-3 bg-secondary text-white text-center" style={{margin: "1% 15%"}}> Children
                  <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th> Name </th>
                            <th> Grade </th>
                            <th> School </th>
                            <th> Health </th>
                            <th> Username </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.children.map((child, i) =>
                                <tr class="table-dark">
                                    <td >{child.name}</td>
                                    <td >{child.grade}</td>
                                    <td >{child.school}</td>
                                    <td >{child.health}</td>
                                    <td >{child.username}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div class="d-flex flex-row-reverse">
                <button class="btn btn-primary p-2" style={{margin: "1% 15% 1% 1%"}}>Add Child</button>
                <button class="btn btn-info p-2" style={{margin: "1%"}}>Update Child Information</button>
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