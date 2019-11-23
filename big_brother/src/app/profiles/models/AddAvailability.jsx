import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../App.css"

function AddAvailiability(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        // we should add the date and start and convert to a datetime
        let driverId = 0;
        let date = form.elements.date.value;
        let start = form.elements.start.value;
        let end = form.elements.end.value;
        if(date === "") {
            alert("Please enter a valid date!");
            return;
        }
        if (!/^( )*\d{1,2}:\d{2}(:\d{2}){0,1} (PM|AM)( )*$/.test(start) || !/^( )*\d{1,2}:\d{2}(:\d{2}){0,1} (PM|AM)( )*$/.test(end)) {
            alert("Time is not in the correct format! Ex: '12:00 PM'");
            return;
        }
        debugger;
        props.submitAvailability(driverId, date, new Date(String(date) + " " + String(start)), new Date(String(date) + " " + String(end)));
    };
    return (
        <>
            <Button variant="primary" className="p-2" onClick={handleShow} style={{ margin: "1% 15% 1% 1%" }}>
                Add Availiability
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
                    <Modal.Title>Add working hours</Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group required controlId="date">
                            <Form.Label>date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group controlId="start">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="text" placeholder="12:00 PM"/>
                        </Form.Group>
                        <Form.Group controlId="end">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="text" placeholder="12:00 PM"/>
                        </Form.Group>
                        <Button variant="success" type="submit" > Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddAvailiability;