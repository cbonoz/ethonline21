import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input, Table } from "antd";
import { AAVE_DATA, COLUMNS, depositAmount } from "../util/aave";
import { DeleteFilled, DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { getAssetAddress, getPoolAddress } from "../util";

function Deposit({ provider, userSigner, address, employee }) {
  const [amount, setAmount] = useState();
  const [empAddress, setEmpAddress] = useState();
  const [reserve, setReserve] = useState();
  const [result, setResult] = useState();

  // useEffect(() => {
  // let userSummary = v2.formatUserSummaryData(poolReservesData, rawUserReserves, userAddress.toLowerCase(), Math.floor(Date.now() / 1000))
  // }, []);

  const deposit = async () => {
    if (result) {
      setResult(undefined);
    }
    if (!reserve) {
      alert("Please select a reserve pool");
      return;
    }
    if (!amount || !empAddress) {
      alert("Address and amount are required");
      return;
    }
    const targetAddress = getAssetAddress(reserve.id);
    try {
      const r = await depositAmount(userSigner, provider, address, targetAddress, amount); //, empAddress);
      setResult(r);
    } catch (e) {
      setResult(e.toString());
      console.error("err", e);
    }
  };

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
        <div className="deposit-form">
          <p>Depositing to:</p>
          <Input
            suffix={
              <span>
                <DeleteTwoTone size={"large"} onClick={() => setReserve(undefined)} />
              </span>
            }
            value={`${reserve.name} ${reserve.id.slice(0, 20)}...`}
            disabled
          />
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
          <br />
          <br />
          <Button type="primary" onClick={deposit}>
            Deposit
          </Button>
        </div>
      )}

      {result && (
        <div>
          <h2>Deposit result:</h2>
          <hr />
          <pre>{JSON.stringify(result, null, "\t")}</pre>
        </div>
      )}
    </div>
  );
}

Deposit.propTypes = {};

export default Deposit;
