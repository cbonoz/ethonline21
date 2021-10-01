import { PageHeader } from "antd";
import React from "react";
import { APP_DESC, APP_NAME } from "../util/constants";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/cbonoz/ethonline21" target="_blank" rel="noopener noreferrer">
      <PageHeader title={APP_NAME} subTitle={APP_DESC} style={{ cursor: "pointer" }} />
    </a>
  );
}
