import React, { useState, useEffect } from "react";
import { Collapse, Breadcrumb, Button, Row, Col, Avatar } from "antd";
import { HomeOutlined, LeftOutlined, UserOutlined } from "@ant-design/icons";
import { getName } from "../util";
import { Tabs } from "antd";

const { Panel } = Collapse;

const { TabPane } = Tabs;

function EmployeeDetail({ employee, setEmployee }) {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState();

  const create = async () => {
    setLoading(true);
    try {
      const w = await createWallet();
      setWallet(w);
    } catch (e) {
      console.error("wallet error", e);
    }
    setLoading(false);
  };
  function callback(key) {
    console.log(key);
  }

  const employeeName = getName(employee);
  const imgUrl =
    employee.gender === "F"
      ? "https://cdn2.iconfinder.com/data/icons/users-2/512/User_11-512.png"
      : "https://www.vhv.rs/dpng/d/131-1313329_silhouette-clip-art-image-man-vector-graphics-male.png";

  return (
    <div className="emp-detail">
      <Row>
        <Col span={8}>
          <div className="employee-card">
            <br />
            <h1>{employeeName}</h1>
            {/* <Button
              type="secondary"
              icon={<LeftOutlined />}
              size="large"
              className="back-button"
              onClick={() => setEmployee(undefined)}
            >
              Back
            </Button> */}
            <br />
            <Avatar size={256} icon={<img src={imgUrl} />} />
            <br />
            <br />
            {/* <h3>{employeeName}</h3> */}
            <p>Email: {employee.email}</p>
            <p>Gender: {employee.gender}</p>
            <p>Title: {employee.title}</p>
            <p>Salary: {employee.salary}</p>

            <p>Employee since: {employee.startDate || new Date().toLocaleDateString()}</p>

            {/* TODO: waku chat */}
            {/* Using https://github.com/brandonmowat/react-chat-ui as base*/}
          </div>
          <div></div>
        </Col>
        <Col span={16}>
          <div className="employee-controls">
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <TabPane tab="Wallet" key="1">
                <Button onClick={create} loading={loading} disabled={loading}>
                  Create wallet
                </Button>
                {wallet && <p>{JSON.stringify(wallet)}</p>}
              </TabPane>
              <TabPane tab="Lending" key="2">
                Content of Tab Pane 2
                {/* Add slider based on how long this person has been an employee 
            - enable lending based on a variable rate based on the employee duration: https://ant.design/components/slider/ */}
              </TabPane>
              <TabPane tab="Notes" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
            {/* <Collapse accordion>
              <Panel header="Account" key="1"></Panel>
              <Panel header="Notes" key="2"></Panel>
              <Panel header="Contract" key="3"></Panel>
            </Collapse> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeeDetail;
