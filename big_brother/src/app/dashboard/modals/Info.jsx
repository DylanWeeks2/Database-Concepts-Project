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
                  <Modal.Title>Ride For {props.ride.pickup_time.toLocaleString('default', { month: 'long' }) }  {props.ride.pickup_time.getDate()}, {props.ride.pickup_time.getFullYear()} </Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">Ride is scheduled for {props.ride.pickup_time.toLocaleTimeString('en-US')}<br></br>
                Driver is {props.ride.driverName} <span className="float-right">For Child {props.ride.childName}</span>
                <br></br>
                Pickup at {props.ride.pickupAddr} <span className="float-right">Going to {props.ride.destAddr}</span> <br></br>
                Notes: {props.ride.notes}
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
