import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, Col, Row, Table } from "react-bootstrap";
import configApi from "../config.api";
import EmployeeModel from "../models/EmployeeModel";

const WidgetChooseEmployee = ({ eventListener }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(EmployeeModel);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/employee`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
                                                          
      const content = await response.json();
      setEmployees(content);
    } catch (error) {
      alert(error)
    }
  }

  const choose = (emp) => {
    setEmployee(emp);
    eventListener({detail: {employee: emp, status: true}})
    handleClose()
  }

  return (
    <>
      <Card >
        {!employee._id && (
          <Card.Body>
            <Card.Title>Employee</Card.Title>
            <Card.Text>Please choose employee to add.</Card.Text>
            <Button size="sm" variant="primary" onClick={handleShow}>
              Choose Employee
            </Button>
          </Card.Body>
        )}
        {employee._id && (
          <>
            <Card.Body>
              <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
            </Card.Body>
            <Row>
              <Col>
                <Table>
                  <tbody>
                    <tr>
                      <th>Email</th>
                      <td>{employee.email}</td>
                    </tr>
                    <tr>
                      <th>Department</th>
                      <td>{employee.department}</td>
                    </tr>
                    <tr>
                      <th>Basic Salary</th>
                      <td>{employee.basicSalary}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
            <Col>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Allowance</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.allowances.length > 0 && employee.allowances.map((allowance, index) => (
                      <tr key={index}>
                        <td>{allowance.name}</td>
                        <td>{allowance.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Deduction</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.deductions.length > 0 && employee.deductions.map((deduction, index) => (
                      <tr key={index}>
                        <td>{deduction.name}</td>
                        <td>{deduction.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Card.Body>
              <Card.Text>To change Employee, click this button below</Card.Text>
              <Button variant="primary" onClick={handleShow} size="sm">
                Choose Employee
              </Button>
            </Card.Body>
          </>
        )}
      </Card>

      <Modal show={show} onHide={handleClose} onShow={get} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Choose Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { employees.length > 0  && employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.basicSalary.toLocaleString('en-US', {style: 'currency', currency: 'IDR'})}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => choose(employee)}>Choose</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> 
        </Modal.Body>
      </Modal>

    </>
  )
}

export default WidgetChooseEmployee;