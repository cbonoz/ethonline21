import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input, Table } from "antd";
import { AAVE_DATA, COLUMNS } from "../util/aave";
import { DeleteFilled, DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";

function Deposit({ address, employee }) {
  const [amount, setAmount] = useState();
  const [empAddress, setEmpAddress] = useState();
  const [reserve, setReserve] = useState();

  useEffect(() => {
    // let userSummary = v2.formatUserSummaryData(poolReservesData, rawUserReserves, userAddress.toLowerCase(), Math.floor(Date.now() / 1000))
  }, []);

  const deposit = async () => {};

  // TODO: add steps
  return (
    <div>
      <p>Manage a cryptocurrency account on behalf of this employee from this page.</p>

      {!reserve && (
        <div>
          <p>Select Pool: Showing first 10</p>
          <Table
            dataSource={AAVE_DATA.data.reserves}
            columns={COLUMNS}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  setReserve(record);
                }, // click row />;
              };
            }}
          />
        </div>
      )}
      {reserve && (
        <div>
          {/* Reserve selected */}
          Depositing to:
          <Input
            suffix={
              <span>
                <DeleteTwoTone size={"large"} onClick={() => setReserve(undefined)} />
              </span>
            }
            value={`${reserve.name} ${reserve.id.slice(0, 20)}...`}
            disabled
          />
        </div>
      )}

      <div className="deposit-form">
        <Input
          type="string"
          prefix="Employee Address"
          value={empAddress}
          onChange={e => setEmpAddress(e.target.value)}
        />
        <br />
        <br />
        <p>Provide amount in eth to credit:</p>
        <Input type="number" prefix="Eth" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <br />
      <Button onClick={deposit}>Deposit</Button>
    </div>
  );
}

Deposit.propTypes = {};

export default Deposit;
