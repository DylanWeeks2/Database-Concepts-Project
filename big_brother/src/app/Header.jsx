/*
TODO:: What will the profile button do for children
*/

import React from 'react';
import {Link} from 'react-router-dom';

import { NavLink } from 'react-router-dom';
import "./authentication/Register.css"
export class Header extends React.Component {

  state = {
    isLoggedIn: true,
    userId: 200002,
    userName: "",
    pass: "",
  }

  onLogin() {

  }

  onForgotPass() {

  }

  onLogOut() {

  }
  
	Login() {
		alert("Sdsd");
	}

	render() {
    let profileLink;
    if(this.state.isLoggedIn) {
      if(this.state.userId < 200000) {
        profileLink = '/parent/profile';
      } else if(this.state.userId < 300000) {
        profileLink = '/driver/profile';
      } else if(this.state.userId >= 300000) {
        profileLink = '';
      }
    }

		return (
			<>
			<head>
        <title>Big Brother</title>
        <link rel="stylesheet" href="sign_up.css"></link>
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"></link>
			
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
                    
                    <input type="text"
                           id="userName"
                           name="userName"
                           className="form-control"
                           placeholder="Username"
                           value={this.state.userName}
                           onChange={ e => this.setState({userName: e.target.value})}></input>
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">P</div>
                    
                    <input type="password"
                           id="pass"
                           name="pass"
                           className="form-control"
                           placeholder="Password"
                           value={this.state.pass}
                           onChange={ e => this.setState({pass: e.target.value})}></input>
                    </div>
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
                {
                  /*<button type="button"
                        className="btn btn-secondary"
                        onClick={ () => this.onLogin() }>Profile</button> */
                }

                <Link to={profileLink} className="btn btn-secondary" params={{id: this.state.userId}}>Profile</Link>

                <button type="button"
                        className="btn btn-secondary"
                        onClick={ () => this.onLogOut() }>Log Out</button>
              </div>
            </div>
          </nav>
			</body>
			</>
			);
		}
}
