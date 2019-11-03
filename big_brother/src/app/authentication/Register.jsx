import React, { Component } from 'react';
import { Card, Button, Col, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Register.css'

export class Register extends Component {
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
    
    render () {
        return (
            <>
            <head>
  <meta charset="utf-8"></meta>
  <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"></link>
  <link rel="stylesheet" href="sign_up.css"></link>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  </head>
  <body>
          <div>
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
            <input type="submit" value="Sign up!" class="inputButton" onClick={x => this.newAccount(x)}/>

          </form>
        </div>
      </div>


    </div>
  </div>
  </body>
          </>
        );

    }
}

