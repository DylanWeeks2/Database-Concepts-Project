import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../../../App.css"

function UpdateParent(props) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const email = form.elements.email.value;
        const name = form.elements.name.value;
        const workAddr = form.elements.workAddr.value;
        const homeAddr = form.elements.homeAddr.value;
        const phone = form.elements.phone.value;
        props.updateParent(email, phone, homeAddr, workAddr, name);
        handleClose();
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
                    <Modal.Title>Update information for {props.parent.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="clearfix">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" defaultValue={props.parent.name}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={props.parent.email}/>
                        </Form.Group>
                        <Form.Group controlId="workAddr">
                            <Form.Label>Work Address</Form.Label>
                            <Form.Control type="address" defaultValue={props.parent.workAddr}/>
                        </Form.Group>
                        <Form.Group controlId="homeAddr">
                            <Form.Label>Home Address</Form.Label>
                            <Form.Control type="address" defaultValue={props.parent.homeAddr}/>
                        </Form.Group>
                        <Form.Group controlId="phone" >
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" defaultValue={props.parent.phone}/>
                        </Form.Group>
                        <Button variant="success" type="submit" > Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default UpdateParent;