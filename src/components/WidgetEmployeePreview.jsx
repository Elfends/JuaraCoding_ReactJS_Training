import { useEffect, useState } from "react"
import { Col, Row, Table } from "react-bootstrap"
import EmployeeModel from "../models/EmployeeModel"
import configApi from "../config.api";
import WidgetCommonIDR from "./WidgetCommonIDR";

const WidgetEmployeePreview = ({employeeId, eventListener}) => {
  const [employee, setEmployee] = useState(EmployeeModel);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/employee/${employeeId}`, {
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
      setEmployee(content);
      eventListener({detail: { status: true, content }})
    } catch (error) {
      eventListener({detail: { status: false, error }})
    }
  }

  useEffect(() => {
    get();
    return () => {}
  }, [employeeId])

  return (
    <>
      <Row>
        <Col>
          <Table striped bordered hover>
            <caption style={{captionSide: "top"}}>Employee</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Basic Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>
                  <WidgetCommonIDR value={employee.basicSalary}/>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped hover bordered>
            <caption style={{captionSide: "top"}}>Allowances</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {employee.allowances && employee.allowances.map((allowance, index) => (
                <tr key={index}>
                  <td>{allowance.name}</td>
                  <td><WidgetCommonIDR value={allowance.total}/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
        <Table striped hover bordered>
            <caption style={{captionSide: "top"}}>Deductions</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {employee.deductions && employee.deductions.map((deduction, index) => (
                <tr key={index}>
                  <td>{deduction.name}</td>
                  <td><WidgetCommonIDR value={deduction.total}/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default WidgetEmployeePreview;