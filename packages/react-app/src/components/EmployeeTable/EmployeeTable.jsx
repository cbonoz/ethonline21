import React from "react";
import PropTypes from "prop-types";
import { Table, Tag, Radio, Space } from "antd";

import { COLUMNS } from "./employee";

function EmployeeTable({ employees, setEmployee }) {
  return (
    <div>
      <Table
        dataSource={employees}
        columns={COLUMNS}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setEmployee(record);
            }, // click row />;
          };
        }}
      />
    </div>
  );
}

EmployeeTable.propTypes = {};

export default EmployeeTable;
