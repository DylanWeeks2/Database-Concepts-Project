import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AddRide(props) {

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.elements);
         const form = event.target;
        // console.log(form.elements);
         const date = form.elements.date.value;
         const time = form.elements.time.value;
         if (!/^( )*\d{1,2}:\d{2}(:\d{2}){0,1} (PM|AM)( )*$/.test(time)) {
          alert("Time is not in the correct format! Ex: '12:00 PM'");
          return;
        }
         const children = form.elements.child.value;
         const driver = form.elements.drivers.value;
         const address = form.elements.address.value;
         const notes = form.elements.notes.value;
         handleClose();
         props.submitRide(new Date(String(date) + " " + String(time)), children, driver, address, notes);
    };
    console.log(show);
        return (
            <>
              <Button variant="success" className=" btn-small" id="submit-row" onClick={handleShow}>
                New Ride
              </Button>
        
              <Modal style={{opacity:1}} show={show} onHide={handleClose}
            size="lg"
            animation={false}
              autoFocus="true"
              enforceFocus="true"
              aria-labelledby="contained-modal-title-vcenter"
              className="my-modal"
              centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add A Ride</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="text" placeholder="12:00 PM"/>
                        </Form.Group>
                        <Form.Group controlId="child">
                            <Form.Label>Child</Form.Label>
                            <Form.Control as="select">
                                {
                                    props.children.map(x => <option key={x.id} value = {x.id}>{x.name}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="drivers">
                        <Form.Label>Driver</Form.Label>
                            <Form.Control as="select">
                                {
                                    props.drivers.map(x => <option key={x.id} value = {x.id}>{`${x.name}, ${x.phone}, ${x.year} ${x.make} ${x.model}, ${x.numSeats} seats`}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="1234 example st." />
                        </Form.Group>
                        <Form.Group controlId="notes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control type="textarea" rows="3" />
                        </Form.Group>
                        <Button variant="success" type="submit" > Submit</Button>
                    </Form>
                </Modal.Body>
              </Modal>
            </>
          );

}
export default AddRide;