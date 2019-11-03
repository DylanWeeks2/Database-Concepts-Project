import React from 'react';

import { NavLink } from 'react-router-dom';
import "./authentication/Register.css"
export class Header extends React.Component {

	Login() {
		alert("Sdsd");
	}

	render() {
		return (
			<>
			<head>
              <title>Big Brother</title>
  <meta charset="utf-8"></meta>
  <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"></link>
  <link rel="stylesheet" href="sign_up.css"></link>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  </head>
  <body>
            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
        
                <a class="navbar-brand" href="#">Big Brother</a>
        
              </div>
              <div class="collapse navbar-collapse" id="myNavbar">
        
                <ul class="nav navbar-nav navbar-right">
        
        
                  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        
                    <form id="signin" class="navbar-form navbar-right" role="form">
        
                      <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input id="email" type="email" onchange={this.handleChange} class="form-control" name="email" placeholder="Email Address"/>
                      </div>
        
                      <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input id="password" type="password" onchange={this.handleChange} class="form-control" name="password"  placeholder="Password"/>
                      </div>
        
                      <button type="button" class="btn btn-primary" onClick={() => this.Login()}>Login</button>
                      <button type="button" class="btn btn-primary">Forgot Password</button>
                    </form>
        
                  </div>
                </ul>
              </div>
            </div>
          </nav>
			  </body>
				</>
			);
		}
}
