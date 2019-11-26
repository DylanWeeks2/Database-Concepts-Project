import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../App.css"

function UpdateDriver(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.elements.name.value;
        const gender = form.elements.gender.value;
        const bio = form.elements.bio.value;
        const email = form.elements.email.value;
        const phone = form.elements.phone.value;
        const make = form.elements.make.value;
        const model = form.elements.model.value;
        const year = form.elements.year.value;
        const color = form.elements.color.value;
        const license = form.elements.license.value;
        const numSeats = form.elements.numSeats.value;
        const condition = form.elements.condition.value;
        const ammenities = form.elements.ammenities.value;
        handleClose();
        props.updateDriver(name, gender, bio, email, phone, make, model, year, color, license, numSeats, condition, ammenities);
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn btn-info p-2" style={{margin: "1% 15% 1% 1%"}}>
                Update My Information
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
                    <Modal.Title>Update information for {props.driver.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.name}/>
                        </Form.Group>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="test" defaultValue={props.driver.gender} />
                        </Form.Group>
                        <Form.Group controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="textarea" rows="3" defaultValue={props.driver.bio} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={props.driver.email} />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.phone} />
                        </Form.Group>
                        <Form.Group controlId="make">
                            <Form.Label>Car Make</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.car.make} />
                        </Form.Group>
                        <Form.Group controlId="model">
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.car.model} />
                        </Form.Group>
                        <Form.Group controlId="year">
                            <Form.Label>Car year</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.car.year} />
                        </Form.Group>
                        <Form.Group controlId="color">
                            <Form.Label>Car Color</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.car.color} />
                        </Form.Group>
                        <Form.Group controlId="license">
                            <Form.Label>Car License</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.car.license} />
                        </Form.Group>
                        <Form.Group controlId="numSeats">
                            <Form.Label>Car Number of Seats</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.car.numSeats} />
                        </Form.Group>
                        <Form.Group controlId="condition">
                            <Form.Label>Car Condition</Form.Label>
                            <Form.Control as="select">
                            {
                                ["Like new", "Slightly Used", "Heavily Used"].map(x => <option key={x}>{x}</option>)
                            }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="ammenities">
                            <Form.Label>Car Ammenities</Form.Label>
                            <Form.Control type="text" defaultValue={props.driver.car.ammenities} />
                        </Form.Group>
                        <Button variant="success" type="submit" > Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default UpdateDriver;