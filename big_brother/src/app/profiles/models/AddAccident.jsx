import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../App.css"

function AddAccident(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        // console.log(form.elements);
        const date = form.elements.date.value;
        const severity = form.elements.severity.value;
        let type = form.elements.type.value;
        if(type == "Other") {
            type = form.elements.other.value;
        }
        const description = form.elements.description.value;
        props.submitAccident(date, severity, type, description);
    };
    return (
        <>
            <Button variant="primary" className="p-2" onClick={handleShow} style={{ margin: "1% 15% 1% 1%" }}>
                Add Accident
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
                    <Modal.Title>Report an Accident</Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group controlId="severity">
                            <Form.Label>Severity</Form.Label>
                            <Form.Control as="select">
                                {
                                    [[0, "Scratch"], [1, "Fenderbender"], [2, "Totaled"]].map(x => <option key={x[0]} value={x[0]}>{x[1]}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" >
                                {
                                    [[0,"Trade Paint"], [1, "Rear End"], [2, "Head On"], [3, "T-Boned"], [4, "Other"]].map( x =>
                                        <option key={x[0]} value={x[1]}>{x[1]}</option>
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
export default AddAccident