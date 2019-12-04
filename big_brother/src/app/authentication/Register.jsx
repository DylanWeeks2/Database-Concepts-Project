import React, { Component } from 'react';
import { Card, Button, Col, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Register.css'
import { ParentUser, DriverUser } from '../../models';
import { Repo } from '../../api/repo';

export class Register extends Component {

  repo = new Repo();
  state = {
    parent_email: "",
    parent_username: "",
    parent_phone: "",
    parent_homeAddr: "",
    parent_workAddr: "",
    parent_name: "",
    parent_children: "",
    parent_password: "",
    gender: "",
    driver_homeAddr: "",
    driver_name : "",
    driver_phone: "",
    driver_email: "",
    driver_password: "",
    driver_username: "",
    parent_redirect: false,
    driver_redirect: false
  }

  //this is the page that holds the register
  Login() {
    alert("login route here");
  }

  newAccount(reg) {
    alert(reg);
    console.log(reg);
    //TODO: after this we can send this to a repository
    //the reporsitory will return a new user?
  }
  hideLoginAlert() {
    this.setState(
      {
        loginAlertShow: false
      }
    )
  }

  addParent() {
    let parent = new ParentUser(null, this.state.parent_email, this.state.parent_phone, this.state.parent_homeAddr, this.state.parent_workAddr, this.state.parent_name, null, this.state.parent_password, this.state.parent_username);
    this.repo.addParent(parent).then(user => {
      console.log("new USER, ", user.id);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", user.id);
      this.setState({ parent_redirect: true })
    });

  }

  addDriver() {
    debugger
    let driver = new DriverUser(null, this.state.driver_name, this.state.gender, null, this.state.driver_email, this.state.driver_phone, null,null, null, null, null, null, null, null,this.state.driver_username, this.state.driver_password);
    this.repo.addDriver(driver).then(user => {
      console.log("new USER, ", user.id);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", user.id);
      this.setState({ driver_redirect: true })
    });

  }

  render() {
    if (this.state.parent_redirect) {
      this.setState({parent_redirect: false});
      console.log("PROFILE REDIRECT", this.state.parent_redirect);
      return <Redirect to='/parent/profile'/>;
    }
    else if (this.state.driver_redirect) {
      this.setState({driver_redirect: false});
      console.log("Driver REDIRECT", this.state.driver_redirect);
      return <Redirect to='/driver/profile'/>;
    }
    return (
      <>
        <head>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"></link>
          <link rel="stylesheet" href="sign_up.css"></link>
          <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

          <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        </head>
        <body>
          {/*<div>
              <div class="container">
                <div class="col-md-6">
                  <div id="logbox">
                    <form id="signup">
                      <h1>Create an Account</h1>
                      <input name="user[fName]" type="name" placeholder="First name" class="input pass" />
                      <input name="user[lName]" type="name" placeholder="Last name" class="input pass" />
                      <input name="user[email]" type="email" placeholder="Email Address" class="input pass" />
                      <input name="user[password]" type="password" placeholder="Choose a password" required="required" class="input pass" />
                      <input name="user[password2]" type="password" placeholder="Confirm password" required="required" class="input pass" />
                      <input type="submit" value="Sign up!" class="inputButton" onClick={x => this.newAccount(x)} />

                    </form>
                  </div>
                </div>


              </div>
            </div>*/}
          <div className="container signup-container">
            <div className="row">
              <div className="col parent">
                <h2>Parent Signup</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name" id="label">Your Name:</label>
                    <input required type="text" className="form-control" placeholder="Name" value={this.state.parent_name} onChange={e => this.setState({ parent_name: e.target.value })} />
                    <label htmlFor="name" id="label">Username:</label>
                    <input required type="text" className="form-control" placeholder="username" value={this.state.parent_username} onChange={e => this.setState({ parent_username: e.target.value })} />
                    <label htmlFor="password" id="label">Password:</label>
                    <input required type="password" className="form-control"value={this.state.parent_password} onChange={e => this.setState({ parent_password: e.target.value })} />
                    <label htmlFor="email" id="label">Your Email:</label>
                    <input required type="text" className="form-control" placeholder="Email" value={this.state.parent_email} onChange={e => this.setState({ parent_email: e.target.value })} />
                    <label htmlFor="phone" id="label">Your Phone Number (no spaces):</label>
                    <input required type="text" className="form-control" placeholder="XXXXXXXXXX" value={this.state.parent_phone} onChange={e => this.setState({ parent_phone: e.target.value })} />
                    <label htmlFor="homeadr" id="label">Your Home Address:</label>
                    <input required type="text" className="form-control" placeholder="Home Address" value={this.state.parent_homeAddr} onChange={e => this.setState({ parent_homeAddr: e.target.value })} />
                    <label htmlFor="workadr" id="label">Your Work Address (optional):</label>
                    <input required type="text" className="form-control" placeholder="Work Address (optional)" value={this.state.parent_workAddr} onChange={e => this.setState({ parent_workAddr: e.target.value })} />
                    <h5 className="dontWorry">Don't worry, you will add your children in the next step. Thanks!</h5>
                  </div>
                  <div className="form-group">
                    <center><button type="button" className="btnSubmit" onClick={() => this.addParent()}>Join!</button></center>
                  </div>
                </form>
              </div>

              <div className="col driver">
                <h2>Driver Signup</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name" id="label">Your Name:</label>
                    <input required type="text" className="form-control" placeholder="Name" value={this.state.driver_name} onChange={e => this.setState({ driver_name: e.target.value })} />
                    <label htmlFor="name" id="label">Username:</label>
                    <input required type="text" className="form-control" placeholder="Username" value={this.state.driver_username} onChange={e => this.setState({ driver_username: e.target.value })} />
                    <label htmlFor="password" id="label">Password:</label>
                    <input required type="password" className="form-control"value={this.state.driver_password} onChange={e => this.setState({ driver_password: e.target.value })} />
                    <label htmlFor="email" id="label">Your Email:</label>
                    <input required type="text" className="form-control" placeholder="Email" value={this.state.driver_email} onChange={e => this.setState({ driver_email: e.target.value })} />
                    <label htmlFor="phone" id="label">Your Phone Number (no spaces):</label>
                    <input required type="text" className="form-control" placeholder="XXXXXXXXXX" value={this.state.driver_phone} onChange={e => this.setState({ driver_phone: e.target.value })} />
                    <label htmlFor="gender" id="label">Gender:</label>
                    <input required type="text" className="form-control" placeholder="Gender" value={this.state.gender} onChange={e => this.setState({ gender: e.target.value })} />
                    <h5 className="dontWorry">Don't worry, you can add your car info in the profile. Thanks!</h5>
                  </div>
                  <div className="form-group">
                    <center><button type="button" className="btnSubmit" onClick={() => this.addDriver()}>Join!</button></center>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </body>
      </>
    );
  }
}

