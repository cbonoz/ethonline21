import React, { useState, useEffect } from "react";
import { Button, Layout, Breadcrumb } from "antd";
import { LoadingOutlined, HomeOutlined } from "@ant-design/icons";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";
import { getName } from "../util";

const { Header, Footer, Sider, Content } = Layout;

function Employees({ employees, history }) {
  const [employee, setEmployee] = useState();
  useEffect(() => {
    console.log("employees", employees);
  }, [employees]);
  if (!employees) {
    return <LoadingOutlined />;
  }

  const isLoaded = !!employees;

  return (
    <div>
      <br />
      <Breadcrumb>
        {/* https://ant.design/components/breadcrumb/#header */}
        <Breadcrumb.Item href="/" className="pointer">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item className="pointer" onClick={() => setEmployee(undefined)}>
          Employees
        </Breadcrumb.Item>
        {employee && <Breadcrumb.Item className="pointer">{getName(employee)}</Breadcrumb.Item>}
      </Breadcrumb>
      <Layout>
        {/* <Sider></Sider> */}
        {!employee && (
          <div>
            <div className="heading">Employees</div>
            {!isLoaded && <Button onClick={() => history.push("/register")}>Upload</Button>}
            <EmployeeTable employees={employees} setEmployee={setEmployee} />
          </div>
        )}
        {employee && <EmployeeDetail employee={employee} setEmployee={setEmployee} />}
      </Layout>
    </div>
  );
}

export default Employees;
