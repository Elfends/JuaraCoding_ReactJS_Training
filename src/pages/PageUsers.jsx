import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import configApi from "../config.api";
import WidgetUserAdd from "../components/WidgetUserAdd";
import WidgetNavbar from "../components/WidgetNavbar";
import WidgetUserDetail from "../components/WidgetUserDetail";

const PageUsers = () => {
  const [users, setUsers] = useState([]);
  
  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users`, {
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
      setUsers(content)
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    get();
    return () => {}
  }, [])

  const userAddListener = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error)
    }
  }

  const userUpdateListener = (e) => {
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
            <h3>Users</h3>
            <WidgetUserAdd eventListener={userAddListener} />
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { users.length > 0 && users.map((item) => (
                  <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>
                      <WidgetUserDetail userId={item._id} eventListener={userUpdateListener} />
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

export default PageUsers;