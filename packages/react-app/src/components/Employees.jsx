import React, { useState } from "react";
import { Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getName } from "../util";

const { Header, Footer, Sider, Content } = Layout;

function Employees({ employees }) {
  const [employee, setEmployee] = useState();
  if (!employees) {
    return <LoadingOutlined />;
  }
  return (
    <div>
      <Layout>
        <Sider>
          {employees.map((e, i) => {
            return <div onClick={() => setEmployee(e)}>{JSON.stringify(employee)}</div>;
          })}
        </Sider>
        <Layout>
          {employee && (
            <>
              <Header>{getName(employee)}</Header>
              <Content>
                <div>
                  {/* TODO: Add management section  */}
                  {JSON.stringify(employee)}
                </div>
              </Content>
              {/* <Footer>Footer</Footer> */}
            </>
          )}
        </Layout>
      </Layout>
    </div>
  );
}

export default Employees;
