import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../../../App.css"
function InfoChild(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        return (
            <>
              <Button variant="primary" onClick={handleShow}>
                { props.child.name }
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
                  <Modal.Title>Ride For {props.child.name } </Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">Grade: {props.child.grade}<br></br>
                School: {props.child.school} <span className="float-right">Heath Information: {props.child.health}</span>
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
export default InfoChild;
