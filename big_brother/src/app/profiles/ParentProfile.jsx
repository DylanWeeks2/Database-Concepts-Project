import React, { Component } from 'react';
import { Child, ParentUser } from '../../models'
import UpdateChild from './models/UpdateChild';
import NewChild from './models/NewChild';
import UpdateParent from './models/UpdateParent';
import { Link } from 'react-router-dom';
import { Repo } from '../../api/repo';

export class ParentProfile extends React.Component {
    repo = new Repo();
    state = {
        profile: new ParentUser(100100, "sing.song@yahoo.com", "2145559874", "56322 League lakes blvd.", "45567 coit rd bldg 512", "Billie Joel",
        [
            (new Child("John Elton", 6, "Scistercian Middle School", "Water Allergy", "", "pass1234!", 200100)),
            (new Child("Billy Maze", 3, "Constellar Academy for the musically Gifted", "Peanut Allergy", "MIKEy", "watermelonsNICe44", 200101))
        ], "dietorock12", "MuSiCMaN"),
        newPassField: ""
    }

    changePassword() {
        this.repo.changePass(localStorage.getItem("userId"), this.state.newPassField, this.state.profile.username)
            .then(resp => alert(resp));
    }

    updateChild(name, grade, school, health, username, password, id){
        //to-do: db call send
        /*this.repo.updateChild(name, grade, school, health, username, password, id); */
        this.setState(prevState => {
            const index = prevState.profile.children.findIndex(x => x.id === id);
            prevState.profile.children[index].name = name;
            prevState.profile.children[index].grade = grade;
            prevState.profile.children[index].school = school;
            prevState.profile.children[index].health = health;
            prevState.profile.children[index].username = username;
            prevState.profile.children[index].password = password;
            return prevState;
        });
    }

    updateParent(email, phone, homeAddr, workAddr, name) {
        /*this.repo.updateParent(email, phone, homeAddr, workAddr, name)
            .then(add to state here); */
        this.setState(prevState => {
            prevState.profile.email = email;
            prevState.profile.phone = phone;
            prevState.profile.homeAddr = homeAddr;
            prevState.profile.workAddr = workAddr;
            prevState.profile.name = name;
            return prevState;
        });
    }

    addChild(name, username, grade, school, health, password) {
        //to-do: db call
        let child;
        this.repo.addChild(this.state.profile.id, name, username, grade, school, health, password)
        .then(childId => {
            child = new Child(name, grade, school, health, username, childId, password);
            this.setState(prevState => {
                prevState.profile.children.push(child);
                return prevState;
            })
        })
    }

    //to-do: db call
    
    componentDidMount() {
        this.repo.getParent(localStorage.getItem("userId"))
            .then((parent) => {
                this.repo.getChildren(localStorage.getItem("userId"))
                    .then(children => {
                        if(children.length != 0) {
                            children.forEach(child => {
                                parent.children.push(
                                    new Child(child["name"], child["grade"], child["school"], child["healthConditions"], child["username"], child["password"], child["id"])
                                );
                            });
                        }
                        this.setState({profile: parent});
                    });
            })
            .catch();
    }

    render() {
        return (
            <>
                {/* <div className="row header-box">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/parent`} id="addRide">Add Ride</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{`${this.state.profile.name}'s Profile`}</li>
                        </ol>
                    </nav>
                </div> */}
                <div style={{ margin: "5em" }}>
                    <h1 style={{ margin: "auto", borderradius: "5em" }} className="jumbotron jumbotron-fluid bg-info text-white w-50">Profile Information</h1>

                    <ul className="list-group">
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-user p-3 text-white text-center bg-info"> Name</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.profile.name}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-envelope p-3 text-white text-center bg-secondary"> Email</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.profile.email}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-phone p-3 text-white text-center bg-info"> Phone Number</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.profile.phone}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-home p-3 text-white text-center bg-secondary"> Home Address</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.profile.homeAddr}</li>
                        </div>
                        <div style={{ margin: "1% 30%" }}>
                            <li className="list-group-item glyphicon glyphicon-briefcase p-3 text-white text-center bg-info"> Work</li>
                            <li className="list-group-item p-3 text-black text-center"> {this.state.profile.workAddr}</li>
                        </div>
                    </ul>
                    <div className="p-3 bg-secondary text-white text-center" style={{ margin: "1% 15%" }}> Children
                  <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Grade</th>
                                    <th className="text-center">School</th>
                                    <th className="text-center">Health</th>
                                    <th className="text-center">Username</th>
                                    <th className="text-center">Emergency Contact Name</th>
                                    <th className="text-center">Emergency Contact Number</th>                                    
                                    <th />
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    this.state.profile.children.map((child, i) =>
                                        <tr className="table-dark">
                                            <td className="text-center">{child.name}</td>
                                            <td className="text-center">{child.grade}</td>
                                            <td className="text-center">{child.school}</td>
                                            <td className="text-center">{child.health}</td>
                                            <td className="text-center">{child.username}</td>
                                            <td className="text-center">{child.emergencyCName}</td>
                                            <td className="text-center">{child.emergencyCNum}</td>                                            
                                            <td className="text-center"><UpdateChild child={child} updateChild={(name, grade, school, health, username, password) => this.updateChild(name, grade, school, health, username, password, child.id)} /></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex flex-row-reverse">
                        <NewChild addChild={(name, username, grade, school, health, password) => this.addChild(name, username, grade, school, health, password)} />
                    </div>

                    <div className="d-flex flex-row-reverse">
                        <UpdateParent parent={this.state.profile} updateParent={(email, phone, homeAddr, workAddr, name) => this.updateParent(email, phone, homeAddr, workAddr, name)} />
                    </div>

                    <div className="col col-mg-8 resetPassword">
                        <h3>Change Password</h3>
                        <form>
                            <div className="form-group">
                                <input type="password" className="form-control" id="newPassword" value={this.state.newPassField} 
                                    onChange={ e => this.setState({newPassField: e.target.value})}/>
                            </div>
                            <div className="input-group-append">
                                <button className="resetButton btn btn-danger" onClick={pass => this.changePassword()}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}