import React from 'react';
import { Link } from 'react-router-dom';
import driverKids from './driverKids.jpg';

export class Home extends React.Component {
    render() {
        return (
            <center><div className="mission">
                <img src={driverKids} alt="logo" />
                <h2>Our Mission:</h2>
                <p>LOREM IPSUM BLAH BLAH BLAH</p>
                <Link to={`/register`} className="btn btn-success" id="join">Register Now!</Link></div></center >
        );
    }
}
