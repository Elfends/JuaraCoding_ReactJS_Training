import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserModel from '../models/UserModel';
import configApi from '../config.api';
import { Form } from 'react-bootstrap';

const WidgetUserDetail = ({ eventListener, userId }) => {
  const [user, setUser] = useState(UserModel)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      let dataUser = await response.json();
      setUser(dataUser)
      // eventListener({detail: { status: true, content }})
      
    } catch (error) {
      // eventListener({detail: { status: false, error }})
    }
  }

  const update = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      handleClose()
      let content = await response.json();
      setUser(UserModel)
      eventListener({detail: { status: true, content }})
    } catch (error) {
      eventListener({detail: { status: false, error }})
    }
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser((user) => ({...user, [name]: value}))
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Detail
      </Button>
      {user && (
        <Modal show={show} onHide={handleClose} onShow={get}>
          <Modal.Header closeButton>
            <Modal.Title>{user.email}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' value={user.email} onChange={handleInput}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' name='firstName' value={user.firstName} onChange={handleInput}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' name='lastName' value={user.lastName} onChange={handleInput}/>
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={update}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default WidgetUserDetail