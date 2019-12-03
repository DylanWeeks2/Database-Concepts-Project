import React, { Component } from 'react';
import { Card, Button, Col, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Register.css'

export class Register extends Component {

  state = {
    email: "",
    phone: "",
    homeAddr: "",
    workAddr: "",
    name: "",
    children: ""
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

  render() {
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
                    <input required type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    <label htmlFor="email" id="label">Your Email:</label>
                    <input required type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    <label htmlFor="phone" id="label">Your Phone Number (no spaces):</label>
                    <input required type="text" className="form-control" placeholder="XXXXXXXXXX" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                    <label htmlFor="homeadr" id="label">Your Home Address:</label>
                    <input required type="text" className="form-control" placeholder="Home Address" value={this.state.homeAddr} onChange={e => this.setState({ homeAddr: e.target.value })} />
                    <label htmlFor="workadr" id="label">Your Work Address (optional):</label>
                    <input required type="text" className="form-control" placeholder="Work Address (optional)" value={this.state.workAddr} onChange={e => this.setState({ workAddr: e.target.value })} />
                    <h5 className="dontWorry">Don't worry, you will add your children in the next step. Thanks!</h5>
                  </div>
                  <div className="form-group">
                    <center><button type="button" className="btnSubmit" onClick={() => this.onSubmit()}>Join!</button></center>
                  </div>
                </form>
              </div>

              <div className="col driver">
                <h2>Driver Signup</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name" id="label">Your Name:</label>
                    <input required type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    <label htmlFor="email" id="label">Your Email:</label>
                    <input required type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    <label htmlFor="phone" id="label">Your Phone Number (no spaces):</label>
                    <input required type="text" className="form-control" placeholder="XXXXXXXXXX" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                    <label htmlFor="homeadr" id="label">Your Home Address:</label>
                    <input required type="text" className="form-control" placeholder="Home Address" value={this.state.homeAddr} onChange={e => this.setState({ homeAddr: e.target.value })} />
                    <label htmlFor="workadr" id="label">Your Work Address (optional):</label>
                    <input required type="text" className="form-control" placeholder="Work Address (optional)" value={this.state.workAddr} onChange={e => this.setState({ workAddr: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <center><button type="button" className="btnSubmit" onClick={() => this.onSubmit()}>Join!</button></center>
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

