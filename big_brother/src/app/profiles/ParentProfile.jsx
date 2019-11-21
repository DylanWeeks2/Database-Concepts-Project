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
            <h1 style={{margin: "auto", borderradius: "5em"}} className="jumbotron jumbotron-fluid bg-info text-white w-50">Profile Information</h1>
            
            <ul className="list-group">
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Name</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.name}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-envelope p-3 text-white text-center bg-secondary"> Email</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.email}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-phone p-3 text-white text-center bg-info"> Phone Number</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.phoneNumber}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-home p-3 text-white text-center bg-secondary"> Home Address</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.homeAddress}</li>
            </div>
            <div style={{margin: "1% 30%"}}>
            <li className="list-group-item glyphicon glyphicon-briefcase p-3 text-white text-center bg-info"> Work</li>
            <li className="list-group-item p-3 text-black text-center"> {this.state.workAddress}</li>
            </div>
            </ul>
            <div className="p-3 bg-secondary text-white text-center" style={{margin: "1% 15%"}}> Children
                  <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Grade</th>
                            <th className="text-center">School</th>
                            <th className="text-center">Health</th>
                            <th className="text-center">Username</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            this.state.children.map((child, i) =>
                                <tr className="table-dark">
                                    <td className="text-center">{child.name}</td>
                                    <td className="text-center">{child.grade}</td>
                                    <td className="text-center">{child.school}</td>
                                    <td className="text-center">{child.health}</td>
                                    <td className="text-center">{child.username}</td>
                                    <td className="text-center"><button className="btn btn-info p-2" style={{margin: "1%"}}>Update Child Information</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="d-flex flex-row-reverse">
                <button className="btn btn-primary p-2" style={{margin: "1% 15% 1% 1%"}}>Add Child</button>
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