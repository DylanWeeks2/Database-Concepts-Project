//TODO:::   Make sure Child id is passed in as part of props here (used to rate child)
//          Get buttons to actually do something (rate child in this case)

import React from 'react';
import {Card, Button } from 'react-bootstrap';
import "../../App.css"
import Info  from "./modals/Info";
import { Modal } from 'react-bootstrap';

export const DriveList = (props) => (
    <ul className="list-group">
        {
            props.activeRides.map((ride, i) => 
            <div style={{margin: "0% 5%"}}>
            
            <li style={{backgroundColor: "#a8a8a8"}} className="list-group-item" key={i}>
            <div>
                <span className="badge bg-secondary p-4 text-white">{days[ride.date]}</span>
                <span className="badge bg-info p-4 text-white">{ride.time}</span>
                <span>
                    <button className="float-right btn btn-warning p-2">Rate this Child</button>
                    <ul className="list-group text-center">
                    <div className="d-flex flex-row text-center justify-content-center">
                        <div style={{width: "25%"}}>
                        <li className="list-group-item text-white text-center bg-secondary">Pick Up</li>
                        <li className="list-group-item text-black text-center">{ride.pickupAddr}</li>
                        </div>
                        <div style={{width: "25%"}}>
                        <li className="list-group-item  p-3 text-white text-center bg-info">Destination</li>
                        <li className="list-group-item p-3 text-black text-center">{ride.destAddr}</li>
                        </div>
                    </div>
                    </ul>
                    <div>
                        <button className="btn btn-info p-2">{ride.childName} ˅</button>                      
                    </div>
                </span>
                </div>
            </li>
            </div>)
        }
    </ul>
);