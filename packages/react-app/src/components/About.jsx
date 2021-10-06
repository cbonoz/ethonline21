import React, { useEffect, useState } from "react";
import { Button, Steps } from "antd";
import { Row, Col } from "antd";
import { Typography, Divider } from "antd";

import { CheckCircleTwoTone } from "@ant-design/icons";
import { APP_NAME, APP_LONG_DESC } from "../util/constants";
import logo from "./../assets/h1.png";

const { Title, Paragraph, Text, Link } = Typography;
const { Step } = Steps;

const REASONS = [
  "Set up interest-bearing crypto accounts for your employees.",
  "Give employees access to capital based on tenure.",
  "Get started by uploading your employee list.",
];

function About({ history }) {
  return (
    <div className="content about-page">
      <Row>
        <Col span={12}>
          <br />
          <Title>{APP_NAME}</Title>
          <h3>{APP_LONG_DESC}</h3>
          <br />

          <div className="reason-section">
            {REASONS.map((r, i) => {
              return (
                <div key={i}>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                  &nbsp;
                  {r}
                </div>
              );
            })}
          </div>

          <Button size="large" type="primary" onClick={() => history.push("/employees")}>
            Get started
          </Button>
        </Col>
        <Col span={12}>
          <img src={logo} className="about-image" />
        </Col>
      </Row>

      <p></p>
      {/* <img src={logo} className="hero-logo" /> */}
      {/* <Steps current={3} size="large" className="header-steps">
        <Step title="Stream" description="Stream from ContentStream or using your favorite existing platform." />
        <Step
          title="List"
          description="Use ContentStream to list and sell rights and access to your previous Streams."
        />
        <Step title="Earn" description="Get paid for your new and existing content." />
      </Steps> */}
    </div>
  );
}

export default About;
