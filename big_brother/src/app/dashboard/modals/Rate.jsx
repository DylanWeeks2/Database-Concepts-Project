/*import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
function Rate(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.elements);
        const form = event.target;
        // console.log(form.elements);
        const rating = form.elements.rating.value;
        props.submitRide(rating);
    };
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(show);
    return (
        <>
            <Button variant="success" className=" btn-small" id="submit-row" onClick={handleShow}>
                New Ride
              </Button>

            <Modal style={{ opacity: 1 }} show={show} onHide={handleClose}
                size="lg"
                animation={false}
                autoFocus="true"
                enforceFocus="true"
                aria-labelledby="contained-modal-title-vcenter"
                className="my-modal"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title>Rate your ride on {props.ride.date.toLocaleString('default', { month: 'long' })}  {props.ride.date.getDate()}, {props.ride.date.getFullYear()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="child">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control>
                                {
                                    <Rating value={this.state.rating}/>
                                    props.children.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" >Rate!</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );

}
export default AddRide;
*/