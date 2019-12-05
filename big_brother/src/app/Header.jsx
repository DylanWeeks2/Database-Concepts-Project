/*
TODO:: What will the profile button do for children
*/

import React from 'react';
import {Link} from 'react-router-dom';
import "../App.css";
import { NavLink, Redirect } from 'react-router-dom';
import "./authentication/Register.css"
import { Repo } from '../api/repo';
export class Header extends React.Component {
  dashboardLink = "/";

  repo = new Repo();
  state = {
    userName: "",
    userId: parseInt(localStorage.getItem("userId")),
    pass: "",
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    redirect: false,
    redirectDash: false
  }

  onLogin() {
    //axios call with userName and pass, store userid
    //this.props.setAuthState();
    console.log("LOGGING IN", this);
    this.repo.login(this.state.userName, this.state.pass).then(user => {
      console.log("new USER, ", user.data);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", user.data.userID);
      this.setState({userId: parseInt(user.data.userID)});
      this.setState({isLoggedIn: true, redirectDash: true});
    });

  }

  onLogOut() {
    localStorage.clear();
    this.setState({redirect: true});
  }

	render() {
    let profileLink = "/";
    if (this.state.redirect) {
      this.setState({redirect: false});
      return <Redirect to='/'/>;
    }
    if (this.state.redirectDash) {
      this.setState({redirectDash: false});
      return <Redirect to={this.dashboardLink} />
    }
    console.log("Logged in? ", this.state.isLoggedIn);
    if(this.state.isLoggedIn) {
      if(this.state.userId < 200000  && this.state.userId >= 100000) {
        profileLink = '/parent/profile';
        this.dashboardLink = '/parent';
      } else if(this.state.userId >= 300000) {
        profileLink = '/driver/profile';
        this.dashboardLink = '/driver';
      }
      else {
        profileLink = '/';
        this.dashboardLink = '/child';
      }
    }
    console.log(profileLink);

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
                <a className="navbar-brand text-white" href={this.dashboardLink}>Big Brother</a>
              </div>
              <div className="navbar-form navbar-right" style={ {"display": localStorage.getItem("isLoggedIn") ? 'none' : 'block'} }>
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
                    <button type="button" className="btn btn-secondary" onClick={() => this.onLogin() }>Log In</button>
                  </div>
                </div>
              </div>

              <div className="btn-group navbar-right" style={ {"display": localStorage.getItem("isLoggedIn") ? 'block' : 'none'} }>

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
