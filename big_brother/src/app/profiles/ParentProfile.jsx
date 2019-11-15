import React, { Component } from 'react';
import { Child } from '../../Child'

export class ParentProfile extends React.Component {
    state = {
        name: "",
        email: "",
        phoneNumber: "",
        homeAddress: "",
        workAddress: "",
        children: [new Child("Test", "5", "Test Elementary", "Peanut Allergy", "XxTESTxX")]
    }

    render() {
        return (
        <>
            <h1 style={{margin: "1em 10em", borderradius: "5em"}} class="jumbotron jumbotron-fluid bg-info text-white w-50">Profile Information</h1>
            <div class="w-25 p-3 bg-danger text-white">Name: {this.state.name}</div>
            <div class="w-25 p-3 bg-warning text-white">Email: {this.state.email}</div>
            <div class="w-25 p-3 bg-info text-black">Phone Number: {this.state.phone}</div>
            <div class="w-25 p-3 bg-primary text-white">Home Address: {this.state.homeAddress}</div>
            <div class="w-25 p-3 bg-light text-black">Work: {this.state.workAddress}</div>

            <div class="p-3 bg-secondary text-white"> Children
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

            <button>Add Child</button>
            <button>Update Child Information</button>

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