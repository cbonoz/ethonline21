import React, { useState, useEffect } from "react";
import { Button, Row, Col, Avatar } from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { getName } from "../util";

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

  return (
    <div className="emp-detail">
      <Row>
        <Col span={12}>
          <div className="employee-card">
            <Button
              type="secondary"
              icon={<LeftOutlined />}
              size="large"
              className="back-button"
              onClick={() => setEmployee(undefined)}
            >
              Back
            </Button>
            <br />
            <Avatar size={64} icon={<UserOutlined />} />
            <p>{getName(employee)}</p>
            <p>{employee.email}</p>
            <p>{employee.title}</p>
            {/* TODO: waku chat */}
            {/* Using https://github.com/brandonmowat/react-chat-ui as base*/}
          </div>
          <div></div>
        </Col>
        <Col span={12}>
          <div className="employee-controls">
            {/* Add slider based on how long this person has been an employee 
            - enable lending based on a variable rate based on the employee duration: https://ant.design/components/slider/ */}

            <Button onClick={create} loading={loading} disabled={loading}>
              Create wallet
            </Button>
            {wallet && <p>{JSON.stringify(wallet)}</p>}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeeDetail;
