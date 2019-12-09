import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../../../App.css"
function Info(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        return (
            <>
              <Button variant="primary" onClick={handleShow}>
                More info
              </Button>
        
              <Modal style={{opacity:1}} show={show} onHide={handleClose}
            size="lg"
            animation={false}
              autoFocus="true"
              enforceFocus="true"
              aria-labelledby="contained-modal-title-vcenter"
              className="my-modal"
              centered>
                <Modal.Header closeButton>
                  <Modal.Title>Ride For {props.ride.pickup_time.toLocaleString('default', { month: 'long' }) }  {new Date(props.ride.pickup_time).getDate()}, {new Date(props.ride.pickup_time).getFullYear()} </Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">Ride is scheduled for {new Date(props.ride.pickup_time).toLocaleTimeString('en-US')}<br></br>
                Driver is {props.ride.driverName} <span className="float-right">For Child {props.ride.childName}</span>
                <br></br>
                Pickup at {props.ride.pickupAddr} <span className="float-right">Going to {props.ride.destAddr}</span> <br></br>
                Notes: {props.ride.notes}
                {
                  props.car != null ?
                  <>
                  <hr></hr>
                    Car Info: 
                    Make: {props.car.make}  <br></br>
                    Model: {props.car.model}<br></br>
                    Year: {props.car.year}<br></br>
                    Color: {props.car.color}<br></br>
                    License #: {props.car.license}<br></br>
                    # of Seats: {props.car.numSeats}<br></br>
                    Condition: {props.car.condition}<br></br>
                    Ammenities: {props.car.ammenities}<br></br>
                    <hr></hr>
                  </>
                  :  " "
                }

                {
                  props.services.length > 0 ?
                  <>
                  Driver Services:
                  {
                    props.services.length > 0 ?
                    props.services.map((service, i) => 
                      <>
                        <center><h5>Service {i+1}</h5></center>
                        <p>Date: {new Date((service.date)).toISOString().slice(0,10).replace(/-/g,"/")}</p>
                        <p>Type: {`${service.type}`}</p>
                        <p>Description: {`${service.descr}`}</p>
                      </>
                    )
                    : " "
                  }
                  </>
                  : " "
                }
                {
                  props.accidents.length >0 ?
                  <>
                  <hr></hr>
                  Driver Accidents:
                  {
                    props.accidents.length > 0 ?
                    props.accidents.map((accident, i) => 
                      <>
                        <center><h5>Accident {i+1}</h5></center>
                        <p>Date: {new Date((accident.date)).toISOString().slice(0,10).replace(/-/g,"/")}</p>
                        <p>Type: {`${accident.severity}`}</p>
                        <p>Type: {`${accident.type}`}</p>
                        <p>Description: {`${accident.descr}`}</p>
                      </>
                    )
                    : " "
                  }
                  </>
                  : " "
                }*/}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
        }
export default Info;
