import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../App.css"

function AddService(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const driverId = 0;
        // console.log(form.elements);
        const date = form.elements.date.value;
        let type = form.elements.type.value;
        if(type == "Other") {
            type = form.elements.other.value;
        }
        const description = form.elements.description.value;
        handleClose();
        props.submitService(driverId, date, type, description);
    };
    return (
        <>
            <Button variant="primary" className="p-2" onClick={handleShow} style={{ margin: "1% 15% 1% 1%" }}>
                Add Service
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
                    <Modal.Title>Report a service</Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" >
                                {
                                    ["Routine", "Part Replacement", "Other"].map( x =>
                                        <option key={x} value={x}>{x}</option>
                                        )
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="other">
                                <Form.Label>Other:</Form.Label>
                                <Form.Control type="text" placeholder="only enter if selected other" />
                        </Form.Group>
                        <Form.Group controlId="description">
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
export default AddService;