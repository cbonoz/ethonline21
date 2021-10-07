import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";

function Deposit({ employee }) {
  const [amount, setAmount] = useState();
  const deposit = async () => {};
  return (
    <div>
      <p>Manage a cryptocurrency account for this employee from this page.</p>
      <Input type="number" suffix="Eth" value={amount} onChange={e => setAmount(e.target.value)} />
      <br />
      <Button onClick={deposit}>Deposit</Button>
    </div>
  );
}

Deposit.propTypes = {};

export default Deposit;
