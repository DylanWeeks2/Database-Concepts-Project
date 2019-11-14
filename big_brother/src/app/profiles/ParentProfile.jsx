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
            <h1>Profile Information</h1>
            <div>Name: {this.state.name}</div>
            <div>Email: {this.state.email}</div>
            <div>Phone Number: {this.state.phone}</div>
            <div>Home Address: {this.state.homeAddress}</div>
            <div>Work: {this.state.workAddress}</div>

            <div> Children
                  <table>
                    <thead>
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
                                <tr>
                                    <td>{child.name}</td>
                                    <td>{child.grade}</td>
                                    <td>{child.school}</td>
                                    <td>{child.health}</td>
                                    <td>{child.username}</td>
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