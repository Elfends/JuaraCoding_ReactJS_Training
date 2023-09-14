import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import configApi from "../config.api";
import WidgetEmployeeAdd from "../components/WidgetEmployeeAdd";
import WidgetNavbar from "../components/WidgetNavbar";
import WidgetEmployeeDetail from "../components/WidgetEmployeeDetail";

const PageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  
  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/employee`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem("token")
        }
      })

      if (!response.ok) {
        throw new Error(`Error! status ${response.status}`)
      }

      const content = await response.json();
      setEmployees(content)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    get();
    return () => {}
  }, [])

  const employeeAddListener = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error)
    }
  }

  const employeeUpdateListener = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error)
    }
  }

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Employees</h3>
            <WidgetEmployeeAdd eventListener={employeeAddListener} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Basic Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { employees.length > 0 && employees.map((item) => (
                  <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>{payroll.basicSalary.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td>
                    <td>
                      <WidgetEmployeeDetail employeeId={item._id} eventListener={employeeUpdateListener} />
                    </td>
                  </tr>
                )) }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageEmployees;