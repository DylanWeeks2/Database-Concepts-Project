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
        <link rel="stylesheet" href="sign_up.css"></link>
      </head>
      <body>
          <nav className="navbar bg-dark navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">   
                <a className="navbar-brand" href="#">Big Brother</a>
              </div>
              <div className="navbar-form navbar-right">
                <form className="form-inline navbar-form navbar-right">
                  <ul className="list-group-flush">
                    <li className="list-group-item list-group-item-primary">
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input type="text" className="form-control" placeholder="Username"/>
                      </div>
                    </li>
                    <li className="list-group-item list list-group-item-primary">
                      <div className="input-group">
                        <span className="input-group-text">P</span>
                        <input type="password" className="form-control" placeholder="Password"/>
                      </div>
                    </li>
                  </ul>
                  <div className="btn-group-vertical ml-2">
                    <button className="btn btn-outline-success mr-3" type="submit">Login</button>
                    <button className="btn btn-outline-success" type="submit">Forgot Password</button>                    
                  </div>
                </form>
              </div>
            </div>
          </nav>
			</body>
			</>
			);
		}
}
