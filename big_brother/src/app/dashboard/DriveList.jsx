import React from "react"
import { Ride } from "../../Ride"

export const DriveList = (props) => (
    <ul className="list-group">
        {
            props.activeRides.map((ride, i) => 
            <li className="list-group-item" key={i}>
                <div>{ride.date}</div>
                <span className="badge">{ride.time}</span>
                <span>
                    <button className="float-right">Cancel</button>
                    <div>{ride.pickupAddr}</div>
                    <div>
                        <button>+</button>
                        {ride.childName}
                    </div>
                </span>
            </li>)
        }
    </ul>
);