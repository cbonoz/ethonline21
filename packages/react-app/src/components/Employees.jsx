import React, { useState, useEffect } from "react";
import { Button, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";

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
      <Layout>
        {/* <Sider></Sider> */}
        {!employee && (
          <div>
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
