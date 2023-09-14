import { useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import configApi from "../config.api";
import PayrollModel from "../models/PayrollModel";
import WidgetEmployeePreview from "./WidgetEmployeePreview";
import WidgetCommonIDR from "./WidgetCommonIDR";
import EmployeeModel from "../models/EmployeeModel";
import WidgetCommonHumanDate from "./WidgetCommonHumanDate";

const WidgetPayrollDetail = ({payrollId}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [payroll, setPayroll] = useState(PayrollModel);
  const [employee, setEmployee] = useState(EmployeeModel);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/salary/${payrollId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      let content = await response.json();
      setPayroll(content);
      // eventListener({detail: { status: true, content }})
    } catch (error) {
      // eventListener({detail: { status: false, error }})
    }
  }

  const employeePreviewListener = (e) => {
    if (e.detail.status) {
      setEmployee(e.detail.content)
    } else {

    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Detail
      </Button>

      <Modal show={show} onHide={handleClose} onShow={get} size="lg" backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {employee.email}
            <br />
            <WidgetCommonHumanDate date={payroll.payrollDate} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WidgetEmployeePreview employeeId={payroll.employeeId} eventListener={employeePreviewListener} />
          <Row>
            <Col>
              <Table striped bordered hover>
                <caption style={{captionSide: "top"}}>Others Allowance</caption>
                <thead>
                  <tr>
                    <th>Allowance</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.othersAllowance.map((allowance, index) => (
                    <tr key={index}>
                      <td>{allowance.name}</td>
                      <td>{allowance.total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table striped bordered hover>
                <caption style={{captionSide: "top"}}>Others Deduction</caption>
                <thead>
                  <tr>
                    <th>Deduction</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.othersDeduction.map((deduction, index) => (
                    <tr key={index}>
                      <td>{deduction.name}</td>
                      <td>{deduction.total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <caption style={{captionSide: "top"}}>Pay Slip</caption>
                <thead>
                  <tr>
                    <th>Total Allowance</th>
                    <th>Total Deduction</th>
                    <th>Total Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><WidgetCommonIDR value={payroll.totalAllowance} /></td>
                    <td><WidgetCommonIDR value={payroll.totalDeduction} /></td>
                    <td><WidgetCommonIDR value={payroll.totalSalary} /></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={update}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default WidgetPayrollDetail;