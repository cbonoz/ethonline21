import { PageHeader } from "antd";
import React from "react";
import { APP_DESC, APP_NAME } from "../util/constants";
import headerLogo from "../assets/header_logo.png";

// displays a page header

export default function Header() {
  const title = (
    <span>
      <img src={headerLogo} className="header-image" />
    </span>
  );
  return (
    <a href="https://github.com/cbonoz/ethonline21" target="_blank" rel="noopener noreferrer">
      <PageHeader title={title} subTitle={APP_DESC} style={{ cursor: "pointer" }} />
    </a>
  );
}
