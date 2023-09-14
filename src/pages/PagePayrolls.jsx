import { useEffect, useState } from "react";
import WidgetNavbar from "../components/WidgetNavbar";
import { Col, Container, Row, Table } from "react-bootstrap";
import configApi from "../config.api";
import WidgetCommonHumanDate from "../components/WidgetCommonHumanDate";
import WidgetCommonIDR from "../components/WidgetCommonIDR";

import WidgetPayrollAdd from "../components/WidgetPayrollAdd";
import WidgetPayrollDetail from "../components/WidgetPayrollDetail";
const ServiceBaseHumanDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (typeof date === "string") {
    return new Date(Date.parse(date)).toLocaleString("id-ID", options);
  }
  if (date) {
    return date.toLocaleString("id-ID", options);
  }

  return "";
};

const PagePayrolls = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [employeeNames, setEmployeeNames] = useState({}); // Store employee names

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/salary`, {
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
      setPayrolls(content);
      
      const employeeNamePromises = content.map((payroll) =>
        getNameEmploy(payroll.employeeId).then((name) => ({
          [payroll.employeeId]: name,
        }))
      );

    const employeeNameResults = await Promise.all(employeeNamePromises);
    const employeeNameMap = Object.assign({}, ...employeeNameResults);
    setEmployeeNames(employeeNameMap);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    get();
    return () => {}
  }, []);

  const payrollAddListener = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error)
    }
  }

  // const payrollDetailListener = (e) => {
  //   if (e.detail.status) {
  //     get();
  //   } else {
  //     alert(e.detail.error);
  //   }
  // }

  const getNameEmploy = async (employeeId) => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/employee/${employeeId}`, {
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
  
      if (!content.firstName || !content.lastName) {
        throw new Error('Employee data is incomplete');
      }
  
      return `${content.firstName} ${content.lastName}`;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error so it can be handled elsewhere if needed
    }
  }

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Payrolls</h3>
            <WidgetPayrollAdd eventListener={payrollAddListener} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Payroll Date</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Total Allowance</th>
                  <th>Total Deduction</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { payrolls.length > 0  && payrolls.map((payroll) => (
                  <tr key={payroll._id}>
                    <td>{employeeNames[payroll.employeeId]}</td>
                    <td>{ServiceBaseHumanDate(payroll.payrollDate)}</td>
                    <td>{payroll.payrollMonth}</td>
                    <td>{payroll.payrollYear}</td>
                    <td>{payroll.totalAllowance.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td>
                    <td>{payroll.totalDeduction.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td>
                    {/* <td>{payroll.basicSalary.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td> */}
                    <td>
                    <WidgetPayrollDetail payrollId={payroll._id} />
                      {/* <WidgetPayrollDetail eventListener={payrollDetailListener} payrollID={payroll._id} /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>  
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PagePayrolls;