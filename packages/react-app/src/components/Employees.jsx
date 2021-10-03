import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";

const { Header, Footer, Sider, Content } = Layout;

function Employees({ employees }) {
  const [employee, setEmployee] = useState();
  useEffect(() => {
    console.log("employees", employees);
  }, [employees]);
  if (!employees) {
    return <LoadingOutlined />;
  }
  return (
    <div>
      <Layout>
        {/* <Sider></Sider> */}
        {!employee && <EmployeeTable employees={employees} setEmployee={setEmployee} />}
        {employee && <EmployeeDetail employee={employee} setEmployee={setEmployee} />}
      </Layout>
    </div>
  );
}

export default Employees;
