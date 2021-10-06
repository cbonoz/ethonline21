import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Row, Col } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

function Home(props) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col span={12}>
          <div></div>
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
}

Home.propTypes = {};

export default Home;
