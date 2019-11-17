import React from 'react';

import { NavLink } from 'react-router-dom';
import "./authentication/Register.css"
export class Header extends React.Component {

  state = {
    isLoggedIn: false
  }

	Login() {
		alert("Sdsd");
	}

	render() {
		return (
			<>
			<head>
        <title>Big Brother</title>
        <link rel="stylesheet" href="sign_up.css"></link>
      </head>
      <body>
          <nav className="navbar bg-dark navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">   
                <a className="navbar-brand text-white" href="#">Big Brother</a>
              </div>
              <div className="navbar-form navbar-right" style={ {"display": this.state.isLoggedIn ? 'none' : 'block'} }>
                <div className="btn-toolbar">
                  <div className="input-group mr-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">@</div>
                    </div>
                    <input type="text" className="form-control" placeholder="Username"></input>
                  </div>

                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">P</div>
                    </div>
                    <input type="password" className="form-control" placeholder="Password"></input>
                  </div>

                  <div className="button-group ml-2">
                    <button type="button" className="btn btn-secondary">Log In</button>
                  </div>
                  <div className="button-group ml-2">
                    <button type="button" className="btn btn-secondary">Forgot Password</button>
                  </div>
                </div>
              </div>

              <div className="btn-group navbar-right" style={ {"display": this.state.isLoggedIn ? 'block' : 'none'} }>
                <button type="button" className="btn btn-secondary">Profile</button>
                <button type="button" className="btn btn-secondary">Log Out</button>
              </div>
            </div>
          </nav>
			</body>
			</>
			);
		}
}
