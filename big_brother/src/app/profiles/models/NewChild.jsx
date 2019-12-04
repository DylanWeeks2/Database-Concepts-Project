import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../App.css"

function NewChild(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.elements.name.value;
        const username = form.elements.username.value;
        const grade = form.elements.grade.value;
        const school = form.elements.school.value;
        const health = form.elements.health.value;
        const password = form.elements.password.value;
        props.addChild(name, username, grade, school, health, password);
        handleClose();
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn btn-primary p-2" style={{margin: "1% 15% 1% 1%"}}>
                New Child
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
                    <Modal.Title>New Child</Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Group controlId="grade">
                            <Form.Label>Grade</Form.Label>
                            <Form.Control as="select" >
                                 {
                                     ["PreK", "Kindergarten"].concat([...Array(12).keys()].map(x => x+1)).map(x => <option key={x} value={x}>{x}</option>)
                                 }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="school">
                                 <Form.Label>School</Form.Label>
                                 <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Group controlId="health">
                            <Form.Label>Health</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  />
                        </Form.Group>
                        <Button variant="success" type="submit" > Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default NewChild;