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
        let date = form.elements.date.value;
        let start = form.elements.start.value;
        let end = form.elements.end.value;
        props.submitAvailability(date, new Date(String(date) + " " + String(start)), new Date(String(date) + " " + String(end)));
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
                        <Form.Group controlId="date">
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