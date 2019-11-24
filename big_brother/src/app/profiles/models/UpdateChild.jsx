import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../App.css"

function UpdateChild(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.elements.name.value;
        const grade = form.elements.grade.value;
        const school = form.elements.school.value;
        const health = form.elements.health.value;
        props.updateChild(name, grade, school, health);
        handleClose();
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn btn-info p-2" style={{margin: "1%"}}>
                Update Child Information
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
                    <Modal.Title>Update {props.child.username}'s information</Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={props.child.name} />
                        </Form.Group>
                        <Form.Group controlId="grade">
                            <Form.Label>Grade</Form.Label>
                            <Form.Control as="select" defaultValue={props.child.grade}>
                                 {
                                     ["PreK", "Kindergarten"].concat([...Array(12).keys()].map(x => x+1)).map(x => <option key={x} value={x}>{x}</option>)
                                 }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="school">
                                 <Form.Label>School</Form.Label>
                                 <Form.Control type="text" defaultValue={props.child.school} />
                        </Form.Group>
                        <Form.Group controlId="health">
                            <Form.Label>Health</Form.Label>
                            <Form.Control type="text" defaultValue={props.child.health} />
                        </Form.Group>
                        <Button variant="success" type="submit" > Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default UpdateChild;